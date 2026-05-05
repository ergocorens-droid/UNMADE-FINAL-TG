export type ProductCategory = "koszulki" | "bluzy" | "longsleeve";
export type CollectionSlug = "porsche" | "jdm" | "drift";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  collection: CollectionSlug;
  img1: string;
  img2: string;
  /** Opcjonalne zdjęcia wariantu białego; bez tego — placeholder Unsplash */
  imgWhite1?: string;
  imgWhite2?: string;
  price: number;
  compareAt: number;
  soldOut: boolean;
  /** Brak stanu dla wybranych rozmiarów — PDP pokazuje je jako niedostępne */
  unavailableSizes?: readonly Size[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "wanna-be-my-cardio-tee",
    name: "WANNA BE MY CARDIO? TEE",
    category: "koszulki",
    collection: "porsche",
    img1: "/products/tee-black.svg",
    img2: "/products/tee-black.svg",
    imgWhite1: "/products/tee-white.svg",
    imgWhite2: "/products/tee-white.svg",
    price: 194,
    compareAt: 229,
    soldOut: false,
    unavailableSizes: ["XL", "XXL"],
  },
  {
    slug: "apexero-rsr-tee",
    name: "APEXERO RSR TEE",
    category: "koszulki",
    collection: "porsche",
    img1: "/products/tee-black.svg",
    img2: "/products/tee-black.svg",
    imgWhite1: "/products/tee-white.svg",
    imgWhite2: "/products/tee-white.svg",
    price: 189,
    compareAt: 219,
    soldOut: false,
  },
  {
    slug: "silhouette-gt-tee",
    name: "SILHOUETTE GT TEE",
    category: "koszulki",
    collection: "porsche",
    img1: "/products/tee-black.svg",
    img2: "/products/tee-black.svg",
    imgWhite1: "/products/tee-white.svg",
    imgWhite2: "/products/tee-white.svg",
    price: 179,
    compareAt: 209,
    soldOut: false,
  },
  {
    slug: "touge-drift-longsleeve",
    name: "TOUGE DRIFT LONGSLEEVE",
    category: "longsleeve",
    collection: "drift",
    img1: "/products/longsleeve-black.svg",
    img2: "/products/longsleeve-black.svg",
    price: 219,
    compareAt: 259,
    soldOut: false,
  },
  {
    slug: "midnight-run-tee",
    name: "MIDNIGHT RUN TEE",
    category: "koszulki",
    collection: "jdm",
    img1: "/products/tee-black.svg",
    img2: "/products/tee-black.svg",
    imgWhite1: "/products/tee-white.svg",
    imgWhite2: "/products/tee-white.svg",
    price: 169,
    compareAt: 199,
    soldOut: false,
  },
  {
    slug: "night-shift-hoodie",
    name: "NIGHT SHIFT HOODIE",
    category: "bluzy",
    collection: "jdm",
    img1: "/products/hoodie-black.svg",
    img2: "/products/hoodie-black.svg",
    price: 349,
    compareAt: 399,
    soldOut: false,
    unavailableSizes: ["S"],
  },
];

export const PRODUCT_BY_SLUG = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p]),
) as Record<string, Product>;

export const SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

export type ProductColorSlug = "black" | "white";

export interface ProductColorVariant {
  slug: ProductColorSlug;
  label: string;
  img1: string;
  img2: string;
}

/** Fallback „biała koszulka” gdy produkt nie ma imgWhite1/imgWhite2 */
const WHITE_TEE_IMG1 = "/products/tee-white.svg";
const WHITE_TEE_IMG2 = "/products/tee-white.svg";

/** Koszulki i longsleeve: czarny = img1/img2; biały = imgWhite1/imgWhite2 lub placeholder. Bluzy: brak wyboru. */
export function getColorVariants(
  product: Product,
): ProductColorVariant[] | null {
  if (product.category === "bluzy") return null;
  const white1 = product.imgWhite1 ?? WHITE_TEE_IMG1;
  const white2 = product.imgWhite2 ?? WHITE_TEE_IMG2;
  return [
    {
      slug: "black",
      label: "Czarna",
      img1: product.img1,
      img2: product.img2,
    },
    {
      slug: "white",
      label: "Biała",
      img1: white1,
      img2: white2,
    },
  ];
}

export function defaultCartColor(
  product: Product,
): ProductColorSlug | undefined {
  if (product.category === "bluzy") return undefined;
  return "black";
}

export function formatColorLabel(color: ProductColorSlug | undefined): string {
  if (!color) return "";
  return color === "black" ? "Czarna" : "Biała";
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCT_BY_SLUG[slug];
}

/** Deterministic pseudo-stock 2–7 for FOMO display */
export function getFomoStock(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return 2 + (h % 6);
}

/** Liczba „oglądających” (wyszarowany urgency jak na Shopify — czysto dekoracyjnie). */
export function getWatchingCount(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 37 + slug.charCodeAt(i)) >>> 0;
  }
  return 3 + (h % 12);
}

export function isSizeUnavailable(product: Product, size: Size): boolean {
  return product.unavailableSizes?.includes(size) ?? false;
}

export function formatPln(n: number): string {
  return `${n.toLocaleString("pl-PL")} zł`;
}

export const FREE_SHIPPING_THRESHOLD_PLN = 300;
