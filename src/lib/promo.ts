export const PROMO_CONFIG = {
  // Data koncowa promocji w polskiej strefie czasu.
  endsAt: "2026-06-21T17:10:00+02:00",
  code: "summer15",
  discountPercent: 15,
  enabled: true,
} as const;

export function getDiscountPercent(): number {
  return PROMO_CONFIG.discountPercent;
}

export function getPromoEndDate(): Date {
  return new Date(PROMO_CONFIG.endsAt);
}

export function isPromoActive(now: Date = new Date()): boolean {
  return PROMO_CONFIG.enabled && now < getPromoEndDate();
}
