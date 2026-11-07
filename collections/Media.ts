import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Bild", plural: "Bilder" },
  admin: { group: "Inhalte" },
  access: { read: () => true },
  fields: [{ name: "alt", type: "text", label: "Alternativtext", required: true }],
  upload: {
    mimeTypes: ["image/*"],
    imageSizes: [{ name: "card", width: 1280, height: 800, position: "top" }],
    adminThumbnail: "card",
  },
};
