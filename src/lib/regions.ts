/** Region helpers: locale + currency z kodu kraju (ISO 3166-1 alpha-2). */
export type Locale = "pl" | "en";
export type Currency = "PLN" | "EUR" | "USD" | "GBP";

const EU_EUR = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "NO",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "CH",
  "IS",
  "LI",
]);

/**
 * Na produkcji Vercel ustawia x-vercel-ip-country; Cloudflare — cf-ipcountry.
 * Brak nagłówka (localhost) → PL.
 */
export function resolveRegion(countryCode: string | undefined): {
  locale: Locale;
  currency: Currency;
  country: string;
} {
  const c = (countryCode ?? "PL").toUpperCase().slice(0, 2);
  if (c === "PL") {
    return { locale: "pl", currency: "PLN", country: c };
  }
  if (c === "GB" || c === "UK") {
    return { locale: "en", currency: "GBP", country: "GB" };
  }
  if (c === "US") {
    return { locale: "en", currency: "USD", country: c };
  }
  if (c === "CA" || c === "AU" || c === "NZ") {
    return { locale: "en", currency: "USD", country: c };
  }
  if (EU_EUR.has(c)) {
    return { locale: "en", currency: "EUR", country: c };
  }
  return { locale: "en", currency: "EUR", country: c || "PL" };
}
