import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { alternates, isLocale, localePath } from "@/content/i18n";
import { company } from "@/content/site";
import { Shell } from "@/components/Shell";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: t.privacy.title, alternates: { canonical: alternates("/datenschutz")[locale], languages: alternates("/datenschutz") } };
}

export default async function DatenschutzPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  return (
    <Shell locale={locale} t={t}>
      <div className="legal-page">
        <div className="wrap">
          <Link className="back" href={localePath(locale, "/")}>{t.common.toHome}</Link>
          <h1>{t.privacy.title}</h1>
          <h2>{t.privacy.controller}</h2>
          <p>
            {company.legalName}<br />{company.street}<br />{company.postalCode} {company.city}<br />
            {t.impressum.representedBy}: {company.managingDirector}<br />
            {t.impressum.phone}: {company.phone.display}<br />
            {t.impressum.email}: <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
          {t.privacy.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              {s.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            </section>
          ))}
          <p className="updated">{t.privacy.updated}</p>
        </div>
      </div>
    </Shell>
  );
}
