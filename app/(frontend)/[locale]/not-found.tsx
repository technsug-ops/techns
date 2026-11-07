import { headers } from "next/headers";
import { getDictionary } from "@/content/dictionaries";
import { defaultLocale, isLocale, localePath } from "@/content/i18n";

// Die Sprache setzt proxy.ts als Request-Header (not-found erhält keine params).
export default async function NotFound() {
  const h = (await headers()).get("x-locale") ?? "";
  const locale = isLocale(h) ? h : defaultLocale;
  const t = getDictionary(locale);
  return (
    <main id="inhalt" className="legal-page">
      <div className="wrap">
        <h1>{t.notFound.title}</h1>
        <p>{t.notFound.text}</p>
        <a className="btn btn-teal" href={localePath(locale, "/")}>{t.notFound.cta}</a>
      </div>
    </main>
  );
}
