import pl from "./dictionaries/pl.json";
import en from "./dictionaries/en.json";
import type { CurrencyCode } from "@/lib/shopify/markets";

export type Locale = "pl" | "en";
export const DEFAULT_LOCALE: Locale = "pl";

export const dictionaries = { pl, en } as const;
export type Dictionary = typeof pl;

export function localeFromCurrency(currency: CurrencyCode): Locale {
  return currency === "PLN" ? "pl" : "en";
}
