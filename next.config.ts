import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    minimumCacheTTL: 600, // Bildoptimierung folgt sonst dem Cache-Control der Quelle (Screenshots: 7 Tage, Platzhalter: 10 Min.)
    localPatterns: [{ pathname: "/api/media/file/**" }, { pathname: "/images/**" }, { pathname: "/screenshots/**" }],
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };
    return webpackConfig;
  },
  turbopack: { root: path.resolve(dirname) },
  experimental: { globalNotFound: true },

  // Adressen der früheren techns.de-Website (PHP, /en/…) dauerhaft auf die neuen Seiten umleiten,
  // damit bestehende Verlinkungen und Suchmaschinen-Signale erhalten bleiben.
  async redirects() {
    const old: [string, string][] = [
      ["index", ""],
      ["home", ""],
      ["index.php", ""],
      ["home.php", ""],
      ["about-us", "/team"],
      ["about", "/team"],
      ["services", "#leistungen"],
      ["devops", "#leistungen"],
      ["awareness-and-training", "#leistungen"],
      ["contact", "#kontakt"],
    ];
    const rules: { source: string; destination: string; statusCode: 301 }[] = [];
    for (const [from, to] of old) {
      const target = (prefix: string) => (to.startsWith("#") ? `${prefix || "/"}${to}` : `${prefix}${to}` || "/");
      rules.push({ source: `/:lang(en|tr)/${from}`, destination: target("/:lang"), statusCode: 301 });
      rules.push({ source: `/de/${from}`, destination: target(""), statusCode: 301 });
      rules.push({ source: `/${from}`, destination: target(""), statusCode: 301 });
    }
    rules.push({ source: "/index.html", destination: "/", statusCode: 301 });
    // Ausgeblendete Projekte: Detailseiten auf die Projektübersicht umleiten.
    for (const slug of ["mentorde", "kompass"]) {
      rules.push({ source: `/:lang(en|tr)/projekte/${slug}`, destination: "/:lang#erp", statusCode: 301 });
      rules.push({ source: `/projekte/${slug}`, destination: "/#erp", statusCode: 301 });
    }
    return rules;
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
