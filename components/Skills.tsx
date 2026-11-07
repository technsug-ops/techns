import { skillIcons } from "@/content/site";
import { Accent } from "./Accent";
import { Icon } from "./Icons";
import type { I18nProps } from "./types";

export function Skills({ t }: I18nProps) {
  const s = t.skills;
  return (
    <section id="kenntnisse">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">{s.eyebrow}</span>
            <h2 className="h2"><Accent {...s.heading} /></h2>
            <p className="lede">{s.lede}</p>
          </div>
        </div>
        <div className="skills">
          {s.groups.map((g, i) => (
            <div key={g.title} className="skill">
              <span className="ic"><Icon name={skillIcons[i] ?? "code"} /></span>
              <h3>{g.title}</h3>
              <ul>{g.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
