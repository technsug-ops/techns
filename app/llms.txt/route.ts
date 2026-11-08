import { company } from "@/content/site";
import { getProjects } from "@/lib/projects";

/** llms.txt – kompakte Beschreibung der Website für KI-Assistenten und Suchsysteme (llmstxt.org). */
export const revalidate = 3600;

const groupNames: Record<string, string> = { erp: "ERP & business software", websites: "Websites & web platforms", apps: "Mobile apps" };

export async function GET() {
  const projects = await getProjects("en");
  const site = company.siteUrl;
  const byGroup = Object.keys(groupNames)
    .map((g) => {
      const items = projects.filter((p) => p.group === g);
      if (items.length === 0) return "";
      const lines = items.map((p) => `- [${p.name}](${site}/en/projekte/${p.slug}): ${p.description ?? ""}`.trim());
      return `## ${groupNames[g]}\n\n${lines.join("\n")}`;
    })
    .filter(Boolean)
    .join("\n\n");

  const body = `# TechNS UG

> TechNS (Technology Next Station) UG (haftungsbeschränkt) is an AI-first software company from Oberursel near Frankfurt am Main, Germany. It helps small and mid-sized companies with process analysis, AI agents and automation, ERP systems, websites, mobile apps and marketplace/ERP integration. AI is part of how TechNS works: all products are developed with AI tools, and AI is built into client workflows where it measurably saves work. Managing director: ${company.managingDirector}.

Languages: German (default, ${site}/), English (${site}/en), Turkish (${site}/tr).
Contact: ${company.email} · ${company.phone.display} · ${company.street}, ${company.postalCode} ${company.city}

## Pages

- [Home (German)](${site}/): services, projects, process, analyses, founder, FAQ, contact
- [Home (English)](${site}/en)
- [Team](${site}/en/team)
- [Legal notice / Impressum](${site}/impressum)
- [Privacy / Datenschutz](${site}/datenschutz)

${byGroup}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
