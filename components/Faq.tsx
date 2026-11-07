import { faq } from "@/content/site";
import { Accent } from "./Accent";

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section id="faq" className="band">
      <div className="wrap faq-wrap">
        <div>
          <span className="eyebrow">Häufige Fragen</span>
          <h2 className="h2"><Accent before="Gut zu wissen," accent="bevor" after="wir sprechen." /></h2>
          <p className="lede">Ihre Frage ist nicht dabei? Schreiben Sie uns – wir antworten persönlich.</p>
        </div>
        <div className="faq">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
