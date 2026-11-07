import type { Dictionary } from "@/content/dictionary";
import type { Locale } from "@/content/i18n";

/** Jede Sektion bekommt Sprache und Wörterbuch. */
export type I18nProps = { locale: Locale; t: Dictionary };
