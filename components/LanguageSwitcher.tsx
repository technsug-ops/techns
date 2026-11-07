"use client";

import { usePathname } from "next/navigation";
import { localeNames, localePath, locales, localeShort, stripLocale, type Locale } from "@/content/i18n";

/** Wechselt die Sprache auf derselben Seite. */
export function LanguageSwitcher({ locale, label, className = "lang" }: { locale: Locale; label: string; className?: string }) {
  const path = stripLocale(usePathname() || "/");
  return (
    <nav className={className} aria-label={label}>
      {locales.map((l) => (
        <a
          key={l}
          href={localePath(l, path)}
          hrefLang={l}
          lang={l}
          title={localeNames[l]}
          aria-current={l === locale ? "true" : undefined}
          className={l === locale ? "on" : undefined}
        >
          {localeShort[l]}
        </a>
      ))}
    </nav>
  );
}
