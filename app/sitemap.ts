import type { MetadataRoute } from "next";
import { alternates, locales, localePath } from "@/content/i18n";
import { company } from "@/content/site";
import { getProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects("de");
  const paths: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    ...projects.map((p) => ({ path: `/projekte/${p.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
    { path: "/team", priority: 0.6, changeFrequency: "monthly" },
    { path: "/impressum", priority: 0.2, changeFrequency: "yearly" },
    { path: "/datenschutz", priority: 0.2, changeFrequency: "yearly" },
  ];
  const abs = (p: string) => `${company.siteUrl}${p === "/" ? "" : p}` || company.siteUrl;
  return paths.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((l) => ({
      url: abs(localePath(l, path)) || `${company.siteUrl}/`,
      priority,
      changeFrequency,
      alternates: { languages: Object.fromEntries(Object.entries(alternates(path)).map(([k, v]) => [k, abs(v)])) },
    })),
  );
}
