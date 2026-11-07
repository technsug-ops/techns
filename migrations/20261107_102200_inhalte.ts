import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

/**
 * Produktions-ERP als Projekt „In Entwicklung“ und Halil als erstes Teammitglied.
 * Legt nur an, was noch fehlt. Wird seit der Lokalisierung aus 20261107_103100_uebersetzungen aufgerufen,
 * weil die Payload-API hier bereits das lokalisierte Schema erwartet (auf einer leeren Datenbank würde sie scheitern).
 */
export async function up(): Promise<void> {}

export async function ensureInhalte({ payload, req }: Pick<MigrateUpArgs, "payload" | "req">): Promise<void> {
  const erp = await payload.find({ collection: "projects", where: { slug: { equals: "produktions-erp" } }, limit: 1, depth: 0, req });
  if (erp.totalDocs === 0) {
    await payload.create({
      collection: "projects",
      req,
      data: {
        name: "Produktions-ERP",
        slug: "produktions-erp",
        group: "erp",
        kind: "In Entwicklung",
        meta: "ERP · Fertigung",
        description: "[Ein bis zwei Sätze: für welchen Betrieb, welche Abläufe – z. B. Aufträge, Material, Fertigungsschritte]",
        stack: [],
        visible: true,
      },
    });
  }

  const team = await payload.count({ collection: "team", req });
  if (team.totalDocs === 0) {
    await payload.create({
      collection: "team",
      req,
      data: {
        name: "Halil Yapralı",
        role: "Gründer & Geschäftsführer",
        bio: "Volkswirt (Master) mit Erfahrung in der Organisationsführung gemeinnütziger Einrichtungen und in der Forschung. Verbindet Prozessanalyse mit Softwareentwicklung – erst messen, dann bauen.",
        focus: ["Prozessmanagement", "Digitalisierung", "ERP-Systeme", "Produktentwicklung"],
        visible: true,
      },
    });
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({ collection: "projects", where: { slug: { equals: "produktions-erp" } }, req });
}
