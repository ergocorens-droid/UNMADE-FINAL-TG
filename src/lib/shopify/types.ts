export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type ImageEdge = {
  node: Image;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: SelectedOption[];
  image: Image | null;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type PriceRange = {
  minVariantPrice: Money;
  maxVariantPrice: Money;
};

export type ProductCollectionRef = {
  handle: string;
  title: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  options: ProductOption[];
  variants: ProductVariant[];
  images: Image[];
  priceRange: PriceRange;
  compareAtPriceRange: PriceRange;
  featuredImage: Image | null;
  collections: ProductCollectionRef[];
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: Image | null;
  products: Product[];
};

export type CartLineMerchandise = ProductVariant & {
  product: {
    handle: string;
    title: string;
    featuredImage: Image | null;
  };
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: CartLineMerchandise;
  cost: {
    totalAmount: Money;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: Money;
    subtotalAmount: Money;
  };
  lines: CartLine[];
};
