import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale } from "@/content/i18n";
import { projectGroups } from "@/content/site";
import { getProjects } from "@/lib/projects";
import { About } from "@/components/About";
import { Analyses } from "@/components/Analyses";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Founder } from "@/components/Founder";
import { Hero } from "@/components/Hero";
import { NowBand, Principles, StatsBadge } from "@/components/Highlights";
import { Process } from "@/components/Process";
import { ProjectSection } from "@/components/ProjectSection";
import { Services } from "@/components/Services";
import { Shell } from "@/components/Shell";
import { Skills } from "@/components/Skills";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const projects = await getProjects(locale);
  const p = { locale, t };
  return (
    <Shell {...p}>
      <Hero {...p} />
      <StatsBadge {...p} />
      <Principles {...p} />
      <NowBand {...p} />
      <About {...p} />
      <Services {...p} />
      {projectGroups.map((g) => <ProjectSection key={g.id} {...p} group={g} projects={projects.filter((x) => x.group === g.id)} />)}
      <Process {...p} />
      <Analyses {...p} />
      <Founder {...p} />
      <Skills {...p} />
      <Faq {...p} />
      <Contact {...p} />
    </Shell>
  );
}
