import { services } from "@/content/site";
import { Accent } from "./Accent";
import { Icon } from "./Icons";
import type { I18nProps } from "./types";

export function Services({ t }: I18nProps) {
  const s = t.services;
  return (
    <section id="leistungen" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="center">
          <span className="eyebrow">{s.eyebrow}</span>
          <h2 className="h2"><Accent {...s.heading} /></h2>
          <p className="lede">{s.lede}</p>
        </div>
        <div className="services">
          {services.map((svc) => {
            const item = s.items[svc.id];
            return (
              <a key={svc.id} className={`svc tone-${svc.tone}${svc.wide ? " svc-wide" : ""}`} href={svc.proof.href}>
                <span className="ic"><Icon name={svc.icon} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul>{item.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <span className="foot">
                  <span>{s.provenBy} <b>{item.proof ?? svc.proof.label}</b></span>
                  <span className="arrow"><Icon name="arrow" /></span>
                </span>
              </a>
            );
          })}
        </div>
        <p className="center more-link"><a href="#kenntnisse">{s.allTech}</a></p>
      </div>
    </section>
  );
}
