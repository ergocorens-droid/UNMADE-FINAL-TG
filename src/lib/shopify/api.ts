import { shopifyClientFetch, shopifyFetch } from "./client";
import { SIDEBAR_COLLECTION_HANDLES } from "./collection-labels";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_QUERY,
  COLLECTIONS_QUERY,
  COLLECTION_BY_HANDLE_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
} from "./queries";
import type {
  Cart,
  CartLine,
  CartLineMerchandise,
  Collection,
  Image,
  Money,
  PriceRange,
  Product,
  ProductCollectionRef,
  ProductOption,
  ProductVariant,
} from "./types";

// --- raw shapes ---

type GQLMoney = { amount: string; currencyCode: string };
type GQLImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

type GQLSelectedOption = { name: string; value: string };

type GQLVariantNode = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: GQLMoney;
  compareAtPrice: GQLMoney | null;
  selectedOptions: GQLSelectedOption[];
  image: GQLImage | null;
};

type GQLOption = { id: string; name: string; values: string[] };

type GQLProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  featuredImage: GQLImage | null;
  priceRange: {
    minVariantPrice: GQLMoney;
    maxVariantPrice: GQLMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: GQLMoney;
    maxVariantPrice: GQLMoney;
  };
  images: { edges: Array<{ node: GQLImage }> };
  options: GQLOption[];
  variants: { edges: Array<{ node: GQLVariantNode }> };
  collections: { edges: Array<{ node: { handle: string; title: string } }> };
};

type GQLCollectionNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: GQLImage | null;
  products?: { edges: Array<{ node: GQLProductNode }> };
};

type GQLCartCost = {
  totalAmount: GQLMoney;
  subtotalAmount: GQLMoney;
};

type GQLMerch = {
  id: string;
  title: string;
  selectedOptions: GQLSelectedOption[];
  image: GQLImage | null;
  product: {
    handle: string;
    title: string;
    featuredImage: GQLImage | null;
  };
};

type GQLCartLineNode = {
  id: string;
  quantity: number;
  cost: { totalAmount: GQLMoney };
  merchandise: GQLMerch;
};

type GQLCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: GQLCartCost;
  lines: { edges: Array<{ node: GQLCartLineNode }> };
};

// --- mappers ---

function mapMoney(m: GQLMoney): Money {
  return { amount: m.amount, currencyCode: m.currencyCode };
}

function mapImage(img: GQLImage | null): Image | null {
  if (!img?.url) return null;
  return {
    url: img.url,
    altText: img.altText ?? null,
    width: img.width ?? null,
    height: img.height ?? null,
  };
}

function mapVariant(node: GQLVariantNode): ProductVariant {
  return {
    id: node.id,
    title: node.title,
    availableForSale: node.availableForSale,
    /** Wymaga scope `unauthenticated_read_product_inventory` — nie pobieramy. */
    quantityAvailable: null,
    price: mapMoney(node.price),
    compareAtPrice: node.compareAtPrice ? mapMoney(node.compareAtPrice) : null,
    selectedOptions: node.selectedOptions.map((o) => ({
      name: o.name,
      value: o.value,
    })),
    image: mapImage(node.image),
  };
}

function mapPriceRange(r: GQLProductNode["priceRange"]): PriceRange {
  return {
    minVariantPrice: mapMoney(r.minVariantPrice),
    maxVariantPrice: mapMoney(r.maxVariantPrice),
  };
}

function mapProductNode(node: GQLProductNode): Product {
  const images: Image[] = node.images.edges
    .map((e) => mapImage(e.node))
    .filter((x): x is Image => x !== null);

  const featured = mapImage(node.featuredImage);
  const imageList =
    images.length > 0
      ? images
      : featured
        ? [featured]
        : [];

  const collections: ProductCollectionRef[] = node.collections.edges.map(
    (e) => ({
      handle: e.node.handle,
      title: e.node.title,
    }),
  );

  const options: ProductOption[] = node.options.map((o) => ({
    id: o.id,
    name: o.name,
    values: o.values,
  }));

  const variants = node.variants.edges.map((e) => mapVariant(e.node));

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    descriptionHtml: node.descriptionHtml,
    availableForSale: node.availableForSale,
    tags: node.tags,
    options,
    variants,
    images: imageList,
    priceRange: mapPriceRange(node.priceRange),
    compareAtPriceRange: mapPriceRange(node.compareAtPriceRange),
    featuredImage: mapImage(node.featuredImage),
    collections,
  };
}

