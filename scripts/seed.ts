/**
 * Überträgt die bisherigen Projekte aus scripts/seed-projects.json in die Datenbank.
 * Ausführen mit:  npm run seed
 * Bereits vorhandene Projekte (gleiches URL-Kürzel) werden übersprungen – das Skript kann gefahrlos mehrfach laufen.
 */
import config from "@payload-config";
import { getPayload } from "payload";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type SeedBlock =
  | { type: "text"; title: string; body: string }
  | { type: "list"; title: string; items: string[] }
  | { type: "flow"; title: string; steps: string[]; coreIndex: number };

type SeedProject = {
  slug: string;
  group: "erp" | "websites";
  name: string;
  kind: "Eigenes Produkt" | "Kundenprojekt" | "Kundenprojekt · laufend" | "In Entwicklung";
  meta: string;
  description: string;
  metric?: string;
  url: string;
  displayDomain?: string;
  stack: string[];
  caseStudy?: { blocks: SeedBlock[] };
};

const dirname = path.dirname(fileURLToPath(import.meta.url));

function toBlocks(blocks: SeedBlock[] = []) {
  return blocks.map((b) => {
    if (b.type === "text") return { blockType: "text" as const, title: b.title, body: b.body };
    if (b.type === "list") return { blockType: "list" as const, title: b.title, items: b.items };
    return { blockType: "flow" as const, title: b.title, steps: b.steps.map((label, i) => ({ label, highlight: i === b.coreIndex })) };
  });
}

const payload = await getPayload({ config });
const seed: SeedProject[] = JSON.parse(await readFile(path.join(dirname, "seed-projects.json"), "utf8"));

let created = 0;
for (const p of seed) {
  const existing = await payload.find({ collection: "projects", where: { slug: { equals: p.slug } }, limit: 1 });
  if (existing.totalDocs > 0) {
    payload.logger.info(`übersprungen (existiert): ${p.slug}`);
    continue;
  }
  await payload.create({
    collection: "projects",
    data: {
      name: p.name,
      slug: p.slug,
      group: p.group,
      kind: p.kind,
      meta: p.meta,
      description: p.description,
      metric: p.metric,
      url: p.url,
      displayDomain: p.displayDomain,
      stack: p.stack,
      caseStudy: toBlocks(p.caseStudy?.blocks),
      visible: true,
    },
  });
  created++;
  payload.logger.info(`angelegt: ${p.slug}`);
}
payload.logger.info(`Fertig – ${created} neue Projekte.`);
process.exit(0);
