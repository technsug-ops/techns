import type { NavItem } from "@/content/site";

/** Abschnitts-Links (#…) brauchen auf Unterseiten das Präfix „/“, Seiten-Links (/…) nie. */
export function navHref(item: NavItem, base: string): string {
  return item.href.startsWith("#") ? `${base}${item.href}` : item.href;
}

export const sectionIds = (items: NavItem[]) => items.filter((n) => n.href.startsWith("#")).map((n) => n.href.slice(1));
