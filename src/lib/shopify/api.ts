import { shopifyFetch } from "./client";
import { SIDEBAR_COLLECTION_HANDLES } from "./collection-labels";
import {
  COLLECTIONS_QUERY,
  COLLECTION_BY_HANDLE_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
} from "./queries";
import type {
  Collection,
  Product,
} from "./types";
import {
  mapImage,
  mapProductNode,
  type GQLProductNode,
} from "./product-map";

/** Tyłko dla komponentów serwerowych — dynamiczny import żeby nie pociągać `next/headers` do bundla klienta. */
async function resolveServerCountry(opt?: string): Promise<string> {
  if (opt) return opt;
  const { getServerCountry } = await import("./get-currency");
  return getServerCountry();
}

type GQLImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

type GQLCollectionNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: GQLImage | null;
  products?: { edges: Array<{ node: GQLProductNode }> };
};

// --- API serwerowe ---

export type ProductSortInput = {
  sortKey: string;
  reverse: boolean;
};

export function shopSortFromParam(sort: string | undefined): ProductSortInput {
  switch (sort) {
    case "cena-rosnaco":
      return { sortKey: "PRICE", reverse: false };
    case "cena-malejaco":
      return { sortKey: "PRICE", reverse: true };
    case "popularne":
      return { sortKey: "BEST_SELLING", reverse: false };
    case "najnowsze":
    default:
      return { sortKey: "CREATED_AT", reverse: true };
  }
}

export function collectionSortFromParam(sort: string | undefined): {
  sortKey: string;
  reverse: boolean;
} {
  switch (sort) {
    case "cena-rosnaco":
      return { sortKey: "PRICE", reverse: false };
    case "cena-malejaco":
      return { sortKey: "PRICE", reverse: true };
    case "popularne":
      return { sortKey: "BEST_SELLING", reverse: false };
    case "najnowsze":
    default:
      return { sortKey: "CREATED", reverse: true };
  }
}

