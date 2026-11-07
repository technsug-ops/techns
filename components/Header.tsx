"use client";

import { nav } from "@/content/site";
import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navHref, sectionIds } from "./navHref";
import { Logo } from "./Logo";

/** Obere Leiste – auf Mobilgeräten und Tablets, auf großen Bildschirmen übernimmt die Sidebar. */
export function Header({ base = "" }: { base?: string }) {
  const section = useActiveSection(sectionIds(nav));
  const pathname = usePathname();
  const isOn = (href: string) => (href.startsWith("/") ? pathname === href : pathname === "/" && section === href.slice(1));
  return (
    <header className="top">
      <div className="wrap">
        <a className="brand" href={`${base}#start`} aria-label="TechNS – zum Seitenanfang">
          <Logo className="brand-mark" />
          TechNS
        </a>
        <a className="btn btn-teal top-cta" href={`${base}#kontakt`}>Kontakt</a>
        <nav className="menu" aria-label="Hauptnavigation">
          {nav.map((item) => {
            const on = isOn(item.href);
            return (
              <a key={item.href} className={`lnk${on ? " active" : ""}`} href={navHref(item, base)} aria-current={on ? "location" : undefined}>
                {item.label}
              </a>
            );
          })}
          <a className="btn btn-teal" href={`${base}#kontakt`}>Kontakt</a>
        </nav>
      </div>
    </header>
  );
}
