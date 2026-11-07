import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectGroups } from "@/content/site";
import { getProjects } from "@/lib/projects";
import { CaseBlockView, hostname, Screenshot, StackTags } from "@/components/ProjectCard";
import { Shell } from "@/components/Shell";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

// Neu im CMS angelegte Projekte werden beim ersten Aufruf erzeugt.
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getProjects()).find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} – ${p.meta}`, description: p.description, alternates: { canonical: `/projekte/${p.slug}` } };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const all = await getProjects();
  const index = all.findIndex((x) => x.slug === slug);
  const project = all[index];
  if (!project) notFound();

  const group = projectGroups.find((g) => g.id === project.group);
  const next = all[(index + 1) % all.length]!;

  return (
    <Shell base="/">
      <section className="detail-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Brotkrumen">
            <Link href="/">Start</Link> <span aria-hidden="true">/</span>{" "}
            <Link href={`/#${project.group}`}>{group?.eyebrow}</Link> <span aria-hidden="true">/</span>{" "}
            <span aria-current="page">{project.name}</span>
          </nav>
          <p className="meta"><span className="num">{project.number}</span>{project.meta} · {project.kind}</p>
          <h1>{project.name}</h1>
          <p className="lede">{project.description}</p>
          <div className="cta">
            <a className="btn btn-teal" href={project.url} target="_blank" rel="noopener">{project.displayDomain ?? hostname(project.url)} öffnen ↗</a>
            <Link className="btn btn-line" href="/#kontakt">Ähnliches Projekt anfragen</Link>
          </div>
        </div>
      </section>

      <div className="wrap detail">
        <div className="detail-shot"><Screenshot project={project} sizes="(max-width: 1200px) 100vw, 900px" priority /></div>

        <div className="detail-grid">
          <article className="detail-body">
            {project.caseStudy.length > 0 ? (
              project.caseStudy.map((b, i) => <CaseBlockView key={`${b.title}-${i}`} block={b} />)
            ) : (
              <>
                <h3>Über das Projekt</h3>
                <p>{project.description}</p>
              </>
            )}
          </article>
          <aside className="detail-facts" aria-label="Eckdaten">
            <dl>
              <div><dt>Bereich</dt><dd>{group?.eyebrow}</dd></div>
              <div><dt>Art</dt><dd>{project.kind}</dd></div>
              {project.metric && <div><dt>Kennzahl</dt><dd>{project.metric}</dd></div>}
              <div><dt>Live</dt><dd><a href={project.url} target="_blank" rel="noopener">{project.displayDomain ?? hostname(project.url)} ↗</a></dd></div>
            </dl>
            {project.stack.length > 0 && (<><h4>Technologien</h4><StackTags stack={project.stack} /></>)}
          </aside>
        </div>

        {next.slug !== project.slug && (
          <Link className="next-project" href={`/projekte/${next.slug}`}>
            <small>Nächstes Projekt</small>
            <b>{next.name}</b>
            <span>{next.meta}</span>
          </Link>
        )}
      </div>
    </Shell>
  );
}
