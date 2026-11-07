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

export default async function HomePage() {
  const projects = await getProjects();
  return (
    <Shell>
      <Hero />
      <StatsBadge />
      <Principles />
      <NowBand />
      <About />
      <Services />
      {projectGroups.map((g) => <ProjectSection key={g.id} group={g} projects={projects.filter((p) => p.group === g.id)} />)}
      <Process />
      <Analyses />
      <Founder />
      <Skills />
      <Faq />
      <Contact />
    </Shell>
  );
}
