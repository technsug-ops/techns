import { ImageResponse } from "next/og";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales } from "@/content/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TechNS UG";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OgImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : "de");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0F2E2B",
          color: "#F4F1EA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
          TechNS<span style={{ color: "#4DC3B5" }}>.</span>
          <span style={{ marginLeft: 20, fontSize: 28, fontWeight: 400, opacity: 0.7, alignSelf: "center" }}>Technology Next Station</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>{`${t.hero.headline.before} ${t.hero.headline.accent} ${t.hero.headline.after}`}</div>
          <div style={{ fontSize: 30, opacity: 0.8 }}>{t.claim}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, opacity: 0.6 }}>techns.de · Oberursel / Frankfurt am Main</div>
      </div>
    ),
    size,
  );
}
