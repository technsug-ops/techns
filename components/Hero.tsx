import { localePath } from "@/content/i18n";
import { Icon } from "./Icons";
import type { I18nProps } from "./types";

const bars = [38, 52, 44, 63, 72, 84, 96];

export function Hero({ locale, t }: I18nProps) {
  const { headline } = t.hero;
  const home = localePath(locale, "/");
  const after = headline.after ? (/^[.,!?:;]/.test(headline.after) ? headline.after : ` ${headline.after}`) : null;
  return (
    <section id="start" className="hero">
      <div className="wrap">
        <div>
          <span className="kick"><i />{t.hero.kicker}</span>
          <h1>
            {headline.before}{" "}
            <span className="ring">
              <em>{headline.accent}</em>
              <svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
                <path d="M150 12C115 2 45 4 17 22 -6 37 8 64 62 72c52 7 120 0 132-24 9-19-14-34-56-38" />
              </svg>
            </span>
            {after}
          </h1>
          <p className="sub">{t.hero.sub}</p>
          <div className="cta">
            <a className="btn btn-teal" href={`${home}#kontakt`}>{t.hero.ctaPrimary}</a>
            <a className="btn btn-ghost" href={`${home}#erp`}>{t.hero.ctaSecondary}</a>
          </div>
        </div>

        <div className="scene" aria-hidden="true">
          <div className="panel main">
            <div className="dots"><span /><span /><span /></div>
            <h4>{t.hero.panelTitle}</h4>
            <div className="bars">
              {bars.map((h, i) => (
                <span key={i} className={i >= 4 ? "hi" : undefined} style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <div className="flowrow">
              <b>{t.hero.flow[0]}</b><Icon name="next" /><b>{t.hero.flow[1]}</b><Icon name="next" /><b className="core">{t.hero.flow[2]}</b>
            </div>
          </div>
          <div className="chip a">
            <span className="ic"><Icon name="check" /></span>
            <span>{t.hero.chipA[0]}<small>{t.hero.chipA[1]}</small></span>
          </div>
          <div className="chip b">
            <span className="ic"><Icon name="flow" /></span>
            <span>{t.hero.chipB[0]}<small>{t.hero.chipB[1]}</small></span>
          </div>
        </div>
      </div>
    </section>
  );
}
