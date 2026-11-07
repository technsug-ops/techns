import { fmt } from "@/content/i18n";
import { processIcons } from "@/content/site";
import { Accent } from "./Accent";
import { Icon } from "./Icons";
import type { I18nProps } from "./types";

export function Process({ t }: I18nProps) {
  const p = t.process;
  return (
    <section id="vorgehen">
      <div className="wrap">
        <div className="center">
          <span className="eyebrow">{p.eyebrow}</span>
          <h2 className="h2"><Accent {...p.heading} /></h2>
          <p className="lede">{p.lede}</p>
        </div>
        <ol className="steps">
          {p.steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="n"><Icon name={processIcons[i] ?? "measure"} /></span>
              <small>{fmt(p.step, { n: i + 1 })}</small>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
