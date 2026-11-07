import { localePath, stripLocale, type Locale } from "@/content/i18n";
import type { NavItem } from "@/content/site";

/** Abschnitts-Links (#…) zeigen auf die Startseite der jeweiligen Sprache, Seiten-Links (/…) auf die Seite. */
export function navHref(item: NavItem, locale: Locale): string {
  return item.href.startsWith("#") ? `${localePath(locale, "/")}${item.href}` : localePath(locale, item.href);
}

export const sectionIds = (items: NavItem[]) => items.filter((n) => n.href.startsWith("#")).map((n) => n.href.slice(1));

/** Ist der Menüpunkt aktiv? `pathname` ist der öffentliche Pfad (mit Sprachpräfix). */
export function isActive(item: NavItem, pathname: string, section: string): boolean {
  const path = stripLocale(pathname);
  return item.href.startsWith("/") ? path === item.href : path === "/" && section === item.href.slice(1);
}
