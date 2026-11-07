import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProjects = await getProjects();
  const base = "https://techns.de";
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    ...allProjects.map((p) => ({ url: `${base}/projekte/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${base}/team`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/impressum`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