/** Sortuje listę produktów po wyborze użytkownika (np. po przecięciu kolekcji). */
function seededRandom(seed: number): () => number {
  let state = seed || 1;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function hourlyShuffleProducts(products: Product[]): Product[] {
  const currentHourSeed = Math.floor(Date.now() / 3_600_000);
  const random = seededRandom(currentHourSeed);
  const shuffled = [...products];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function sortProductsInMemory(
  products: Product[],
  sort: string | undefined,
): Product[] {
  if (sort === "losowo") return hourlyShuffleProducts(products);

  const { sortKey, reverse } = shopSortFromParam(sort);
  const arr = [...products];
  arr.sort((a, b) => {
    if (sortKey === "PRICE") {
      const pa = parseFloat(a.priceRange.minVariantPrice?.amount ?? "");
      const pb = parseFloat(b.priceRange.minVariantPrice?.amount ?? "");
      const aBad = !Number.isFinite(pa);
      const bBad = !Number.isFinite(pb);
      if (aBad && bBad) return 0;
      if (aBad) return 1;
      if (bBad) return -1;
      const cmp = pa - pb;
      return reverse ? -cmp : cmp;
    }
    if (sortKey === "BEST_SELLING") {
      return 0;
    }
    return reverse ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id);
  });
  return arr;
}

function productSearchText(product: Product): string {
  return `${product.title} ${product.handle} ${product.tags.join(" ")} ${product.collections
    .map((collection) => `${collection.handle} ${collection.title}`)
    .join(" ")}`.toLowerCase();
}

export function productTypeDisplayRank(product: Product): number {
  const text = productSearchText(product);
  if (
    text.includes("t-shirts") ||
    text.includes("t-shirt") ||
    text.includes("tshirt") ||
    text.includes("tee") ||
    text.includes("koszul")
  ) {
    return 0;
  }
  if (
    text.includes("bluzy") ||
    text.includes("bluza") ||
    text.includes("hoodie") ||
    text.includes("hoodies")
  ) {
    return 100;
  }
  return 50;
}

export function isTshirtProduct(product: Product): boolean {
  return productTypeDisplayRank(product) === 0;
}

function needMoneyDisplayRank(product: Product): number {
  const text = productSearchText(product);
  if (!text.includes("need money")) return 1000;

  const colorRank = text.includes("black") ? 0 : text.includes("white") ? 100 : 200;
  const cars = ["ferrari", "bmw", "lambo", "mclaren", "porsche"];
  const carRank = cars.findIndex((car) => text.includes(car));

  return colorRank + (carRank === -1 ? 50 : carRank);
}

function capDisplayRank(product: Product): number {
  const text = productSearchText(product);
  const order = [
    ["hot girl", "hot-girl"],
    ["love me", "love-me"],
    ["heaven", "heaven-sent"],
    ["star girl", "star-girl"],
    ["kisses"],
    ["god bless scammers", "god-bless-scammers"],
    ["angel"],
    ["loveyourself", "love yourself"],
  ];

  const rank = order.findIndex((needles) =>
    needles.some((needle) => text.includes(needle)),
  );

  return rank === -1 ? 1000 : rank;
}

function sortShopDisplayProducts(
  products: Product[],
  sort: string | undefined,
  opts?: { kolekcja?: string; typ?: string },
): Product[] {
  if (sort === "losowo") return hourlyShuffleProducts(products);

  if (sort && sort !== "najnowsze") return products;

  if (opts?.typ === "baseball-cap") {
    return [...products].sort((a, b) => {
      const rankDiff = capDisplayRank(a) - capDisplayRank(b);
      if (rankDiff !== 0) return rankDiff;
      return 0;
    });
  }

  if (opts?.kolekcja === "cytaty") {
    return [...products].sort((a, b) => {
      const rankDiff = productTypeDisplayRank(a) - productTypeDisplayRank(b);
      if (rankDiff !== 0) return rankDiff;
      return 0;
    });
  }

  return [...products].sort((a, b) => {
    const rankDiff = needMoneyDisplayRank(a) - needMoneyDisplayRank(b);
    if (rankDiff !== 0) return rankDiff;
    return 0;
  });
}

/**
 * Liczniki produktów dla sidebaru (do 250 / kolekcja).
 */
export async function getSidebarCollectionCounts(): Promise<
  Record<string, number>
> {
  const entries = await Promise.all(
    SIDEBAR_COLLECTION_HANDLES.map(async (handle) => {
      const col = await getCollectionByHandle(handle, 250);
      return [handle, col?.products.length ?? 0] as const;
    }),
  );
  return Object.fromEntries(entries);
}

const SHOP_COLLECTION_FETCH = 250;

export async function getShopPageProducts(opts: {
  kolor?: string;
  typ?: string;
  kolekcja?: string;
  sort?: string;
  q?: string;
}): Promise<Product[]> {
  const { sortKey, reverse } = shopSortFromParam(opts.sort);
  const pools: Product[][] = [];

  if (opts.kolor) {
    const c = await getCollectionByHandle(opts.kolor, SHOP_COLLECTION_FETCH, opts.sort);
    if (c?.products.length) pools.push(c.products);
    else return [];
  }
  if (opts.typ) {
    const c = await getCollectionByHandle(opts.typ, SHOP_COLLECTION_FETCH, opts.sort);
    if (c?.products.length) pools.push(c.products);
    else return [];
  }
  if (opts.kolekcja) {
    const c = await getCollectionByHandle(opts.kolekcja, SHOP_COLLECTION_FETCH, opts.sort);
    if (c?.products.length) pools.push(c.products);
    else return [];
  }

  if (pools.length === 0) {
    const products = await getProducts({
      first: 48,
      sortKey,
      reverse,
      query: opts.q,
      cache: "no-store",
    });
    return sortShopDisplayProducts(products, opts.sort, opts);
  }

  if (pools.length === 1) {
    return sortShopDisplayProducts(sortProductsInMemory(pools[0], opts.sort), opts.sort, opts);
  }

  const [firstPool, ...restPools] = pools;
  const intersection = restPools.reduce((current, pool) => {
    const ids = new Set(pool.map((p) => p.id));
    return current.filter((p) => ids.has(p.id));
  }, firstPool);
  return sortShopDisplayProducts(sortProductsInMemory(intersection, opts.sort), opts.sort, opts);
}

export async function getProducts({
  first = 16,
  after,
  sortKey = "CREATED_AT",
  reverse = true,
  query,
  country: countryOpt,
  cache,
}: {
  first?: number;
  after?: string;
  sortKey?: string;
  reverse?: boolean;
  query?: string;
  country?: string;
  cache?: RequestCache;
}): Promise<Product[]> {
  type R = {
    products: {
      edges: Array<{ node: GQLProductNode }>;
    };
  };

  const country = await resolveServerCountry(countryOpt);

  const data = await shopifyFetch<R>({
    query: PRODUCTS_QUERY,
    variables: {
      first,
      after: after ?? null,
      sortKey,
      reverse,
      query: query ?? null,
      country,
    },
    cache,
    tags: query
      ? ["shopify-products", `shopify-products-${country}`, `shopify-products-${query}`]
      : ["shopify-products", `shopify-products-${country}`],
  });

  return data.products.edges.map((e) => mapProductNode(e.node));
}

export async function getProductByHandle(
  handle: string,
  countryOpt?: string,
  cache?: RequestCache,
): Promise<Product | null> {
  type R = { product: GQLProductNode | null };
  const country = await resolveServerCountry(countryOpt);
  const data = await shopifyFetch<R>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle, country },
    cache,
    tags: [`shopify-product-${handle}`, `shopify-product-${country}-${handle}`],
  });
  if (!data.product) return null;
  return mapProductNode(data.product);
}

