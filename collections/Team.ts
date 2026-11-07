import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from "payload";

async function revalidateTeam() {
  try {
    const { revalidatePath } = await import("next/cache");
    // Alle Sprachfassungen (/, /en, /tr) samt Detailseiten neu erzeugen.
    revalidatePath("/", "layout");
  } catch {
    // außerhalb von Next.js nichts zu tun
  }
}
const afterChange: CollectionAfterChangeHook = async ({ doc }) => {
  await revalidateTeam();
  return doc;
};
const afterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await revalidateTeam();
  return doc;
};

export const Team: CollectionConfig = {
  slug: "team",
  labels: { singular: "Teammitglied", plural: "Team" },
  orderable: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "visible"],
    group: "Inhalte",
    description: "Reihenfolge per Drag & Drop ändern. Erscheint auf der Seite /team.",
    pagination: { defaultLimit: 50 },
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
        { name: "name", type: "text", label: "Name", required: true, admin: { width: "50%" } },
        { name: "role", type: "text", label: "Rolle", required: true, localized: true, admin: { width: "50%", placeholder: "z. B. Softwareentwickler" } },
      ],
    },
    { name: "photo", type: "upload", relationTo: "media", label: "Foto (quadratisch)" },
    { name: "bio", type: "textarea", label: "Kurzprofil", localized: true, maxLength: 600 },
    { name: "focus", type: "text", hasMany: true, localized: true, label: "Schwerpunkte", admin: { description: "Eingabe + Enter fügt ein Etikett hinzu." } },
    {
      type: "row",
      fields: [
        { name: "linkedin", type: "text", label: "LinkedIn-URL", admin: { width: "50%" } },
        { name: "email", type: "email", label: "E-Mail (öffentlich)", admin: { width: "50%" } },
      ],
    },
    { name: "visible", type: "checkbox", label: "Auf der Website anzeigen", defaultValue: true, admin: { position: "sidebar" } },
  ],
};
