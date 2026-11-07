import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { alternates, isLocale, localePath } from "@/content/i18n";
import { Shell } from "@/components/Shell";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return { title: t.privacy.title, robots: { index: false }, alternates: { canonical: alternates("/datenschutz")[locale], languages: alternates("/datenschutz") } };
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
          <p className="note">{t.privacy.note}</p>
        </div>
      </div>
    </Shell>
  );
}
