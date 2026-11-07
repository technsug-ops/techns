import Image from "next/image";
import Link from "next/link";
import type { CaseBlock, Project } from "@/content/site";
import { Icon } from "./Icons";

export function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

export function Screenshot({ project, sizes, priority }: { project: Project; sizes: string; priority?: boolean }) {
  return (
    <a className="shot" href={project.url} target="_blank" rel="noopener" aria-label={`${project.name} live öffnen (neues Fenster)`}>
      {project.screenshot ? (
        <Image src={project.screenshot.url} alt={project.screenshot.alt || `Startseite von ${project.name}`} fill sizes={sizes} priority={priority} style={{ objectFit: "cover", objectPosition: "top center" }} />
      ) : (
        <span className="shot-fallback">{project.name}</span>
      )}
      <span className={`pill${project.kind === "In Entwicklung" ? " dev" : ""}`}>{project.kind}</span>
      <span className="shot-open" aria-hidden="true">Live ansehen ↗</span>
    </a>
  );
}

export function StackTags({ stack }: { stack: string[] }) {
  if (stack.length === 0) return null;
  return (
    <ul className="stack" aria-label="Technologien">
      {stack.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
}

export function CaseBlockView({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case "text":
      return (<><h3>{block.title}</h3><p>{block.body}</p></>);
    case "list":
      return (<><h3>{block.title}</h3><ul>{block.items.map((i) => <li key={i}>{i}</li>)}</ul></>);
    case "flow":
      return (
        <>
          <h3>{block.title}</h3>
          <ol className="flow">
            {block.steps.map((s) => <li key={s.label} className={s.highlight ? "core" : undefined}>{s.label}</li>)}
          </ol>
        </>
      );
  }
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card" id={`projekt-${project.slug}`}>
      <Screenshot project={project} sizes="(max-width: 900px) 100vw, 420px" />
      <div className="card-body">
        <p className="meta"><span className="num">{project.number}</span>{project.meta}</p>
        <h3>{project.name}</h3>
        <p className="desc">{project.description}</p>
        {project.metric && <span className="metric">{project.metric}</span>}
        <StackTags stack={project.stack} />
      </div>
      <div className="card-actions">
        <a href={project.url} target="_blank" rel="noopener">{project.displayDomain ?? hostname(project.url)} ↗</a>
        <Link className="details" href={`/projekte/${project.slug}`}>
          Details ansehen <span className="arrow"><Icon name="next" /></span>
        </Link>
      </div>
    </article>
  );
}
