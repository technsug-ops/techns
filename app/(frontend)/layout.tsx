import type { Metadata, Viewport } from "next";
import { company } from "@/content/site";
import "./globals.css";

// Schriften liegen selbst gehostet unter /public/fonts (siehe globals.css):
// keine Anfrage an Google im Browser der Besucher (DSGVO).

const siteUrl = "https://techns.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "TechNS – Prozesse, Software und Daten für den Mittelstand", template: "%s · TechNS" },
  description: "TechNS UG aus Oberursel bei Frankfurt: Prozessanalyse, Digitalisierung, ERP-Systeme, Websites sowie Marktplatz- und ERP-Integration.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: company.name,
    title: "TechNS – Systeme, mit denen Unternehmen wachsen",
    description: company.claim,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0F2E2B" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    url: siteUrl,
    telephone: company.phone.display,
    address: { "@type": "PostalAddress", streetAddress: company.street, postalCode: "61440", addressLocality: "Oberursel (Taunus)", addressCountry: "DE" },
    founder: { "@type": "Person", name: company.managingDirector },
  };
  return (
    <html lang="de">
      <head>
        <link rel="preload" href="/fonts/figtree-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <a className="skip" href="#inhalt">Zum Inhalt springen</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
