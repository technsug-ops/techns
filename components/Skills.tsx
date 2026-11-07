import { skills } from "@/content/site";
import { Accent } from "./Accent";
import { Icon } from "./Icons";

export function Skills() {
  return (
    <section id="kenntnisse">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">Kenntnisse</span>
            <h2 className="h2"><Accent before="Unser" accent="Werkzeugkasten" /></h2>
            <p className="lede">Womit wir in den Projekten oben tatsächlich arbeiten – ohne Prozentbalken, dafür mit Belegen.</p>
          </div>
        </div>
        <div className="skills">
          {skills.map((g) => (
            <div key={g.title} className="skill">
              <span className="ic"><Icon name={g.icon} /></span>
              <h3>{g.title}</h3>
              <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