function mapMerchToCartLineMerch(m: GQLMerch): CartLineMerchandise {
  const base: ProductVariant = {
    id: m.id,
    title: m.title,
    availableForSale: true,
    quantityAvailable: null,
    price: { amount: "0", currencyCode: "PLN" },
    compareAtPrice: null,
    selectedOptions: m.selectedOptions.map((o) => ({
      name: o.name,
      value: o.value,
    })),
    image: mapImage(m.image),
  };
  return {
    ...base,
    product: {
      handle: m.product.handle,
      title: m.product.title,
      featuredImage: mapImage(m.product.featuredImage),
    },
  };
}

function mapCartLineNode(node: GQLCartLineNode): CartLine {
  return {
    id: node.id,
    quantity: node.quantity,
    merchandise: mapMerchToCartLineMerch(node.merchandise),
    cost: { totalAmount: mapMoney(node.cost.totalAmount) },
  };
}

export function mapCartFromGql(cart: GQLCart | null | undefined): Cart | null {
  if (!cart) return null;
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    cost: {
      totalAmount: mapMoney(cart.cost.totalAmount),
      subtotalAmount: mapMoney(cart.cost.subtotalAmount),
    },
    lines: cart.lines.edges.map((e) => mapCartLineNode(e.node)),
  };
}

function throwUserErrors(
  errors:
    | Array<{ field?: string[] | null; message: string } | null>
    | null
    | undefined,
): void {
  const list = errors?.filter(Boolean) as Array<{ message: string }>;
  if (list?.length) {
    throw new Error(list.map((e) => e.message).join("; "));
  }
}

// --- server API ---

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
export function sortProductsInMemory(
  products: Product[],
  sort: string | undefined,
): Product[] {
  const { sortKey, reverse } = shopSortFromParam(sort);
  const arr = [...products];
  arr.sort((a, b) => {
    if (sortKey === "PRICE") {
      const pa = parseFloat(a.priceRange.minVariantPrice.amount);
      const pb = parseFloat(b.priceRange.minVariantPrice.amount);
      const cmp = pa - pb;
      return reverse ? -cmp : cmp;
    }
    if (sortKey === "BEST_SELLING") {
      return 0;
    }
    // CREATED_AT — brak pola w typie; stabilnie po gid
    return reverse ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id);
  });
  return arr;
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

  if (pools.length === 0) {
    return getProducts({
      first: 48,
      sortKey,
      reverse,
      query: opts.q,
    });
  }

  if (pools.length === 1) {
    return sortProductsInMemory(pools[0], opts.sort);
  }

  const [a, b] = pools;
  const map = new Map(a.map((p) => [p.id, p] as const));
  const intersection = b
    .filter((p) => map.has(p.id))
    .map((p) => map.get(p.id)!);
  return sortProductsInMemory(intersection, opts.sort);
}

export async function getProducts({
  first = 16,
  after,
  sortKey = "CREATED_AT",
  reverse = true,
  query,
}: {
  first?: number;
  after?: string;
  sortKey?: string;
  reverse?: boolean;
  query?: string;
}): Promise<Product[]> {
  type R = {
    products: {
      edges: Array<{ node: GQLProductNode }>;
    };
  };

  const data = await shopifyFetch<R>({
    query: PRODUCTS_QUERY,
    variables: {
      first,
      after: after ?? null,
      sortKey,
      reverse,
      query: query ?? null,
    },
    tags: query ? [`shopify-products-${query}`] : ["shopify-products"],
  });

  return data.products.edges.map((e) => mapProductNode(e.node));
}

export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  type R = { product: GQLProductNode | null };
  const data = await shopifyFetch<R>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    tags: [`shopify-product-${handle}`],
  });
  if (!data.product) return null;
  return mapProductNode(data.product);
}

