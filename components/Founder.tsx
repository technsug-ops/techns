import Image from "next/image";
import { founder } from "@/content/site";
import { Accent } from "./Accent";

export function Founder() {
  return (
    <section id="gruender">
      <div className="wrap">
        <div className="founder">
          <div className="avatar">
            {founder.portrait ? (
              <Image src={founder.portrait} alt={`Porträt von ${founder.name}`} fill sizes="180px" style={{ objectFit: "cover" }} />
            ) : (
              <span>Porträtfoto<br />{founder.name}</span>
            )}
          </div>
          <div>
            <span className="eyebrow">Gründer &amp; Geschäftsführer</span>
            <h2><Accent {...founder.heading} /></h2>
            <p className="role">{founder.name} · {founder.role}</p>
            {founder.paragraphs.map((p) => <p key={p}>{p}</p>)}
            <ul className="stations">
              {founder.stations.map((s) => (
                <li key={s.role + s.org}>
                  <span className="when">{s.period}</span>
                  <b>{s.role}</b>
                  <span>{s.href ? <a href={s.href} target="_blank" rel="noopener">{s.org}</a> : s.org}</span>
                </li>
              ))}
            </ul>
            <dl className="langs">
              {founder.languages.map((l) => (
                <div key={l.name}><dt>{l.name}</dt><dd>{l.level}</dd></div>
              ))}
            </dl>
            <p className="founder-more"><a href="/team">Das ganze Team kennenlernen →</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}
