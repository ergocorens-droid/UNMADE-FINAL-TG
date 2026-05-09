import type {
  Image,
  Money,
  PriceRange,
  Product,
  ProductCollectionRef,
  ProductOption,
  ProductVariant,
} from "./types";

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
type GQLNullablePriceBand = {
  minVariantPrice: GQLMoney | null;
  maxVariantPrice: GQLMoney | null;
} | null;

export type GQLProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  featuredImage: GQLImage | null;
  priceRange: GQLNullablePriceBand;
  compareAtPriceRange: GQLNullablePriceBand;
  images: { edges: Array<{ node: GQLImage }> };
  options: GQLOption[];
  variants: { edges: Array<{ node: GQLVariantNode }> };
  collections: { edges: Array<{ node: { handle: string; title: string } }> };
};

export function mapMoney(m: GQLMoney): Money {
  return { amount: m.amount, currencyCode: m.currencyCode };
}

export function mapImage(img: GQLImage | null): Image | null {
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

function mapMoneyOrNull(m: GQLMoney | null | undefined): Money | null {
  if (!m?.amount) return null;
  return mapMoney(m);
}

function mapProductPriceRange(r: GQLNullablePriceBand): PriceRange {
  if (!r) {
    return { minVariantPrice: null, maxVariantPrice: null };
  }
  return {
    minVariantPrice: mapMoneyOrNull(r.minVariantPrice),
    maxVariantPrice: mapMoneyOrNull(r.maxVariantPrice),
  };
}

export function mapProductNode(node: GQLProductNode): Product {
  const images: Image[] = node.images.edges
    .map((e) => mapImage(e.node))
    .filter((x): x is Image => x !== null);

  const featured = mapImage(node.featuredImage);
  const imageList =
    images.length > 0 ? images : featured ? [featured] : [];

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
    priceRange: mapProductPriceRange(node.priceRange),
    compareAtPriceRange: mapProductPriceRange(node.compareAtPriceRange),
    featuredImage: mapImage(node.featuredImage),
    collections,
  };
}
