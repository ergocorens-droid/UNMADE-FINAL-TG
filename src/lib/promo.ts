export const PROMO_CONFIG = {
  // Data końcowa promocji w UTC / offset. Format ISO — łatwa zmiana.
  endsAt: "2026-05-16T23:59:59+02:00",

  // Ceny wyłącznie do komunikatu w banerze (produkty w Shopify — osobno).
  oldPrice: 129,
  newPrice: 109,

  enabled: true,
} as const;

export function getDiscountPercent(): number {
  const { oldPrice, newPrice } = PROMO_CONFIG;
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

export function getPromoEndDate(): Date {
  return new Date(PROMO_CONFIG.endsAt);
}

export function isPromoActive(now: Date = new Date()): boolean {
  return PROMO_CONFIG.enabled && now < getPromoEndDate();
}
