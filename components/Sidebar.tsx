"use client";

import { usePathname } from "next/navigation";
import { localePath, type Locale } from "@/content/i18n";
import { company, nav } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { ChromeLabels } from "./Header";
import { Icon } from "./Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { isActive, navHref, sectionIds } from "./navHref";

/** Feste Seitenleiste auf großen Bildschirmen (ab 1180 px). */
export function Sidebar({ locale, labels }: { locale: Locale; labels: ChromeLabels }) {
  const section = useActiveSection(sectionIds(nav));
  const pathname = usePathname() || "/";
  const home = localePath(locale, "/");
  return (
    <aside className="side" aria-label={labels.sections}>
      <div className="side-top">
        <a className="brand" href={`${home}#start`} aria-label={labels.toTop}>
          <Logo className="brand-mark" />
          TechNS
        </a>
        <LanguageSwitcher locale={locale} label={labels.language} />
      </div>
      <p className="side-claim">{labels.claim}</p>

      <nav className="side-nav" aria-label={labels.sections}>
        {nav.map((item) => {
          const on = isActive(item, pathname, section);
          return (
            <a key={item.key} href={navHref(item, locale)} className={on ? "active" : undefined} aria-current={on ? "location" : undefined}>
              {labels.nav[item.key]}
            </a>
          );
        })}
      </nav>

      <a className="btn btn-teal side-cta" href={`${home}#kontakt`}>{labels.projectInquiry}</a>

      <div className="person">
        <span className="person-ava" aria-hidden="true">HY</span>
        <span>
          <small>{labels.contactPerson}</small>
          <b>{company.managingDirector}</b>
          <a href={company.phone.href}>{company.phone.display}</a>
        </span>
      </div>

      <p className="side-loc"><Icon name="pin" /> {labels.location}</p>
    </aside>
  );
}
