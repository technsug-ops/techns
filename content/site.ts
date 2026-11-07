/**
 * Sprachunabhängige Struktur der Website (Reihenfolge, Icons, Links, Firmendaten).
 * Alle Texte stehen in content/dictionaries/{de,en,tr}.ts.
 * Projekte und Team werden im CMS (/admin) gepflegt.
 */

import type { IconName } from "@/components/Icons";

/** Überschrift mit kursiv gesetztem Akzentwort, z. B. „Was wir für *Sie* tun“. */
export type AccentHeading = { before: string; accent: string; after?: string };

export type NavKey = "leistungen" | "erp" | "websites" | "vorgehen" | "analysen" | "gruender" | "team" | "kenntnisse" | "faq";
/** `#…` = Abschnitt der Startseite, `/…` = eigene Seite. */
export type NavItem = { key: NavKey; href: `#${string}` | `/${string}` };

export type ProjectKind = "Eigenes Produkt" | "Kundenprojekt" | "Kundenprojekt · laufend" | "In Entwicklung";
export type ProjectGroupId = "erp" | "websites";
export type ServiceId = "prozesse" | "software" | "integration" | "daten";

export type CaseBlock =
  | { type: "text"; title: string; body: string }
  | { type: "list"; title: string; items: string[] }
  | { type: "flow"; title: string; steps: { label: string; highlight: boolean }[] };

/** Projekt, wie es die Website anzeigt (bereits in der gewählten Sprache). Quelle: CMS, siehe lib/projects.ts. */
export type Project = {
  slug: string;
  number: string;
  group: ProjectGroupId;
  name: string;
  kind: ProjectKind;
  meta: string;
  description: string;
  metric?: string;
  /** Öffentliche Adresse – fehlt bei Projekten ohne Live-Seite. */
  url?: string;
  displayDomain?: string;
  screenshot?: { url: string; alt: string; width?: number; height?: number };
  stack: string[];
  caseStudy: CaseBlock[];
};

/* ------------------------------------------------------------------ */

export const company = {
  name: "TechNS",
  legalName: "TechNS UG (haftungsbeschränkt)",
  street: "Ludwig-Erhard-Straße 16a",
  postalCode: "61440",
  city: "Oberursel (Taunus)",
  managingDirector: "Halil Yapralı",
  court: "Amtsgericht Bad Homburg",
  register: "HRB 16236",
  vatId: "DE312006599",
  phone: { display: "+49 6171 27786 92", href: "tel:+4961712778692" },
  email: "[E-Mail-Adresse]",
  bookingUrl: "#kontakt",
  siteUrl: "https://techns.de",
} as const;

export const nav: NavItem[] = [
  { key: "leistungen", href: "#leistungen" },
  { key: "erp", href: "#erp" },
  { key: "websites", href: "#websites" },
  { key: "vorgehen", href: "#vorgehen" },
  { key: "analysen", href: "#analysen" },
  { key: "gruender", href: "#gruender" },
  { key: "team", href: "/team" },
  { key: "kenntnisse", href: "#kenntnisse" },
  { key: "faq", href: "#faq" },
];

export const statValues = ["25.103", "5", "3", "18"] as const;

export const principleIcons: IconName[] = ["measure", "api", "lock", "globe", "rocket"];

export const services: { id: ServiceId; icon: IconName; tone: "mint" | "lavender" | "peach" | "gray"; proof: { label: string; href: `#${string}` } }[] = [
  { id: "prozesse", icon: "flow", tone: "mint", proof: { label: "HafenX", href: "#projekt-hafenx" } },
  { id: "software", icon: "code", tone: "lavender", proof: { label: "MentörDE, Kompass", href: "#projekt-mentorde" } },
  { id: "integration", icon: "sync", tone: "peach", proof: { label: "Bezirga", href: "#projekt-bezirga" } },
  { id: "daten", icon: "data", tone: "gray", proof: { label: "ApplyToGerman", href: "#projekt-applytogerman" } },
];

export const projectGroups: { id: ProjectGroupId; icon: IconName; tone: "mint" | "gray"; columns: 2 | 3 }[] = [
  { id: "erp", icon: "sync", tone: "mint", columns: 2 },
  { id: "websites", icon: "globe", tone: "gray", columns: 3 },
];

export const processIcons: IconName[] = ["measure", "decide", "anchor"];

export const skillIcons: IconName[] = ["flow", "code", "sync", "measure"];

export const founderLinks = {
  /** Porträt (public/images/team) – erscheint im Gründer-Abschnitt, in der Seitenleiste und als Ersatz auf der Team-Seite. */
  portrait: "/images/team/halil.webp" as string | undefined,
  /** Index der Station mit Link (euroTech Study). */
  stationLinks: { 2: "https://eurotechstudy.com" } as Record<number, string>,
};
