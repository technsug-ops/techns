import { process } from "@/content/site";
import { Accent } from "./Accent";
import { Icon } from "./Icons";

export function Process() {
  return (
    <section id="vorgehen">
      <div className="wrap">
        <div className="center">
          <span className="eyebrow">Vorgehen</span>
          <h2 className="h2"><Accent {...process.heading} /></h2>
          <p className="lede">{process.lede}</p>
        </div>
        <ol className="steps">
          {process.steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="n"><Icon name={s.icon} /></span>
              <small>Schritt {i + 1}</small>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
