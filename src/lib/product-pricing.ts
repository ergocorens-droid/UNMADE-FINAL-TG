import type { Product } from "@/lib/shopify/types";

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
