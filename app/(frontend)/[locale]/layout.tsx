import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { alternates, isLocale, locales, ogLocale } from "@/content/i18n";
import { company } from "@/content/site";
import "../globals.css";

// Schriften liegen selbst gehostet unter /public/fonts (siehe globals.css):
// keine Anfrage an Google im Browser der Besucher (DSGVO).

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(company.siteUrl),
    title: { default: t.meta.title, template: "%s · TechNS" },
    description: t.meta.description,
    alternates: { canonical: alternates("/")[locale], languages: alternates("/") },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      siteName: company.name,
      title: t.meta.ogTitle,
      description: t.claim,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = { themeColor: "#0F2E2B" };

export default async function LocaleLayout({ children, params }: Props & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    url: company.siteUrl,
    telephone: company.phone.display,
    email: company.email,
    address: { "@type": "PostalAddress", streetAddress: company.street, postalCode: company.postalCode, addressLocality: company.city, addressCountry: "DE" },
    founder: { "@type": "Person", name: company.managingDirector },
  };
  return (
    <html lang={locale}>
      <head>
        <link rel="preload" href="/fonts/figtree-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <a className="skip" href="#inhalt">{t.common.skip}</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
