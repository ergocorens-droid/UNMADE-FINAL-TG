import { getServerCurrency } from "@/lib/shopify/get-currency";
import { localeFromCurrency, type Locale } from "./config";
import { translate, type TranslationKey } from "./translate";

export async function getServerLocale(): Promise<Locale> {
  const currency = await getServerCurrency();
  return localeFromCurrency(currency);
}

export async function getServerT() {
  const locale = await getServerLocale();
  return (key: TranslationKey, vars?: Record<string, string | number>) =>
    translate(locale, key, vars);
}
