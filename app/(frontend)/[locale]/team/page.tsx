import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { alternates, isLocale, localePath } from "@/content/i18n";
import { getTeam } from "@/lib/team";
import { Accent } from "@/components/Accent";
import { StackTags } from "@/components/ProjectCard";
import { Shell } from "@/components/Shell";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: t.team.metaTitle, description: t.team.metaDescription, alternates: { canonical: alternates("/team")[locale], languages: alternates("/team") } };
}

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const team = await getTeam(locale);
  const home = localePath(locale, "/");
  return (
    <Shell locale={locale} t={t}>
      <section className="team-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label={t.common.breadcrumbs}>
            <Link href={home}>{t.common.start}</Link> <span aria-hidden="true">/</span> <span aria-current="page">{t.team.eyebrow}</span>
          </nav>
          <span className="eyebrow">{t.team.eyebrow}</span>
          <h1><Accent {...t.team.heading} /></h1>
          <p className="lede">{t.team.lede}</p>
        </div>
      </section>

      <div className="wrap">
        <ul className="team-grid">
          {team.map((m) => (
            <li key={m.id} className="member">
              <div className="member-photo">
                {m.photo ? (
                  <Image src={m.photo.url} alt={m.photo.alt || m.name} fill sizes="(max-width: 700px) 100vw, 360px" style={{ objectFit: "cover", objectPosition: "center top" }} />
                ) : (
                  <span className="ini" aria-hidden="true">{initials(m.name)}</span>
                )}
              </div>
              <div className="member-body">
                <h2>{m.name}</h2>
                <p className="role">{m.role}</p>
                {m.bio && <p>{m.bio}</p>}
                <StackTags stack={m.focus} label={t.team.eyebrow} />
                {(m.linkedin || m.email) && (
                  <div className="member-links">
                    {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>}
                    {m.email && <a href={`mailto:${m.email}`}>{t.contact.email}</a>}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="join">
          <div>
            <h2>{t.team.joinTitle}</h2>
            <p>{t.team.joinText}</p>
          </div>
          <a className="btn btn-teal" href={`${home}#kontakt`}>{t.team.joinCta}</a>
        </div>
      </div>
    </Shell>
  );
}
