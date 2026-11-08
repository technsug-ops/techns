import config from "@payload-config";
import { getPayload } from "payload";

/**
 * Automatischer Screenshot der Startseite eines Projekts (nur wenn im CMS kein eigenes Bild hinterlegt ist).
 * Aufnahme über den Dienst microlink.io – Besucher laden das Bild nur von unserer Domain;
 * das Vercel-CDN hält es 7 Tage, danach wird im Hintergrund neu aufgenommen.
 */
export const revalidate = 604800;

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
  api.searchParams.set("waitForTimeout", "1500");

  try {
    const res = await fetch(api, { next: { revalidate } });
    const json = (await res.json()) as { status?: string; data?: { screenshot?: { url?: string } } };
    const shotUrl = json.data?.screenshot?.url;
    if (json.status !== "success" || !shotUrl) throw new Error(`microlink: ${json.status}`);
    const img = await fetch(shotUrl, { next: { revalidate } });
    if (!img.ok) throw new Error(`image: ${img.status}`);
    return new Response(await img.arrayBuffer(), {
      headers: {
        "Content-Type": img.headers.get("content-type") ?? "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
      },
    });
  } catch (err) {
    payload.logger.warn(`Screenshot für ${slug} fehlgeschlagen: ${String(err)}`);
    return new Response("Screenshot unavailable", { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
