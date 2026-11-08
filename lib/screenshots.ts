import "server-only";
import { list } from "@vercel/blob";
import { cache } from "react";

/**
 * Bereits aufgenommene Screenshots liegen dauerhaft im Vercel Blob unter screenshots/<slug>.webp.
 * screenshots/<slug>.leer markiert Seiten, die sich nicht aufnehmen lassen (dann: kein Bild).
 * Ergebnis: slug → öffentliche URL bzw. null. Ohne Blob-Token (lokal) leer.
 */
export const getStoredScreenshots = cache(async (): Promise<Record<string, string | null>> => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return {};
  try {
    const { blobs } = await list({ prefix: "screenshots/", limit: 1000 });
    const out: Record<string, string | null> = {};
    const newest: Record<string, number> = {};
    for (const b of blobs) {
      const name = b.pathname.replace(/^screenshots\//, "");
      if (name.endsWith(".leer")) {
        out[name.slice(0, -5)] = null;
        continue;
      }
      // Format: <slug>--<zeitstempel>.webp (älteres Format: <slug>.webp)
      const m = name.match(/^(.+?)(?:--(\d+))?\.webp$/);
      const slug = m?.[1];
      if (!slug) continue;
      const stamp = Number(m[2] ?? 0);
      if (newest[slug] === undefined || stamp > newest[slug]) {
        newest[slug] = stamp;
        out[slug] = b.url;
      }
    }
    return out;
  } catch {
    return {};
  }
});
