import config from "@payload-config";
import { getPayload } from "payload";

/**
 * Automatischer Screenshot der Startseite eines Projekts (nur wenn im CMS kein eigenes Bild hinterlegt ist).
 * Aufnahme über den Dienst microlink.io – Besucher laden das Bild nur von unserer Domain;
 * das Vercel-CDN hält es 7 Tage, danach wird im Hintergrund neu aufgenommen.
 */
export const revalidate = 604800;

/** Kleine mintfarbene Fläche (16×10 PNG) als Platzhalter, falls die Aufnahme scheitert. */
const PLACEHOLDER = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAIAAAAy3EnLAAAAG0lEQVR4XmN88uk9AymAiRTFIDCqgRhA+1ACAFzWAtmqCFLkAAAAAElFTkSuQmCC";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const found = await payload.find({
    collection: "projects",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    overrideAccess: false,
  });
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

  try {
    // Kein Data-Cache: ein Fehlschlag darf nicht 7 Tage hängen bleiben – gecacht wird die fertige Antwort im CDN.
    const res = await fetch(api, { cache: "no-store" });
    const json = (await res.json()) as { status?: string; message?: string; data?: { screenshot?: { url?: string } } };
    const shotUrl = json.data?.screenshot?.url;
    if (json.status !== "success" || !shotUrl) throw new Error(`microlink: ${json.status} ${json.message ?? ""}`);
    const img = await fetch(shotUrl, { cache: "no-store" });
    if (!img.ok) throw new Error(`image: ${img.status}`);
    return new Response(await img.arrayBuffer(), {
      headers: {
        "Content-Type": img.headers.get("content-type") ?? "image/png",
        "Cache-Control": "public, max-age=604800, s-maxage=604800, stale-while-revalidate=2592000",
      },
    });
  } catch (err) {
    payload.logger.warn(`Screenshot für ${slug} fehlgeschlagen: ${String(err)}`);
    // Neutrale Fläche statt kaputtem Bild; nach einer Stunde wird es erneut versucht.
    return new Response(Buffer.from(PLACEHOLDER, "base64"), { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=600, s-maxage=3600" } });
  }
}
