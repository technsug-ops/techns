import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

/**
 * Neue Gliederung der Projekte:
 * - ERP: PrüfDesk, B2B-klar, Gründungs-Check, Hausaufgaben-Kompass, MentörDE, Bezirga, Produktions-ERP
 * - Websites: ApplyToGerman (groß), Maide Restaurant, Tokalı Hukuk
 * - HafenX wird ausgeblendet (bleibt im Panel erhalten).
 * Neues Feld „featured“ = Karte über die volle Breite.
 */

const maide = {
  de: {
    meta: "Website · Gastronomie",
    description: "Website für ein neu eröffnetes türkisches Restaurant in Köln: Speisekarte, Reservierung und lokale Suchmaschinenoptimierung.",
    metric: "Live seit Juni 2026",
  },
  en: {
    meta: "Website · Hospitality",
    description: "Website for a newly opened Turkish restaurant in Cologne: menu, reservations and local search engine optimisation.",
    metric: "Live since June 2026",
  },
  tr: {
    meta: "Web sitesi · Gastronomi",
    description: "Köln'de yeni açılan bir Türk restoranı için web sitesi: menü, rezervasyon ve yerel arama motoru optimizasyonu.",
    metric: "Haziran 2026'dan beri yayında",
  },
};

const order: [slug: string, group: "erp" | "websites", sortKey: string][] = [
  ["pruefdesk", "erp", "a0"],
  ["b2b-klar", "erp", "a1"],
  ["foundercheck", "erp", "a2"],
  ["kompass", "erp", "a3"],
  ["mentorde", "erp", "a4"],
  ["bezirga", "erp", "a5"],
  ["produktions-erp", "erp", "a6"],
  ["applytogerman", "websites", "a7"],
  ["maide", "websites", "a8"],
  ["tokali", "websites", "a9"],
  ["hafenx", "erp", "aA"],
];

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "projects" ADD COLUMN "featured" boolean DEFAULT false;`);

  const existing = await payload.find({ collection: "projects", where: { slug: { equals: "maide" } }, limit: 1, depth: 0, req });
  if (existing.totalDocs === 0) {
    const doc = await payload.create({
      collection: "projects",
      req,
      locale: "de",
      data: {
        name: "Maide Restaurant",
        slug: "maide",
        group: "websites",
        kind: "Kundenprojekt",
        url: "https://maiderestaurant.de",
        stack: [],
        visible: true,
        ...maide.de,
      },
    });
    for (const locale of ["en", "tr"] as const) {
      await payload.update({ collection: "projects", id: doc.id, locale, req, data: maide[locale] });
    }
  }

  for (const [slug, group, sortKey] of order) {
    await db.execute(sql`UPDATE "projects" SET "_order" = ${sortKey}, "group" = ${group} WHERE "slug" = ${slug};`);
  }
  await db.execute(sql`UPDATE "projects" SET "featured" = true WHERE "slug" = 'applytogerman';`);
  await db.execute(sql`UPDATE "projects" SET "visible" = false WHERE "slug" = 'hafenx';`);
  await db.execute(sql`UPDATE "projects" SET "url" = 'https://panel.mentorde.com/saas' WHERE "slug" = 'mentorde';`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({ collection: "projects", where: { slug: { equals: "maide" } }, req });
  await db.execute(sql`UPDATE "projects" SET "visible" = true WHERE "slug" = 'hafenx';`);
  await db.execute(sql`ALTER TABLE "projects" DROP COLUMN "featured";`);
}
