/**
 * Alle Inhalte der Website an einer Stelle.
 * Texte hier ändern – die Komponenten lesen nur aus dieser Datei.
 * Platzhalter stehen in [eckigen Klammern] und müssen vor dem Livegang ersetzt werden.
 */

import type { IconName } from "@/components/Icons";

/** Überschrift mit kursiv gesetztem Akzentwort, z. B. „Was wir für *Sie* tun“. */
export type AccentHeading = { before: string; accent: string; after?: string };

/** `#…` = Abschnitt der Startseite, `/…` = eigene Seite. */
export type NavItem = { href: `#${string}` | `/${string}`; label: string };

export type Stat = { value: string; label: string };

export type Service = {
  id: string;
  icon: IconName;
  title: string;
  text: string;
  points: string[];
  proof: { label: string; href: `#${string}` };
  tone: "mint" | "lavender" | "peach" | "gray";
};

export type ProjectKind = "Eigenes Produkt" | "Kundenprojekt" | "Kundenprojekt · laufend" | "In Entwicklung";

export type CaseBlock =
  | { type: "text"; title: string; body: string }
  | { type: "list"; title: string; items: string[] }
  | { type: "flow"; title: string; steps: { label: string; highlight: boolean }[] };

/** Projekt, wie es die Website anzeigt. Die Daten kommen aus dem CMS (/admin), siehe lib/projects.ts. */
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

export type ProjectGroupId = "erp" | "websites";

/** Bereichs-Texte (Überschrift, Bausteine). Die Projekte selbst werden im CMS gepflegt. */
export type ProjectGroup = {
  id: ProjectGroupId;
  eyebrow: string;
  heading: AccentHeading;
  lede: string;
  icon: IconName;
  deliverables: string[];
  tone: "mint" | "gray";
  columns: 2 | 3;
};

export type Step = { icon: IconName; title: string; text: string };
export type Analysis = { meta: string; title: string; summary: string };
export type Station = { period: string; role: string; org: string; href?: string };
export type FaqItem = { q: string; a: string };

/* ------------------------------------------------------------------ */

export const company = {
  name: "TechNS",
  legalName: "TechNS UG (haftungsbeschränkt)",
  claim: "Prozesse verstehen. Systeme bauen. Wachstum messen.",
  street: "Ludwig-Erhard-Straße 16a",
  city: "61440 Oberursel (Taunus)",
  managingDirector: "Halil Yapralı",
  court: "Amtsgericht Bad Homburg",
  register: "HRB 16236",
  vatId: "DE312006599",
  phone: { display: "+49 6171 27786 92", href: "tel:+4961712778692" },
  email: "[E-Mail-Adresse]",
  bookingUrl: "#kontakt",
} as const;

export const nav: NavItem[] = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#erp", label: "ERP-Systeme" },
  { href: "#websites", label: "Websites" },
  { href: "#vorgehen", label: "Vorgehen" },
  { href: "#analysen", label: "Analysen" },
  { href: "#gruender", label: "Über uns" },
  { href: "/team", label: "Team" },
  { href: "#kenntnisse", label: "Kenntnisse" },
  { href: "#faq", label: "FAQ" },
];

export const hero = {
  kicker: "TechNS UG · Oberursel bei Frankfurt",
  headline: { before: "Systeme, mit denen Unternehmen", accent: "wachsen", after: "." },
  sub: "Wir digitalisieren die Abläufe von Unternehmen und bauen die Software, die sie trägt – von der Prozessanalyse über Marktplatz- und ERP-Integration bis zur eigenen Datenplattform. Jedes Vorhaben beginnt bei uns mit einer Messung, nicht mit einer Annahme.",
} satisfies { kicker: string; headline: AccentHeading; sub: string };

export const stats: Stat[] = [
  { value: "25.103", label: "Studiengänge auf unserer Datenplattform ApplyToGerman" },
  { value: "5", label: "offizielle Datenquellen täglich zusammengeführt" },
  { value: "3", label: "Marktplätze per API an Bezirga angebunden" },
  { value: "18", label: "Sprachen im Hausaufgaben-Kompass" },
];

export const principles: { icon: IconName; label: [string, string] }[] = [
  { icon: "measure", label: ["Erst messen,", "dann bauen"] },
  { icon: "api", label: ["Integration statt", "Insellösungen"] },
  { icon: "lock", label: ["Datenschutz", "ab Entwurf"] },
  { icon: "globe", label: ["Mehrsprachige", "Plattformen"] },
  { icon: "rocket", label: ["Eigene Produkte", "im Live-Betrieb"] },
];

