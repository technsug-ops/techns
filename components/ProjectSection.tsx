import type { Project, ProjectGroupId } from "@/content/site";
import type { IconName } from "./Icons";
import { Accent } from "./Accent";
import { Icon } from "./Icons";
import { ProjectCard } from "./ProjectCard";
import type { I18nProps } from "./types";

type Props = I18nProps & {
  group: { id: ProjectGroupId; icon: IconName; tone: "mint" | "gray"; columns: 2 | 3 };
  projects: Project[];
};

export function ProjectSection({ locale, t, group, projects }: Props) {
  const g = t.groups[group.id];
  return (
    <section id={group.id} className={`band${group.tone === "mint" ? " band-mint" : ""}`} aria-labelledby={`${group.id}-title`}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">{g.eyebrow}</span>
            <h2 className="h2" id={`${group.id}-title`}><Accent {...g.heading} /></h2>
            <p className="lede">{g.lede}</p>
          </div>
          <span className="sec-ic"><Icon name={group.icon} /></span>
        </div>
        <ul className="deliver" aria-label={t.groupsCommon.deliverablesLabel}>
          {g.deliverables.map((d) => <li key={d}>{d}</li>)}
        </ul>
        {projects.length === 0 && <p className="lede">{t.groupsCommon.empty}</p>}
        <div className={`grid grid-${group.columns}`}>
          {projects.map((p) => <ProjectCard key={p.slug} project={p} locale={locale} t={t} />)}
        </div>
      </div>
    </section>
  );
}
