import type { Payload } from "payload";
import seedData from "../scripts/seed-projects.json";

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

function toBlocks(blocks: SeedBlock[] = []) {
  return blocks.map((b) => {
    if (b.type === "text") return { blockType: "text" as const, title: b.title, body: b.body };
    if (b.type === "list") return { blockType: "list" as const, title: b.title, items: b.items };
    return { blockType: "flow" as const, title: b.title, steps: b.steps.map((label, i) => ({ label, highlight: i === b.coreIndex })) };
  });
}

/** Legt die Startprojekte an; vorhandene (gleiches Kürzel) werden übersprungen. */
export async function seedProjects(payload: Payload): Promise<number> {
  let created = 0;
  for (const p of seedData as SeedProject[]) {
    const existing = await payload.find({ collection: "projects", where: { slug: { equals: p.slug } }, limit: 1, depth: 0 });
    if (existing.totalDocs > 0) continue;
    await payload.create({
      collection: "projects",
      data: {
        name: p.name, slug: p.slug, group: p.group, kind: p.kind, meta: p.meta, description: p.description,
        metric: p.metric, url: p.url, displayDomain: p.displayDomain, stack: p.stack,
        caseStudy: toBlocks(p.caseStudy?.blocks), visible: true,
      },
    });
    created++;
  }
  return created;
}

/**
 * Einmaliger Erststart: Ist die Datenbank ganz frisch (noch kein Benutzer, noch kein Projekt),
 * werden die Startprojekte importiert. Sobald ein Konto existiert, passiert hier nie wieder etwas.
 */
export async function seedOnFirstRun(payload: Payload): Promise<void> {
  try {
    const [users, projects] = await Promise.all([
      payload.count({ collection: "users" }),
      payload.count({ collection: "projects" }),
    ]);
    if (users.totalDocs > 0 || projects.totalDocs > 0) return;
    const n = await seedProjects(payload);
    payload.logger.info(`Erststart: ${n} Startprojekte importiert.`);
  } catch (err) {
    payload.logger.error({ err }, "Erststart-Import fehlgeschlagen");
  }
}
