import Link from "next/link";
import { principles, stats } from "@/content/site";
import { getProjects } from "@/lib/projects";
import { Icon } from "./Icons";

export function StatsBadge() {
  return (
    <div className="badge-wrap">
      <div className="wrap">
        <dl className="badge">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd><b>{s.value}</b><span>{s.label}</span></dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export function Principles() {
  return (
    <div className="icons">
      <div className="wrap">
        <ul>
          {principles.map((p) => (
            <li key={p.label.join(" ")}>
              <Icon name={p.icon} />
              {p.label[0]}<br />{p.label[1]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Kompakte Karten für alle Projekte mit Art „In Entwicklung“ – gepflegt im CMS. */
export async function NowBand() {
  const items = (await getProjects()).filter((p) => p.kind === "In Entwicklung");
  if (items.length === 0) return null;
  return (
    <div className="wrap now-wrap">
      <p className="now-label"><i />Aktuell in Entwicklung</p>
      <div className="now-grid">
        {items.map((p) => (
          <Link key={p.slug} className="now-card" href={`/projekte/${p.slug}`}>
            <span className="now-ic"><Icon name={p.group === "erp" ? "sync" : "code"} /></span>
            <span className="now-text">
              <strong>{p.name}</strong>
              <span>{p.meta}</span>
            </span>
            <span className="arrow"><Icon name="arrow" /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