export const about = {
  heading: { before: "Software, die aus dem", accent: "echten Ablauf", after: "entsteht." },
  lede: "TechNS ist ein Softwareunternehmen aus Oberursel bei Frankfurt. Wir verbinden Prozessverständnis mit Entwicklung: Bevor wir eine Zeile Code schreiben, verstehen wir, wie Ihr Unternehmen tatsächlich arbeitet.",
  body: "Wir bauen nicht nur für Kunden, sondern betreiben eigene Produkte – eine Hochschul-Datenplattform, ein ERP für Marktplatzhändler und eine Familien-App. Dadurch wissen wir, was ein System im Alltag aushalten muss.",
} satisfies { heading: AccentHeading; lede: string; body: string };

export const services: Service[] = [
  {
    id: "prozesse",
    icon: "flow",
    title: "Prozessanalyse & Digitalisierung",
    text: "Wir erfassen, wie Ihr Unternehmen tatsächlich arbeitet – als Grundlage für Automatisierung.",
    points: ["Prozessinventar nach APQC PCF", "Engpass- und Lückenmessung", "SOPs und Verantwortlichkeiten", "Fahrplan für KI-gestützte Abläufe"],
    proof: { label: "HafenX", href: "#projekt-hafenx" },
    tone: "mint",
  },
  {
    id: "software",
    icon: "code",
    title: "Software- & Plattformentwicklung",
    text: "Portale und Webplattformen, die Ihr Geschäftsmodell abbilden – von der Idee bis zum Betrieb.",
    points: ["Portale mit Rollen und Rechten", "Partner- und Provisionsmodelle", "Datenschutz ab Entwurf (DSGVO)", "Betrieb und Weiterentwicklung"],
    proof: { label: "MentörDE, Kompass", href: "#projekt-mentorde" },
    tone: "lavender",
  },
  {
    id: "integration",
    icon: "sync",
    title: "Marktplatz- & ERP-Integration",
    text: "Bestellungen, Bestand und Retouren fließen automatisch – mit dem echten Nettogewinn je Verkauf.",
    points: ["Anbindung von Marktplatz-APIs", "FIFO-Bewertung mit Partien", "Abgleich von Abrechnungen", "Automatische Konsistenzprüfungen"],
    proof: { label: "Bezirga", href: "#projekt-bezirga" },
    tone: "peach",
  },
  {
    id: "daten",
    icon: "data",
    title: "Datenplattformen & Sichtbarkeit",
    text: "Verstreute Daten zusammenführen und so aufbereiten, dass Menschen und Suchmaschinen sie finden.",
    points: ["Datenpipelines aus offenen Quellen", "Entitätsabgleich, tägliche Updates", "Technisches SEO, Mehrsprachigkeit", "Öffentliche APIs und Werkzeuge"],
    proof: { label: "ApplyToGerman", href: "#projekt-applytogerman" },
    tone: "gray",
  },
];

export type SkillGroup = { icon: IconName; title: string; items: string[] };

export const skills: SkillGroup[] = [
  { icon: "flow", title: "Prozesse & Organisation", items: ["APQC PCF", "Prozessinventar", "SOP-Design", "Anforderungsanalyse"] },
  { icon: "code", title: "Entwicklung", items: ["Next.js", "TypeScript", "React", "Prisma", "MySQL", "Laravel", "PHP", "Vercel"] },
  { icon: "sync", title: "E-Commerce & Integration", items: ["Marktplatz-APIs", "PlentyONE", "Shopify", "FIFO & Partien"] },
  { icon: "measure", title: "Wachstum & Sichtbarkeit", items: ["Technisches SEO", "Backlink-Strategie", "Newsletter", "Partnerprogramme", "DSGVO"] },
];

