import { shopifyClientFetch } from "./client";
import { PRODUCTS_QUERY } from "./queries";
import type { GQLProductNode } from "./product-map";
import { mapProductNode } from "./product-map";
import type { Product } from "./types";

async function getProductsForClient(params: {
  first: number;
  sortKey: string;
  reverse: boolean;
  query?: string;
  country: string;
}): Promise<Product[]> {
  type R = {
    products: {
      edges: Array<{ node: GQLProductNode }>;
    };
  };
  const data = await shopifyClientFetch<R>({
    query: PRODUCTS_QUERY,
    variables: {
      first: params.first,
      after: null,
      sortKey: params.sortKey,
      reverse: params.reverse,
      query: params.query ?? null,
      country: params.country,
    },
  });
  return data.products.edges.map((e) => mapProductNode(e.node));
}

/** Wyszukiwanie produktów po stronie klienta (np. overlay) — bez `next/headers`. */
export async function clientSearchProducts(
  search: string,
  country: string,
  first = 12,
): Promise<Product[]> {
  const q = search.trim();
  if (!q) {
    return getProductsForClient({
      first,
      sortKey: "CREATED_AT",
      reverse: true,
      country,
    });
  }
  return getProductsForClient({
    first,
    sortKey: "RELEVANCE",
    reverse: false,
    query: q,
    country,
  });
}
