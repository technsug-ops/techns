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
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
