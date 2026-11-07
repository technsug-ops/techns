import type { Dictionary } from "../dictionary";
import type { Locale } from "../i18n";
import { de } from "./de";
import { en } from "./en";
import { tr } from "./tr";

const dictionaries: Record<Locale, Dictionary> = { de, en, tr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
