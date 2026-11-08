import config from "@payload-config";
import { del, list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { getPayload } from "payload";
import sharp from "sharp";

/**
 * Nimmt die Startseite eines Projekts auf (Dienst: microlink.io), verkleinert sie zu WebP
 * und legt sie dauerhaft im Vercel Blob ab (screenshots/<slug>.webp).
 * Die Website verweist danach direkt auf die Blob-Datei – diese Route läuft also nur einmal pro Projekt
 * bzw. wenn sie zum Aktualisieren erneut aufgerufen wird.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Kleine mintfarbene Fläche (16×10 PNG) als Platzhalter, falls die Aufnahme scheitert. */
const PLACEHOLDER = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAIAAAAy3EnLAAAAG0lEQVR4XmN88uk9AymAiRTFIDCqgRhA+1ACAFzWAtmqCFLkAAAAAElFTkSuQmCC";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const found = await payload.find({ collection: "projects", where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: false });
  const site = found.docs[0]?.url;
  if (!site) return new Response("Not found", { status: 404 });

  const api = new URL("https://api.microlink.io/");
  api.searchParams.set("url", site);
  api.searchParams.set("screenshot", "true");
  api.searchParams.set("meta", "false");
  api.searchParams.set("viewport.width", "1440");
  api.searchParams.set("viewport.height", "900");
  api.searchParams.set("waitUntil", "networkidle0");
  api.searchParams.set("waitForTimeout", "3000");
  api.searchParams.set("force", "true"); // immer frisch aufnehmen (wir speichern ohnehin selbst)

  try {
    const res = await fetch(api, { cache: "no-store" });
    const json = (await res.json()) as { status?: string; message?: string; data?: { screenshot?: { url?: string } } };
    const shotUrl = json.data?.screenshot?.url;
    if (json.status !== "success" || !shotUrl) throw new Error(`microlink: ${json.status} ${json.message ?? ""}`);
    const img = await fetch(shotUrl, { cache: "no-store" });
    if (!img.ok) throw new Error(`image: ${img.status}`);

    const raw = Buffer.from(await img.arrayBuffer());

    // Leere Aufnahme (Seite blockiert Bots oder lädt nicht): kein Bild speichern, Karte zeigt den Projektnamen.
    const { channels } = await sharp(raw).stats();
    if (Math.max(...channels.map((c) => c.stdev)) < 4) {
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        const { blobs } = await list({ prefix: `screenshots/${slug}.` });
        if (blobs.length) await del(blobs.map((b) => b.url));
        await put(`screenshots/${slug}.leer`, "leer", { access: "public", contentType: "text/plain", addRandomSuffix: false, allowOverwrite: true });
        revalidatePath("/", "layout");
      }
      throw new Error("leere Aufnahme");
    }

    const webp = await sharp(raw).resize({ width: 1440 }).webp({ quality: 78 }).toBuffer();
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list({ prefix: `screenshots/${slug}.leer` });
      if (blobs.length) await del(blobs.map((b) => b.url));
      await put(`screenshots/${slug}.webp`, webp, { access: "public", contentType: "image/webp", addRandomSuffix: false, allowOverwrite: true });
      revalidatePath("/", "layout");
    }
    return new Response(new Uint8Array(webp), { headers: { "Content-Type": "image/webp", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
  } catch (err) {
    payload.logger.warn(`Screenshot für ${slug} fehlgeschlagen: ${String(err)}`);
    return new Response(Buffer.from(PLACEHOLDER, "base64"), { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=600, s-maxage=600" } });
  }
}
