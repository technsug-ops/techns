import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig, FieldHook } from "payload";

/** Nach jeder Änderung die betroffenen Seiten neu erzeugen (On-Demand-Revalidierung). */
async function revalidate(slugs: (string | undefined | null)[]) {
  try {
    const { revalidatePath } = await import("next/cache");
    // Alle Sprachfassungen (/, /en, /tr) samt Detailseiten neu erzeugen.
    revalidatePath("/", "layout");
  } catch {
    // Außerhalb von Next.js (z. B. Seed-Skript) gibt es nichts zu revalidieren.
  }
}

const afterChange: CollectionAfterChangeHook = async ({ doc, previousDoc }) => {
  await revalidate([doc?.slug, previousDoc?.slug]);
  return doc;
};
const afterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await revalidate([doc?.slug]);
  return doc;
};

const slugify = (v: string) =>
  v
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const formatSlug: FieldHook = ({ value, data }) => {
  if (typeof value === "string" && value.trim()) return slugify(value);
  if (typeof data?.name === "string") return slugify(data.name);
  return value;
};

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Projekt", plural: "Projekte" },
  orderable: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "group", "kind", "visible"],
    group: "Inhalte",
    description: "Reihenfolge per Drag & Drop in der Liste ändern. Ausgeblendete Projekte erscheinen nicht auf der Website.",
    listSearchableFields: ["name", "meta", "description"],
    pagination: { defaultLimit: 50 },
    preview: (doc) => (doc?.slug ? `/projekte/${doc.slug}` : null),
  },
  access: {
    read: ({ req }) => (req.user ? true : { visible: { equals: true } }),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", label: "Name", required: true, admin: { width: "60%" } },
        {
          name: "group",
          type: "select",
          label: "Bereich",
          required: true,
          defaultValue: "websites",
          options: [
            { label: "ERP & Business-Software", value: "erp" },
            { label: "Websites & Web-Plattformen", value: "websites" },
          ],
          admin: { width: "40%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "kind",
          type: "select",
          label: "Art",
          required: true,
          defaultValue: "Eigenes Produkt",
          options: ["Eigenes Produkt", "Kundenprojekt", "Kundenprojekt · laufend", "In Entwicklung"],
          admin: { width: "40%" },
        },
        { name: "meta", type: "text", label: "Kategoriezeile", required: true, localized: true, admin: { width: "60%", placeholder: "z. B. SaaS · E-Commerce" } },
      ],
    },
    { name: "description", type: "textarea", label: "Kurzbeschreibung", required: true, localized: true, maxLength: 320 },
    { name: "metric", type: "text", label: "Kennzahl (optional)", localized: true, admin: { placeholder: "z. B. 460 Hochschulen · 25.103 Studiengänge" } },
    {
      type: "row",
      fields: [
        {
          name: "url",
          type: "text",
          label: "Live-URL (optional)",
          admin: { width: "60%", description: "Leer lassen, wenn es noch keine öffentliche Adresse gibt." },
          validate: (v: unknown) => {
            if (v === null || v === undefined || v === "") return true;
            if (typeof v !== "string") return "Bitte eine URL eingeben.";
            try {
              const u = new URL(v);
              return u.protocol === "https:" || u.protocol === "http:" ? true : "Nur http(s)-Adressen.";
            } catch {
              return "Keine gültige URL (mit https:// beginnen).";
            }
          },
        },
        { name: "displayDomain", type: "text", label: "Angezeigte Domain (optional)", admin: { width: "40%", placeholder: "falls abweichend" } },
      ],
    },
    { name: "screenshot", type: "upload", relationTo: "media", label: "Screenshot (16:10)" },
    { name: "stack", type: "text", hasMany: true, label: "Technologien", admin: { description: "Eingabe + Enter fügt ein Etikett hinzu." } },
    {
      name: "caseStudy",
      type: "blocks",
      localized: true,
      label: "Fallstudie (Detailseite)",
      labels: { singular: "Abschnitt", plural: "Abschnitte" },
      blocks: [
        {
          slug: "text",
          labels: { singular: "Textabschnitt", plural: "Textabschnitte" },
          fields: [
            { name: "title", type: "text", label: "Überschrift", required: true },
            { name: "body", type: "textarea", label: "Text", required: true },
          ],
        },
        {
          slug: "list",
          labels: { singular: "Aufzählung", plural: "Aufzählungen" },
          fields: [
            { name: "title", type: "text", label: "Überschrift", required: true },
            { name: "items", type: "text", hasMany: true, label: "Punkte", required: true },
          ],
        },
        {
          slug: "flow",
          labels: { singular: "Ablauf / Architektur", plural: "Abläufe" },
          fields: [
            { name: "title", type: "text", label: "Überschrift", required: true },
            {
              name: "steps",
              type: "array",
              label: "Schritte",
              minRows: 2,
              fields: [
                { name: "label", type: "text", label: "Schritt", required: true },
                { name: "highlight", type: "checkbox", label: "Hervorheben (dunkel)" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "slug",
      type: "text",
      label: "URL-Kürzel",
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "Leer lassen → wird aus dem Namen erzeugt. Ergibt /projekte/<kürzel>." },
      hooks: { beforeValidate: [formatSlug] },
    },
    {
      name: "visible",
      type: "checkbox",
      label: "Auf der Website anzeigen",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
  ],
};