export const projectGroups: ProjectGroup[] = [
  {
    id: "erp",
    eyebrow: "ERP & Business-Software",
    heading: { before: "Systeme, die Ihr", accent: "Geschäft", after: "steuern." },
    lede: "Bestand, Bestellungen, Abrechnung, Rollen und Prozesse – in einem System, das zu Ihrem Ablauf passt, statt umgekehrt.",
    icon: "sync",
    deliverables: ["Bestand & Bewertung", "Marktplatz- & Shop-Anbindung", "Abrechnung & Nettogewinn", "Portale mit Rollen und Rechten", "Prozessinventar & SOPs", "Konsistenzprüfungen"],
    tone: "mint",
    columns: 2,
  },
  {
    id: "websites",
    eyebrow: "Websites & Web-Plattformen",
    heading: { before: "Auftritte, die", accent: "gefunden", after: "werden." },
    lede: "Von der Unternehmenswebsite bis zur datengetriebenen Plattform: schnell, mehrsprachig, DSGVO-konform und für Suchmaschinen gebaut.",
    icon: "globe",
    deliverables: ["Unternehmenswebsites", "Datenplattformen", "Web-Apps", "Mehrsprachigkeit", "Technisches SEO", "DSGVO & Impressum"],
    tone: "gray",
    columns: 3,
  },
];

export const process = {
  heading: { before: "Erst", accent: "messen", after: ", dann bauen." },
  lede: "Drei Schritte, die jedes Projekt bei uns durchläuft – vom Erstgespräch bis zum laufenden System.",
  steps: [
    { icon: "measure", title: "Messen", text: "Jedes Vorhaben beginnt mit einer Bestandsaufnahme. Wie groß ist die Lücke wirklich – in Stück, in Euro, in Stunden?" },
    { icon: "decide", title: "Entscheiden", text: "Die Messung entscheidet die Reihenfolge, nicht die Idee. Was den größten Geschäftswert hat, kommt zuerst." },
    { icon: "anchor", title: "Verankern", text: "Eine Regel ist erst geliefert, wenn ein laufender Mechanismus sie prüft. Sonst bleibt sie ein Vorsatz." },
  ] satisfies Step[],
};

export const analyses: Analysis[] = [
  { meta: "[Branche] · [Jahr]", title: "[Titel der Analyse 1]", summary: "[Ausgangslage in einem Satz] → [zentraler Befund in einem Satz]" },
  { meta: "[Branche] · [Jahr]", title: "[Titel der Analyse 2]", summary: "[Ausgangslage in einem Satz] → [zentraler Befund in einem Satz]" },
];

export const founder = {
  name: "Halil Yapralı",
  role: "Geschäftsführer, TechNS UG",
  /** Porträt unter /public/images ablegen, z. B. "/images/halil-yaprali.webp". */
  portrait: undefined as string | undefined,
  heading: { before: "Ökonom, der", accent: "Systeme", after: "baut." },
  paragraphs: [
    "Ich habe Volkswirtschaft studiert (Master) und in der Organisationsführung gemeinnütziger Einrichtungen und in der Forschung begonnen. Dort habe ich gelernt, wie Organisationen tatsächlich funktionieren – oft ganz anders, als es auf dem Papier steht.",
    "Als Gründer kenne ich die Wachstumsschmerzen. Als Prozessmanager weiß ich, wie man sie behebt.",
  ],
  stations: [
    { period: "[20XX] – heute", role: "Geschäftsführer", org: "TechNS UG, Oberursel" },
    { period: "[20XX] – heute", role: "Prozessmanager & Digitalisierung", org: "HafenX, Renningen" },
    { period: "[20XX] – [20XX]", role: "Gründer", org: "euroTech Study – IT-Weiterbildung", href: "https://eurotechstudy.com" },
  ] satisfies Station[],
  languages: [
    { name: "Deutsch", level: "[Niveau, z. B. C1]" },
    { name: "Englisch", level: "[Niveau, z. B. C1]" },
    { name: "Türkisch", level: "Muttersprache" },
  ],
};

export const faq: FaqItem[] = [
  { q: "Wie läuft ein Erstgespräch ab?", a: "In rund 30 Minuten klären wir, wo es in Ihren Abläufen hakt und wie groß die Lücke ist. Danach wissen Sie, ob und wie wir helfen können – unverbindlich." },
  { q: "Arbeiten Sie auch mit unseren bestehenden Systemen?", a: "Ja. Wir binden vorhandene Systeme über ihre Schnittstellen an, statt sie zu ersetzen – etwa Shopsysteme, Marktplätze oder Ihr ERP." },
  { q: "Müssen wir mit einem großen Projekt starten?", a: "Nein. Wir beginnen mit einer Messung und setzen dann in Etappen um. Jede Etappe liefert für sich einen messbaren Nutzen." },
  { q: "Wie gehen Sie mit unseren Daten um?", a: "Datenschutz planen wir von Anfang an mit ein – nach DSGVO und mit Hosting in Deutschland, wo immer das möglich ist." },
];

