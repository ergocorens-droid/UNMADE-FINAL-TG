import type {
  ProductCategory,
  CollectionSlug,
} from "@/data/products";
import type { ShopFilters, SortKey } from "@/lib/filterProducts";

export function buildShopQuery(
  base: Record<string, string | undefined>,
): string {
  const p = new URLSearchParams();
  Object.entries(base).forEach(([k, v]) => {
    if (v !== undefined && v !== "" && v !== "all") p.set(k, v);
  });
  const s = p.toString();
  return s ? `?${s}` : "";
}

export function parseShopSearchParams(
  raw: Record<string, string | string[] | undefined>,
): ShopFilters {
  const get = (k: string) => {
    const v = raw[k];
    return Array.isArray(v) ? v[0] : v;
  };

  const categoryRaw = get("category");
  const category =
    categoryRaw === "koszulki" ||
    categoryRaw === "bluzy" ||
    categoryRaw === "longsleeve"
      ? (categoryRaw as ProductCategory)
      : "all";

  const collectionRaw = get("collection");
  const collection =
    collectionRaw === "porsche" ||
    collectionRaw === "jdm" ||
    collectionRaw === "drift"
      ? (collectionRaw as CollectionSlug)
      : "all";

  const availabilityRaw = get("availability");
  let availability: ShopFilters["availability"] = "all";
  if (availabilityRaw === "in_stock") availability = "in_stock";
  else if (availabilityRaw === "sold_out") availability = "sold_out";

  const sortRaw = get("sort");
  let sort: SortKey = "newest";
  if (
    sortRaw === "price-asc" ||
    sortRaw === "price-desc" ||
    sortRaw === "bestsellers" ||
    sortRaw === "newest"
  ) {
    sort = sortRaw;
  }

  const minStr = get("min");
  const maxStr = get("max");
  const min = minStr !== undefined ? Number(minStr) : undefined;
  const max = maxStr !== undefined ? Number(maxStr) : undefined;
  const q = get("q") ?? "";

  return {
    category,
    collection,
    availability,
    sort,
    min: Number.isFinite(min) ? min : undefined,
    max: Number.isFinite(max) ? max : undefined,
    q,
  };
}
