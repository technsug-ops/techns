import Image from "next/image";
import Link from "next/link";
import { fmt, localePath } from "@/content/i18n";
import type { CaseBlock, Project } from "@/content/site";
import { Icon } from "./Icons";
import type { I18nProps } from "./types";

export function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

export function domainOf(project: Project): string | undefined {
  if (project.displayDomain) return project.displayDomain;
  return project.url ? hostname(project.url) : undefined;
}

export function Screenshot({ project, sizes, priority, t }: Pick<I18nProps, "t"> & { project: Project; sizes: string; priority?: boolean }) {
  const inner = (
    <>
      {project.screenshot ? (
        <Image
          src={project.screenshot.url}
          alt={project.screenshot.alt || fmt(t.project.screenshotAlt, { name: project.name })}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      ) : (
        <span className="shot-fallback">{project.name}</span>
      )}
      <span className={`pill${project.kind === "In Entwicklung" ? " dev" : ""}`}>{t.project.kinds[project.kind]}</span>
      {project.url && <span className="shot-open" aria-hidden="true">{t.project.liveView}</span>}
    </>
  );
  if (!project.url) return <div className="shot">{inner}</div>;
  return (
    <a className="shot" href={project.url} target="_blank" rel="noopener" aria-label={fmt(t.project.liveOpenAria, { name: project.name })}>
      {inner}
    </a>
  );
}

export function StackTags({ stack, label }: { stack: string[]; label: string }) {
  if (stack.length === 0) return null;
  return (
    <ul className="stack" aria-label={label}>
      {stack.map((s) => <li key={s}>{s}</li>)}
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

export function ProjectCard({ project, locale, t }: I18nProps & { project: Project }) {
  return (
    <article className="card" id={`projekt-${project.slug}`}>
      <Screenshot project={project} t={t} sizes="(max-width: 900px) 100vw, 420px" />
      <div className="card-body">
        <p className="meta"><span className="num">{project.number}</span>{project.meta}</p>
        <h3>{project.name}</h3>
        <p className="desc">{project.description}</p>
        {project.metric && <span className="metric">{project.metric}</span>}
        <StackTags stack={project.stack} label={t.project.technologies} />
      </div>
      <div className="card-actions">
        {project.url ? (
          <a href={project.url} target="_blank" rel="noopener">{domainOf(project)} ↗</a>
        ) : (
          <span className="no-url">{project.kind === "In Entwicklung" ? t.project.notPublic : ""}</span>
        )}
        <Link className="details" href={localePath(locale, `/projekte/${project.slug}`)}>
          {t.project.details} <span className="arrow"><Icon name="next" /></span>
        </Link>
      </div>
    </article>
  );
}
