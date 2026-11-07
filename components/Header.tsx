"use client";

import { nav } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Logo } from "./Logo";

/** Obere Leiste – auf Mobilgeräten und Tablets, auf großen Bildschirmen übernimmt die Sidebar. */
export function Header({ base = "" }: { base?: string }) {
  const active = useActiveSection(nav.map((n) => n.href.slice(1)));
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
            const on = active === item.href.slice(1);
            return (
              <a key={item.href} className={`lnk${on ? " active" : ""}`} href={`${base}${item.href}`} aria-current={on ? "location" : undefined}>
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
