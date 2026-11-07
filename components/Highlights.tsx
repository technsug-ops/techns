import Link from "next/link";
import { localePath } from "@/content/i18n";
import { principleIcons, statValues } from "@/content/site";
import { getProjects } from "@/lib/projects";
import { Icon } from "./Icons";
import type { I18nProps } from "./types";

export function StatsBadge({ locale, t }: I18nProps) {
  const fmtValue = (v: string) => (locale === "en" ? v.replace(/\./g, ",") : v);
  return (
    <div className="badge-wrap">
      <div className="wrap">
        <dl className="badge" aria-label={t.statsLabel}>
          {statValues.map((v, i) => (
            <div key={i}>
              <dt className="sr-only">{t.stats[i]}</dt>
              <dd><b>{fmtValue(v)}</b><span>{t.stats[i]}</span></dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export function Principles({ t }: I18nProps) {
  return (
    <div className="icons">
      <div className="wrap">
        <ul>
          {principleIcons.map((icon, i) => (
            <li key={icon}>
              <Icon name={icon} />
              {t.principles[i]?.[0]}<br />{t.principles[i]?.[1]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Kompakte Karten für alle Projekte mit Art „In Entwicklung“ – gepflegt im CMS. */
export async function NowBand({ locale, t }: I18nProps) {
  const items = (await getProjects(locale)).filter((p) => p.kind === "In Entwicklung");
  if (items.length === 0) return null;
  return (
    <div className="wrap now-wrap">
      <p className="now-label"><i />{t.now.label}</p>
      <div className="now-grid">
        {items.map((p) => (
          <Link key={p.slug} className="now-card" href={localePath(locale, `/projekte/${p.slug}`)}>
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
