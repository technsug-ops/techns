import { Accent } from "./Accent";
import type { I18nProps } from "./types";

export function Faq({ locale, t }: I18nProps) {
  const f = t.faq;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: f.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <section id="faq" className="band">
      <div className="wrap faq-wrap">
        <div>
          <span className="eyebrow">{f.eyebrow}</span>
          <h2 className="h2"><Accent {...f.heading} /></h2>
          <p className="lede">{f.lede}</p>
        </div>
        <div className="faq">
          {f.items.map((i) => (
            <details key={i.q}>
              <summary>{i.q}</summary>
              <p>{i.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
