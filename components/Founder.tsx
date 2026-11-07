import Image from "next/image";
import { fmt, localePath } from "@/content/i18n";
import { company, founderLinks } from "@/content/site";
import { Accent } from "./Accent";
import type { I18nProps } from "./types";

export function Founder({ locale, t }: I18nProps) {
  const f = t.founder;
  const name = company.managingDirector;
  return (
    <section id="gruender">
      <div className="wrap">
        <div className="founder">
          <div className={founderLinks.portrait ? "avatar avatar-photo" : "avatar"}>
            {founderLinks.portrait ? (
              <Image src={founderLinks.portrait} alt={fmt(f.portraitAlt, { name })} fill sizes="240px" style={{ objectFit: "cover", objectPosition: "center top" }} />
            ) : (
              <span>{f.portrait}<br />{name}</span>
            )}
          </div>
          <div>
            <span className="eyebrow">{f.eyebrow}</span>
            <h2><Accent {...f.heading} /></h2>
            <p className="role">{name} · {f.role}</p>
            {f.paragraphs.map((p) => <p key={p}>{p}</p>)}
            <ul className="stations">
              {f.stations.map((s, i) => {
                const href = founderLinks.stationLinks[i];
                return (
                  <li key={s.role + s.org}>
                    <span className="when">{s.period}</span>
                    <b>{s.role}</b>
                    <span>{href ? <a href={href} target="_blank" rel="noopener">{s.org}</a> : s.org}</span>
                  </li>
                );
              })}
            </ul>
            <dl className="langs">
              {f.languages.map((l) => (
                <div key={l.name}><dt>{l.name}</dt><dd>{l.level}</dd></div>
              ))}
            </dl>
            <p className="founder-more"><a href={localePath(locale, "/team")}>{f.more}</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}
