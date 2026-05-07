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
