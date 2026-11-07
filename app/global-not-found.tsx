import type { Metadata } from "next";
import { headers } from "next/headers";
import { getDictionary } from "@/content/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/content/i18n";
import "./(frontend)/globals.css";

// 404 für alle unbekannten Adressen. Die Sprache setzt proxy.ts als Header „x-locale“.
export const metadata: Metadata = { title: "404 · TechNS", robots: { index: false } };

export default async function GlobalNotFound() {
  const h = (await headers()).get("x-locale") ?? "";
  const locale = isLocale(h) ? h : defaultLocale;
  const t = getDictionary(locale);
  return (
    <html lang={locale}>
      <body>
        <main id="inhalt" className="legal-page">
          <div className="wrap">
            <p className="eyebrow">404</p>
            <h1>{t.notFound.title}</h1>
            <p>{t.notFound.text}</p>
            <a className="btn btn-teal" href={localePath(locale, "/")}>{t.notFound.cta}</a>
          </div>
        </main>
      </body>
    </html>
  );
}
