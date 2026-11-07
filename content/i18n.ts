/**
 * Sprachen der Website. Deutsch liegt ohne Präfix unter „/“, Englisch unter „/en“, Türkisch unter „/tr“.
 */
export const locales = ["de", "en", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export const localeNames: Record<Locale, string> = { de: "Deutsch", en: "English", tr: "Türkçe" };
export const localeShort: Record<Locale, string> = { de: "DE", en: "EN", tr: "TR" };
export const ogLocale: Record<Locale, string> = { de: "de_DE", en: "en_US", tr: "tr_TR" };

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}

/** Interner Pfad → öffentlicher Pfad mit Sprachpräfix (Deutsch ohne Präfix). */
export function localePath(locale: Locale, path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return p;
  return p === "/" ? `/${locale}` : `/${locale}${p}`;
}

/** Entfernt ein Sprachpräfix: „/en/team“ → „/team“. */
export function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if (isLocale(seg) && seg !== defaultLocale) {
    const rest = pathname.slice(seg.length + 1);
    return rest === "" ? "/" : rest;
  }
  return pathname || "/";
}

/** hreflang-Alternativen für Metadaten. */
export function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localePath(l, path);
  languages["x-default"] = localePath(defaultLocale, path);
  return languages;
}

/** Ersetzt {platzhalter} in Übersetzungen. */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? `{${k}}`));
}
