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
    for (const b of blobs) {
      const name = b.pathname.replace(/^screenshots\//, "");
      if (name.endsWith(".leer")) out[name.slice(0, -5)] = null;
      else if (name.endsWith(".webp")) out[name.slice(0, -5)] = b.url;
    }
    return out;
  } catch {
    return {};
  }
});
