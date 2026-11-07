import { localePath } from "@/content/i18n";
import { Accent } from "./Accent";
import type { I18nProps } from "./types";

export function About({ locale, t }: I18nProps) {
  const about = t.about;
  return (
    <section id="ueber">
      <div className="wrap about">
        <div className="about-art" aria-hidden="true">
          <div className="blob" />
          <svg viewBox="0 0 400 400">
            <g fill="none" strokeLinecap="round" strokeLinejoin="round" stroke="#1E8378" strokeWidth="2.5" strokeDasharray="6 8">
              <path d="M92 156c20 40 60 44 108 44s88-4 108-44" />
              <path d="M200 234v58" />
            </g>
            <rect x="44" y="84" width="96" height="72" rx="16" fill="#fff" />
            <rect x="62" y="104" width="40" height="8" rx="4" fill="#4DC3B5" />
            <rect x="62" y="120" width="60" height="8" rx="4" fill="#EDEDED" />
            <rect x="62" y="134" width="48" height="8" rx="4" fill="#EDEDED" />
            <rect x="260" y="84" width="96" height="72" rx="16" fill="#fff" />
            <circle cx="286" cy="120" r="12" fill="#FCD496" />
            <rect x="306" y="110" width="34" height="8" rx="4" fill="#EDEDED" />
            <rect x="306" y="124" width="24" height="8" rx="4" fill="#EDEDED" />
            <circle cx="200" cy="200" r="34" fill="#0F2E2B" />
            <path d="M186 192h28M200 192v20" stroke="#4DC3B5" strokeWidth="5" strokeLinecap="round" />
            <circle cx="214" cy="212" r="4" fill="#F8A11C" />
            <rect x="132" y="292" width="136" height="64" rx="16" fill="#fff" />
            <path d="M152 336l18-16 16 10 22-20 18 8" fill="none" stroke="#4DC3B5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M318 40l5 12 12 5-12 5-5 12-5-12-12-5 12-5z" fill="#F8A11C" />
            <circle cx="64" cy="300" r="10" fill="#8682BE" />
          </svg>
        </div>
        <div>
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 className="h2"><Accent {...about.heading} /></h2>
          <p className="lede" style={{ marginBottom: 20 }}>{about.lede}</p>
          <p>{about.body}</p>
          <a className="btn btn-ink" href={`${localePath(locale, "/")}#gruender`} style={{ marginTop: 12 }}>{about.cta}</a>
        </div>
      </div>
    </section>
  );
}
