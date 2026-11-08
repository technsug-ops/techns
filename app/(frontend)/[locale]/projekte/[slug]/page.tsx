import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { alternates, fmt, isLocale, localePath, locales } from "@/content/i18n";
import { getProjects } from "@/lib/projects";
import { CaseBlockView, domainOf, Screenshot, StackTags } from "@/components/ProjectCard";
import { Shell } from "@/components/Shell";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects("de");
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

// Neu im CMS angelegte Projekte werden beim ersten Aufruf erzeugt.
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const p = (await getProjects(locale)).find((x) => x.slug === slug);
  if (!p) return {};
  const path = `/projekte/${p.slug}`;
  return { title: `${p.name} – ${p.meta}`, description: p.description, alternates: { canonical: alternates(path)[locale], languages: alternates(path) } };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const all = await getProjects(locale);
  const index = all.findIndex((x) => x.slug === slug);
  const project = all[index];
  if (!project) notFound();

  const group = t.groups[project.group];
  const next = all[(index + 1) % all.length]!;
  const home = localePath(locale, "/");
  const domain = domainOf(project);

  return (
    <Shell locale={locale} t={t}>
      <section className="detail-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label={t.common.breadcrumbs}>
            <Link href={home}>{t.common.start}</Link> <span aria-hidden="true">/</span>{" "}
            <a href={`${home}#${project.group}`}>{group.eyebrow}</a> <span aria-hidden="true">/</span>{" "}
            <span aria-current="page">{project.name}</span>
          </nav>
          <p className="meta"><span className="num">{project.number}</span>{project.meta} · {t.project.kinds[project.kind]}</p>
          <h1>{project.name}</h1>
          <p className="lede">{project.description}</p>
          <div className="cta">
            {project.url && domain && <a className="btn btn-teal" href={project.url} target="_blank" rel="noopener">{fmt(t.project.openSite, { domain })}</a>}
            <a className="btn btn-line" href={`${home}#kontakt`}>{t.project.similar}</a>
          </div>
        </div>
      </section>

      <div className="wrap detail">
        <div className="detail-shot"><Screenshot project={project} t={t} sizes="(max-width: 980px) 100vw, 80vw" priority /></div>

        <div className="detail-grid">
          <article className="detail-body">
            {project.caseStudy.length > 0 ? (
              project.caseStudy.map((b, i) => <CaseBlockView key={`${b.title}-${i}`} block={b} />)
            ) : (
              <>
                <h3>{t.project.about}</h3>
                <p>{project.description}</p>
              </>
            )}
          </article>
          <aside className="detail-facts" aria-label={t.project.facts}>
            <dl>
              <div><dt>{t.project.area}</dt><dd>{group.eyebrow}</dd></div>
              <div><dt>{t.project.kind}</dt><dd>{t.project.kinds[project.kind]}</dd></div>
              {project.metric && <div><dt>{t.project.metric}</dt><dd>{project.metric}</dd></div>}
              {project.url && <div><dt>{t.project.live}</dt><dd><a href={project.url} target="_blank" rel="noopener">{domain} ↗</a></dd></div>}
            </dl>
            {project.stack.length > 0 && (<><h4>{t.project.technologies}</h4><StackTags stack={project.stack} label={t.project.technologies} /></>)}
          </aside>
        </div>

        {next.slug !== project.slug && (
          <Link className="next-project" href={localePath(locale, `/projekte/${next.slug}`)}>
            <small>{t.project.next}</small>
            <b>{next.name}</b>
            <span>{next.meta}</span>
          </Link>
        )}
      </div>
    </Shell>
  );
}
