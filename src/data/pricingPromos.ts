/** Progi rabatu od liczby sztuk (wszystkie pozycje w koszyku — przy jednym SKU to suma koszulek). */
export const BULK_QUANTITY_TIERS = [
  { minQty: 2, percentOff: 8 },
  { minQty: 3, percentOff: 15 },
] as const;

export function bulkDiscountPercent(totalPieces: number): number {
  let best = 0;
  for (const t of BULK_QUANTITY_TIERS) {
    if (totalPieces >= t.minQty) best = t.percentOff;
  }
  return best;
}

/** Suma za `pieces` sztuk po rabacie w PLN (zaokrąglona). */
export function bulkLineTotalPln(unitPricePln: number, pieces: number): number {
  const pct = bulkDiscountPercent(pieces);
  return Math.round((unitPricePln * pieces * (100 - pct)) / 100);
}
