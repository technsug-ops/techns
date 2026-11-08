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
  return { title: t.impressum.title, alternates: { canonical: alternates("/impressum")[locale], languages: alternates("/impressum") } };
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const i = t.impressum;
  return (
    <Shell locale={locale} t={t}>
      <div className="legal-page">
        <div className="wrap">
          <Link className="back" href={localePath(locale, "/")}>{t.common.toHome}</Link>
          <h1>{i.title}</h1>
          <h2>{i.provider}</h2>
          <p>{company.legalName}<br />{company.street}<br />{company.postalCode} {company.city}</p>
          <h2>{i.representedBy}</h2>
          <p>{company.managingDirector}, {i.managingDirector}</p>
          <h2>{i.contact}</h2>
          <p>{i.phone}: {company.phone.display}<br />{i.email}: <a href={`mailto:${company.email}`}>{company.email}</a></p>
          <h2>{i.register}</h2>
          <p>{i.court}: {company.court}<br />{i.registerNumber}: {company.register}</p>
          <h2>{i.vat}</h2>
          <p>{i.vatText}: {company.vatId}</p>
          <p className="note">{i.note}</p>
        </div>
      </div>
    </Shell>
  );
}
