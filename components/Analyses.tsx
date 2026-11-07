import { analyses } from "@/content/site";
import { Accent } from "./Accent";

export function Analyses() {
  return (
    <section id="analysen" className="analyses">
      <div className="wrap">
        <span className="eyebrow">Analysen</span>
        <h2 className="h2"><Accent before="Growth-Management-" accent="Berichte" /></h2>
        <p className="lede">Anonymisierte Auszüge: Ausgangslage, Messung, Befund und Empfehlung. Vollständige Fassung auf Anfrage.</p>
        <div className="reps">
          {analyses.map((a) => (
            <article key={a.title} className="rep">
              <span className="m">{a.meta}</span>
              <h3>{a.title}</h3>
              <p>{a.summary}</p>
              <a href="#kontakt">Vollständige Analyse anfragen →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
