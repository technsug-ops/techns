import { currentProject, principles, stats } from "@/content/site";
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

export function NowBand() {
  return (
    <div className="wrap">
      <a className="now" href={currentProject.url} target="_blank" rel="noopener">
        <span className="tag"><i />Aktuell in Entwicklung</span>
        <strong>{currentProject.name}</strong>
        <p>{currentProject.text}</p>
        <span className="arrow"><Icon name="arrow" /></span>
      </a>
    </div>
  );
}
