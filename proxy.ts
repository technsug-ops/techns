import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/content/i18n";

/**
 * Sprachrouting: Deutsch ohne Präfix („/team“ → intern „/de/team“), Englisch und Türkisch mit „/en“, „/tr“.
 * „/de/…“ wird auf die Adresse ohne Präfix umgeleitet, damit jede Seite genau eine URL hat.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const seg = pathname.split("/")[1];

  // Vorschaubilder (opengraph-image) liegen technisch unter /de/… – nicht umleiten.
  if (seg === defaultLocale && !pathname.startsWith(`/${defaultLocale}/opengraph-image`)) {
    const rest = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(new URL(rest + search, request.url), 308);
  }
  // not-found.tsx erhält keine params – die Sprache geht als Header mit.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", isLocale(seg) ? seg : defaultLocale);
  if (isLocale(seg)) return NextResponse.next({ request: { headers: requestHeaders } });

  return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname === "/" ? "" : pathname}${search}`, request.url), {
    request: { headers: requestHeaders },
  });
}

export const config = {
  // Verwaltung, API, Next-Interna und Dateien (alles mit Punkt) bleiben unberührt.
  matcher: ["/((?!admin|api|_next|screenshots|.*\\..*).*)"],
};
