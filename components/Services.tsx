import { services } from "@/content/site";
import { Accent } from "./Accent";
import { Icon } from "./Icons";

export function Services() {
  return (
    <section id="leistungen" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="center">
          <span className="eyebrow">Leistungen</span>
          <h2 className="h2"><Accent before="Was wir für" accent="Sie" after="tun" /></h2>
          <p className="lede">Vier Leistungsfelder – jedes belegt durch Systeme, die wir selbst gebaut haben und betreiben.</p>
        </div>
        <div className="services">
          {services.map((s) => (
            <a key={s.id} className={`svc tone-${s.tone}`} href={s.proof.href}>
              <span className="ic"><Icon name={s.icon} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <span className="foot">
                <span>Belegt durch <b>{s.proof.label}</b></span>
                <span className="arrow"><Icon name="arrow" /></span>
              </span>
            </a>
          ))}
        </div>
        <p className="center more-link"><a href="#kenntnisse">Alle Technologien ansehen →</a></p>
      </div>
    </section>
  );
}
