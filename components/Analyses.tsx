import { Accent } from "./Accent";
import type { I18nProps } from "./types";

export function Analyses({ t }: I18nProps) {
  const a = t.analyses;
  return (
    <section id="analysen" className="analyses">
      <div className="wrap">
        <span className="eyebrow">{a.eyebrow}</span>
        <h2 className="h2"><Accent {...a.heading} /></h2>
        <p className="lede">{a.lede}</p>
        <div className="reps">
          {a.items.map((item) => (
            <article key={item.title} className="rep">
              <span className="m">{item.meta}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <a href="#kontakt">{a.request}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
