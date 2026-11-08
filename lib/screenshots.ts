import "server-only";
import { list } from "@vercel/blob";
import { cache } from "react";

/**
 * Bereits aufgenommene Screenshots liegen dauerhaft im Vercel Blob unter screenshots/<slug>.webp.
 * Ergebnis: slug → öffentliche URL. Ohne Blob-Token (lokal) leer.
 */
export const getStoredScreenshots = cache(async (): Promise<Record<string, string>> => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return {};
  try {
    const { blobs } = await list({ prefix: "screenshots/", limit: 1000 });
    return Object.fromEntries(blobs.map((b) => [b.pathname.replace(/^screenshots\//, "").replace(/\.webp$/, ""), b.url]));
  } catch {
    return {};
  }
});
