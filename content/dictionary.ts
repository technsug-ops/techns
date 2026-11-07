import type { AccentHeading, NavKey, ProjectGroupId, ProjectKind, ServiceId } from "./site";

/** Alle Texte der Website für eine Sprache. Jede Sprache muss jedes Feld füllen – sonst schlägt der Build fehl. */
export interface Dictionary {
  meta: { title: string; description: string; ogTitle: string };
  claim: string;
  nav: Record<NavKey, string>;
  common: {
    skip: string;
    contact: string;
    projectInquiry: string;
    contactPerson: string;
    location: string;
    toHome: string;
    toTop: string;
    language: string;
    sections: string;
    mainNav: string;
    breadcrumbs: string;
    start: string;
  };
  hero: {
    kicker: string;
    headline: AccentHeading;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    panelTitle: string;
    flow: [string, string, string];
    chipA: [string, string];
    chipB: [string, string];
  };
  stats: [string, string, string, string];
  statsLabel: string;
  principles: [string, string][];
  now: { label: string };
  about: { eyebrow: string; heading: AccentHeading; lede: string; body: string; cta: string };
  services: {
    eyebrow: string;
    heading: AccentHeading;
    lede: string;
    provenBy: string;
    allTech: string;
    items: Record<ServiceId, { title: string; text: string; points: string[] }>;
  };
  groups: Record<ProjectGroupId, { eyebrow: string; heading: AccentHeading; lede: string; deliverables: string[] }>;
  groupsCommon: { deliverablesLabel: string; empty: string };
  project: {
    kinds: Record<ProjectKind, string>;
    details: string;
    notPublic: string;
    technologies: string;
    liveView: string;
    liveOpenAria: string;
    openSite: string;
    similar: string;
    about: string;
    area: string;
    kind: string;
    metric: string;
    live: string;
    next: string;
    screenshotAlt: string;
    facts: string;
  };
  process: { eyebrow: string; heading: AccentHeading; lede: string; step: string; steps: { title: string; text: string }[] };
  analyses: { eyebrow: string; heading: AccentHeading; lede: string; request: string; items: { meta: string; title: string; summary: string }[] };
  founder: {
    eyebrow: string;
    heading: AccentHeading;
    role: string;
    paragraphs: string[];
    stations: { period: string; role: string; org: string }[];
    languages: { name: string; level: string }[];
    portrait: string;
    portraitAlt: string;
    more: string;
  };
  skills: { eyebrow: string; heading: AccentHeading; lede: string; groups: { title: string; items: string[] }[] };
  faq: { eyebrow: string; heading: AccentHeading; lede: string; items: { q: string; a: string }[] };
  contact: { eyebrow: string; heading: AccentHeading; lede: string; phone: string; email: string; appointment: string; appointmentText: string; address: string };
  footer: { navigation: string; products: string; company: string; imprint: string; privacy: string };
  team: { metaTitle: string; metaDescription: string; eyebrow: string; heading: AccentHeading; lede: string; joinTitle: string; joinText: string; joinCta: string };
  impressum: {
    title: string;
    provider: string;
    representedBy: string;
    managingDirector: string;
    contact: string;
    phone: string;
    email: string;
    register: string;
    court: string;
    registerNumber: string;
    vat: string;
    vatText: string;
    note: string;
  };
  privacy: { title: string; note: string };
  notFound: { title: string; text: string; cta: string };
}
