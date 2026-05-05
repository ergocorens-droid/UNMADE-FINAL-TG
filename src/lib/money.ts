import type { Currency } from "@/lib/regions";

/** Orientacyjny kurs: ile PLN za 1 jednostkę obcej waluty. */
const PLN_PER_FOREIGN: Record<Exclude<Currency, "PLN">, number> = {
  EUR: 4.35,
  USD: 3.85,
  GBP: 5.05,
};

export function convertPlnToCurrency(amountPln: number, currency: Currency): number {
  if (currency === "PLN") return amountPln;
  const rate = PLN_PER_FOREIGN[currency];
  return Math.round((amountPln / rate) * 100) / 100;
}

export function formatMoneyAmount(
  amountPln: number,
  currency: Currency,
  locale: string,
): string {
  const value = convertPlnToCurrency(amountPln, currency);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "PLN" ? 0 : 2,
    maximumFractionDigits: currency === "PLN" ? 0 : 2,
  }).format(value);
}
