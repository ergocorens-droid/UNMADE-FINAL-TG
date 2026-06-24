import type { Money, Product } from "@/lib/shopify/types";

const TSHIRT_COMPARE_PRICE_PLN = 109;

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function productSearchText(product: Product): string {
  return normalize(
    `${product.title} ${product.handle} ${product.tags.join(" ")} ${product.collections
      .map((collection) => `${collection.handle} ${collection.title}`)
      .join(" ")}`,
  );
}

export function isTshirtProduct(product: Product): boolean {
  const text = productSearchText(product);

  return (
    text.includes("t-shirts") ||
    text.includes("t-shirt") ||
    text.includes("tshirt") ||
    text.includes("tee") ||
    text.includes("koszul")
  );
}

export function getTshirtDisplayComparePrice(
  product: Product,
  price: Money | null | undefined,
): Money | null {
  if (!price || price.currencyCode !== "PLN" || !isTshirtProduct(product)) {
    return null;
  }

  const currentPrice = Number.parseFloat(price.amount);
  if (!Number.isFinite(currentPrice) || currentPrice >= TSHIRT_COMPARE_PRICE_PLN) {
    return null;
  }

  return {
    amount: TSHIRT_COMPARE_PRICE_PLN.toFixed(2),
    currencyCode: price.currencyCode,
  };
}
