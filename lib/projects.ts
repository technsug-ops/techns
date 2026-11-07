import "server-only";
import config from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";
import type { CaseBlock, Project, ProjectGroupId } from "@/content/site";
import type { Media, Project as ProjectDoc } from "@/payload-types";

function toScreenshot(m: ProjectDoc["screenshot"]): Project["screenshot"] {
  if (!m || typeof m === "number") return undefined;
  const media = m as Media;
  const url = media.sizes?.card?.url ?? media.url;
  if (!url) return undefined;
  return { url, alt: media.alt, width: media.sizes?.card?.width ?? media.width ?? undefined, height: media.sizes?.card?.height ?? media.height ?? undefined };
}

function toCaseStudy(blocks: ProjectDoc["caseStudy"]): CaseBlock[] {
  return (blocks ?? []).map((b): CaseBlock => {
    switch (b.blockType) {
      case "text":
        return { type: "text", title: b.title, body: b.body };
      case "list":
        return { type: "list", title: b.title, items: b.items };
      case "flow":
        return { type: "flow", title: b.title, steps: (b.steps ?? []).map((s) => ({ label: s.label, highlight: Boolean(s.highlight) })) };
    }
  });
}

/**
 * Alle sichtbaren Projekte in der im CMS festgelegten Reihenfolge.
 * `cache` sorgt dafür, dass pro Seitenaufruf nur einmal abgefragt wird.
 */
export const getProjects = cache(async (): Promise<Project[]> => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "projects",
    where: { visible: { equals: true } },
    sort: "_order",
    limit: 200,
    depth: 1,
    overrideAccess: false,
  });
  return docs
    .filter((d): d is ProjectDoc & { slug: string } => Boolean(d.slug))
    .map((d, i) => ({
      slug: d.slug,
      number: String(i + 1).padStart(2, "0"),
      group: d.group,
      name: d.name,
      kind: d.kind,
      meta: d.meta,
      description: d.description,
      metric: d.metric ?? undefined,
      url: d.url,
      displayDomain: d.displayDomain ?? undefined,
      screenshot: toScreenshot(d.screenshot),
      stack: d.stack ?? [],
      caseStudy: toCaseStudy(d.caseStudy),
    }));
});

export async function getProjectsByGroup(group: ProjectGroupId) {
  return (await getProjects()).filter((p) => p.group === group);
}
