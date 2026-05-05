import type { Product, ProductCategory, CollectionSlug } from "@/data/products";
import { PRODUCTS } from "@/data/products";

export type SortKey = "newest" | "price-asc" | "price-desc" | "bestsellers";

export interface ShopFilters {
  category?: ProductCategory | "all";
  collection?: CollectionSlug | "all";
  availability?: "all" | "in_stock" | "sold_out";
  min?: number;
  max?: number;
  q?: string;
  sort?: SortKey;
}

const slugOrder = PRODUCTS.map((p) => p.slug);

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "bestsellers":
      return copy.sort((a, b) => {
        const ai = slugOrder.indexOf(a.slug);
        const bi = slugOrder.indexOf(b.slug);
        return ai - bi;
      });
    case "newest":
    default:
      return copy.sort((a, b) => {
        const ai = slugOrder.indexOf(a.slug);
        const bi = slugOrder.indexOf(b.slug);
        return bi - ai;
      });
  }
}

export function filterProducts(filters: ShopFilters): Product[] {
  let list = PRODUCTS;
  const cat = filters.category ?? "all";
  const coll = filters.collection ?? "all";
  const avail = filters.availability ?? "all";
  const min = filters.min;
  const max = filters.max;
  const q = filters.q?.trim().toLowerCase();

  if (cat !== "all") {
    list = list.filter((p) => p.category === cat);
  }
  if (coll !== "all") {
    list = list.filter((p) => p.collection === coll);
  }
  if (avail === "in_stock") {
    list = list.filter((p) => !p.soldOut);
  }
  if (avail === "sold_out") {
    list = list.filter((p) => p.soldOut);
  }
  if (typeof min === "number" && !Number.isNaN(min)) {
    list = list.filter((p) => p.price >= min);
  }
  if (typeof max === "number" && !Number.isNaN(max)) {
    list = list.filter((p) => p.price <= max);
  }
  if (q) {
    list = list.filter((p) => p.name.toLowerCase().includes(q));
  }

  return sortProducts(list, filters.sort ?? "newest");
}

export function getRelatedProducts(slug: string, take = 4): Product[] {
  const current = PRODUCTS.find((p) => p.slug === slug);
  if (!current) {
    return PRODUCTS.slice(0, take);
  }
  const same = PRODUCTS.filter(
    (p) => p.slug !== slug && p.collection === current.collection,
  );
  const rest = PRODUCTS.filter((p) => p.slug !== slug && !same.includes(p));
  return [...same, ...rest].slice(0, take);
}
