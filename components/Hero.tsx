import { hero } from "@/content/site";
import { Icon } from "./Icons";

const bars = [38, 52, 44, 63, 72, 84, 96];

export function Hero() {
  const { headline } = hero;
  return (
    <section id="start" className="hero">
      <div className="wrap">
        <div>
          <span className="kick"><i />{hero.kicker}</span>
          <h1>
            {headline.before}{" "}
            <span className="ring">
              <em>{headline.accent}</em>
              <svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
                <path d="M150 12C115 2 45 4 17 22 -6 37 8 64 62 72c52 7 120 0 132-24 9-19-14-34-56-38" />
              </svg>
            </span>
            {headline.after}
          </h1>
          <p className="sub">{hero.sub}</p>
          <div className="cta">
            <a className="btn btn-teal" href="#kontakt">Erstgespräch vereinbaren</a>
            <a className="btn btn-ghost" href="#erp">Projekte ansehen</a>
          </div>
        </div>

        <div className="scene" aria-hidden="true">
          <div className="panel main">
            <div className="dots"><span /><span /><span /></div>
            <h4>Abläufe · vorher → nachher</h4>
            <div className="bars">
              {bars.map((h, i) => (
                <span key={i} className={i >= 4 ? "hi" : undefined} style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <div className="flowrow">
              <b>Quellen</b><Icon name="next" /><b>Abgleich</b><Icon name="next" /><b className="core">Ein System</b>
            </div>
          </div>
          <div className="chip a">
            <span className="ic"><Icon name="check" /></span>
            <span>Bestellungen synchronisiert<small>automatisch, ohne Abtippen</small></span>
          </div>
          <div className="chip b">
            <span className="ic"><Icon name="flow" /></span>
            <span>Prozess dokumentiert<small>Verantwortung geklärt</small></span>
          </div>
        </div>
      </div>
    </section>
  );
}
