import "server-only";
import config from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";
import type { Locale } from "@/content/i18n";
import type { Media } from "@/payload-types";

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio?: string;
  focus: string[];
  linkedin?: string;
  email?: string;
  photo?: { url: string; alt: string };
};

export const getTeam = cache(async (locale: Locale = "de"): Promise<TeamMember[]> => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "team",
    where: { visible: { equals: true } },
    sort: "_order",
    limit: 100,
    depth: 1,
    locale,
    fallbackLocale: "de",
    overrideAccess: false,
  });
  return docs.map((d) => {
    const m = d.photo && typeof d.photo === "object" ? (d.photo as Media) : undefined;
    return {
      id: d.id,
      name: d.name,
      role: d.role,
      bio: d.bio ?? undefined,
      focus: d.focus ?? [],
      linkedin: d.linkedin ?? undefined,
      email: d.email ?? undefined,
      photo: m?.url ? { url: m.url, alt: m.alt } : undefined,
    };
  });
});
