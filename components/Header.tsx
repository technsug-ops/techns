"use client";

import { usePathname } from "next/navigation";
import { localePath, type Locale } from "@/content/i18n";
import { nav, type NavKey } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { isActive, navHref, sectionIds } from "./navHref";

export type ChromeLabels = {
  nav: Record<NavKey, string>;
  contact: string;
  projectInquiry: string;
  contactPerson: string;
  location: string;
  toTop: string;
  language: string;
  sections: string;
  mainNav: string;
  claim: string;
};

/** Obere Leiste – auf Mobilgeräten und Tablets; auf großen Bildschirmen übernimmt die Sidebar. */
export function Header({ locale, labels }: { locale: Locale; labels: ChromeLabels }) {
  const section = useActiveSection(sectionIds(nav));
  const pathname = usePathname() || "/";
  const home = localePath(locale, "/");
  return (
    <header className="top">
      <div className="wrap">
        <a className="brand" href={`${home}#start`} aria-label={labels.toTop}>
          <Logo className="brand-mark" />
          TechNS
        </a>
        <div className="top-right">
          <LanguageSwitcher locale={locale} label={labels.language} className="lang lang-top" />
          <a className="btn btn-teal top-cta" href={`${home}#kontakt`}>{labels.contact}</a>
        </div>
        <nav className="menu" aria-label={labels.mainNav}>
          {nav.map((item) => {
            const on = isActive(item, pathname, section);
            return (
              <a key={item.key} className={`lnk${on ? " active" : ""}`} href={navHref(item, locale)} aria-current={on ? "location" : undefined}>
                {labels.nav[item.key]}
              </a>
            );
          })}
          <a className="btn btn-teal" href={`${home}#kontakt`}>{labels.contact}</a>
        </nav>
      </div>
    </header>
  );
}