export async function getCollections(): Promise<Collection[]> {
  type R = {
    collections: { edges: Array<{ node: GQLCollectionNode }> };
  };
  const data = await shopifyFetch<R>({
    query: COLLECTIONS_QUERY,
    variables: { first: 50 },
    tags: ["shopify-collections"],
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
): Promise<Collection | null> {
  const { sortKey, reverse } = collectionSortFromParam(sort);
  type R = { collection: GQLCollectionNode | null };
  const data = await shopifyFetch<R>({
    query: COLLECTION_BY_HANDLE_QUERY,
    variables: { handle, productsFirst, sortKey, reverse },
    tags: [`shopify-collection-${handle}`],
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
    products,
  };
}

export async function getFeaturedProducts(first = 16): Promise<Product[]> {
  for (const handle of ["featured", "2026-collection"]) {
    const col = await getCollectionByHandle(handle, first);
    if (col && col.products.length > 0) {
      return col.products.slice(0, first);
    }
  }

  const { sortKey, reverse } = shopSortFromParam("najnowsze");
  return getProducts({ first, sortKey, reverse });
}

// --- client cart ---

export async function cartCreate(
  lines?: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  type R = {
    cartCreate: {
      cart: GQLCart | null;
      userErrors: Array<{ message: string }>;
    };
  };
  const data = await shopifyClientFetch<R>({
    query: CART_CREATE_MUTATION,
    variables: {
      input: lines?.length ? { lines } : {},
    },
  });
  throwUserErrors(data.cartCreate.userErrors);
  const cart = mapCartFromGql(data.cartCreate.cart);
  if (!cart) throw new Error("cartCreate: brak koszyka w odpowiedzi");
  return cart;
}

export async function cartLinesAdd(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  type R = {
    cartLinesAdd: {
      cart: GQLCart | null;
      userErrors: Array<{ message: string }>;
    };
  };
  const data = await shopifyClientFetch<R>({
    query: CART_LINES_ADD_MUTATION,
    variables: { cartId, lines },
  });
  throwUserErrors(data.cartLinesAdd.userErrors);
  const cart = mapCartFromGql(data.cartLinesAdd.cart);
  if (!cart) throw new Error("cartLinesAdd: brak koszyka w odpowiedzi");
  return cart;
}

export async function cartLinesUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<Cart> {
  type R = {
    cartLinesUpdate: {
      cart: GQLCart | null;
      userErrors: Array<{ message: string }>;
    };
  };
  const data = await shopifyClientFetch<R>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: { cartId, lines },
  });
  throwUserErrors(data.cartLinesUpdate.userErrors);
  const cart = mapCartFromGql(data.cartLinesUpdate.cart);
  if (!cart) throw new Error("cartLinesUpdate: brak koszyka w odpowiedzi");
  return cart;
}

export async function cartLinesRemove(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  type R = {
    cartLinesRemove: {
      cart: GQLCart | null;
      userErrors: Array<{ message: string }>;
    };
  };
  const data = await shopifyClientFetch<R>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: { cartId, lineIds },
  });
  throwUserErrors(data.cartLinesRemove.userErrors);
  const cart = mapCartFromGql(data.cartLinesRemove.cart);
  if (!cart) throw new Error("cartLinesRemove: brak koszyka w odpowiedzi");
  return cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  type R = { cart: GQLCart | null };
  const data = await shopifyClientFetch<R>({
    query: CART_QUERY,
    variables: { cartId },
  });
  return mapCartFromGql(data.cart);
}

/** Wyszukiwanie produktów po stronie klienta (np. overlay) */
export async function clientSearchProducts(
  search: string,
  first = 12,
): Promise<Product[]> {
  const q = search.trim();
  if (!q) {
    return getProductsForClient({
      first,
      sortKey: "CREATED_AT",
      reverse: true,
    });
  }
  return getProductsForClient({
    first,
    sortKey: "RELEVANCE",
    reverse: false,
    query: q,
  });
}

async function getProductsForClient(params: {
  first: number;
  sortKey: string;
  reverse: boolean;
  query?: string;
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
    },
  });
  return data.products.edges.map((e) => mapProductNode(e.node));
}
