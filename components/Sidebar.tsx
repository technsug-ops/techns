"use client";

import { company, founder, nav } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Icon } from "./Icons";
import { Logo } from "./Logo";

/** Feste Seitenleiste auf großen Bildschirmen (ab 1180 px). */
export function Sidebar({ base = "" }: { base?: string }) {
  const active = useActiveSection(nav.map((n) => n.href.slice(1)));
  return (
    <aside className="side" aria-label="Seitenleiste">
      <a className="brand" href={`${base}#start`} aria-label="TechNS – zum Seitenanfang">
        <Logo className="brand-mark" />
        TechNS
      </a>
      <p className="side-claim">{company.claim}</p>

      <nav className="side-nav" aria-label="Abschnitte">
        {nav.map((item) => {
          const on = active === item.href.slice(1);
          return (
            <a key={item.href} href={`${base}${item.href}`} className={on ? "active" : undefined} aria-current={on ? "location" : undefined}>
              {item.label}
            </a>
          );
        })}
      </nav>

      <a className="btn btn-teal side-cta" href={`${base}#kontakt`}>Projekt anfragen</a>

      <div className="person">
        <span className="person-ava" aria-hidden="true">HY</span>
        <span>
          <small>Ihr Ansprechpartner</small>
          <b>{founder.name}</b>
          <a href={company.phone.href}>{company.phone.display}</a>
        </span>
      </div>

      <p className="side-loc"><Icon name="pin" /> Oberursel bei Frankfurt</p>
    </aside>
  );
}
