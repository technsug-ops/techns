import { Footer } from "./Footer";
import { Header, type ChromeLabels } from "./Header";
import { Sidebar } from "./Sidebar";
import type { I18nProps } from "./types";

/** Gemeinsamer Rahmen: Sidebar (Desktop) bzw. Kopfleiste (Mobil), Inhalt, Footer. */
export function Shell({ children, locale, t }: I18nProps & { children: React.ReactNode }) {
  const labels: ChromeLabels = {
    nav: t.nav,
    contact: t.common.contact,
    projectInquiry: t.common.projectInquiry,
    contactPerson: t.common.contactPerson,
    location: t.common.location,
    toTop: t.common.toTop,
    language: t.common.language,
    sections: t.common.sections,
    mainNav: t.common.mainNav,
    claim: t.claim,
  };
  return (
    <div className="shell">
      <Sidebar locale={locale} labels={labels} />
      <div className="content">
        <Header locale={locale} labels={labels} />
        <main id="inhalt">{children}</main>
        <Footer locale={locale} t={t} />
      </div>
    </div>
  );
}