export async function getCollections(
  countryOpt?: string,
): Promise<Collection[]> {
  type R = {
    collections: { edges: Array<{ node: GQLCollectionNode }> };
  };
  const country = await resolveServerCountry(countryOpt);
  const data = await shopifyFetch<R>({
    query: COLLECTIONS_QUERY,
    variables: { first: 50, country },
    tags: ["shopify-collections", `shopify-collections-${country}`],
  });

  return data.collections.edges.map((e) => ({
    id: e.node.id,
    handle: e.node.handle,
    title: e.node.title,
    description: e.node.description,
    image: mapImage(e.node.image),
    products: [],
  }));
}

export async function getCollectionByHandle(
  handle: string,
  productsFirst = 24,
  sort?: string,
  countryOpt?: string,
): Promise<Collection | null> {
  const { sortKey, reverse } = collectionSortFromParam(sort);
  type R = { collection: GQLCollectionNode | null };
  const country = await resolveServerCountry(countryOpt);
  const data = await shopifyFetch<R>({
    query: COLLECTION_BY_HANDLE_QUERY,
    variables: { handle, productsFirst, sortKey, reverse, country },
    tags: [`shopify-collection-${handle}`, `shopify-collection-${country}-${handle}`],
  });
  if (!data.collection) return null;

  const c = data.collection;
  const products =
    c.products?.edges.map((edge) => mapProductNode(edge.node)) ?? [];

  return {
    id: c.id,
    handle: c.handle,
    title: c.title,
    description: c.description,
    image: mapImage(c.image),
    products: sort === "losowo" ? hourlyShuffleProducts(products) : products,
  };
}

export async function getFeaturedProducts(
  first = 16,
  countryOpt?: string,
): Promise<Product[]> {
  const country = await resolveServerCountry(countryOpt);
  for (const handle of ["featured", "2026-collection"]) {
    const col = await getCollectionByHandle(handle, first, undefined, country);
    if (col && col.products.length > 0) {
      return col.products.slice(0, first);
    }
  }

  const { sortKey, reverse } = shopSortFromParam("najnowsze");
  return getProducts({ first, sortKey, reverse, country });
}
