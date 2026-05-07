/** Formatuje kwotę z Shopify Money (Storefront API) po polsku. */
export function formatPrice(money: {
  amount: string;
  currencyCode: string;
}): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: money.currencyCode,
  }).format(Number.parseFloat(money.amount));
}

/** Liczba produktów po polsku (21 produktów). */
export function formatProductCountPl(n: number): string {
  if (n === 1) return "1 produkt";
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} produkt`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${n} produkty`;
  }
  return `${n} produktów`;
}
