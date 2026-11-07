import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { de } from "@payloadcms/translations/languages/de";
import { en } from "@payloadcms/translations/languages/en";
import { tr } from "@payloadcms/translations/languages/tr";

import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Users } from "./collections/Users";
import { migrations } from "./migrations";
import { seedOnFirstRun } from "./lib/seedProjects";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " · TechNS Admin" },
  },
  collections: [Projects, Media, Users],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL || "" },
    // Schema ändert sich nur über Migrationen (npm run migrate) – nie automatisch.
    push: false,
    // In Produktion (Vercel) werden ausstehende Migrationen beim Start automatisch ausgeführt.
    prodMigrations: migrations,
  }),
  sharp,
  onInit: seedOnFirstRun,
  i18n: { supportedLanguages: { de, tr, en }, fallbackLanguage: "de" },
  plugins: [
    // Bilder in Vercel Blob speichern, sobald das Token gesetzt ist; lokal landen sie im Ordner /media.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});
