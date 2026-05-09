export type CurrencyCode = "PLN" | "EUR" | "GBP" | "USD";

export type CountryCode = "PL" | "DE" | "GB" | "US";

export const CURRENCIES: Record<
  CurrencyCode,
  {
    code: CurrencyCode;
    country: CountryCode;
    label: string;
    symbol: string;
    flag: string;
    locale: string;
  }
> = {
  PLN: {
    code: "PLN",
    country: "PL",
    label: "PLN",
    symbol: "zł",
    flag: "🇵🇱",
    locale: "pl-PL",
  },
  EUR: {
    code: "EUR",
    country: "DE",
    label: "EUR",
    symbol: "€",
    flag: "🇪🇺",
    locale: "de-DE",
  },
  GBP: {
    code: "GBP",
    country: "GB",
    label: "GBP",
    symbol: "£",
    flag: "🇬🇧",
    locale: "en-GB",
  },
  USD: {
    code: "USD",
    country: "US",
    label: "USD",
    symbol: "$",
    flag: "🇺🇸",
    locale: "en-US",
  },
};

export const DEFAULT_CURRENCY: CurrencyCode = "PLN";

export const CURRENCY_COOKIE = "unmade_currency";

export function currencyToCountryCode(code: CurrencyCode): CountryCode {
  return CURRENCIES[code].country;
}
