import type { Project, ProjectGroup } from "@/content/site";
import { Accent } from "./Accent";
import { Icon } from "./Icons";
import { ProjectCard } from "./ProjectCard";

export function ProjectSection({ group, projects }: { group: ProjectGroup; projects: Project[] }) {
  return (
    <section id={group.id} className={`band${group.tone === "mint" ? " band-mint" : ""}`} aria-labelledby={`${group.id}-title`}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">{group.eyebrow}</span>
            <h2 className="h2" id={`${group.id}-title`}><Accent {...group.heading} /></h2>
            <p className="lede">{group.lede}</p>
          </div>
          <span className="sec-ic"><Icon name={group.icon} /></span>
        </div>
        <ul className="deliver" aria-label="Typische Bausteine">
          {group.deliverables.map((d) => <li key={d}>{d}</li>)}
        </ul>
        {projects.length === 0 && <p className="lede">Projekte folgen in Kürze.</p>}
        <div className={`grid grid-${group.columns}`}>
          {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </div>
    </section>
  );
}
