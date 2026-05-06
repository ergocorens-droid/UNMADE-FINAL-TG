import type { Product as AppProduct } from "./products";

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
} | null;

/** Kształt węzła produktu w odpowiedzi Storefront API */
export type Product = {
  id: string;
  handle: string;
  title: string;
  featuredImage: ShopifyImage;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
};

export type ProductsConnection = {
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
};

type ShopifyGraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

const STOREFRONT_API_VERSION = "2024-10";

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    throw new Error(
      "Brak SHOPIFY_STORE_DOMAIN lub SHOPIFY_STOREFRONT_ACCESS_TOKEN w zmiennych środowiskowych.",
    );
  }

  const endpoint = `https://${domain}/api/${STOREFRONT_API_VERSION}/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify Storefront API: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as ShopifyGraphQLResponse<T>;

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  if (!json.data) {
    throw new Error("Shopify Storefront API: brak pola data w odpowiedzi.");
  }

  return json.data;
}

const PRODUCTS_QUERY = `
  query FeaturedProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

function mapShopifyNodeToAppProduct(node: Product): AppProduct {
  const amount = Number.parseFloat(node.priceRange.minVariantPrice.amount);
  const price = Number.isFinite(amount) ? Math.round(amount) : 0;

  return {
    id: node.id,
    handle: node.handle,
    title: node.title.toUpperCase(),
    price,
    image: node.featuredImage?.url ?? null,
  };
}

export async function getShopifyProducts(first: number): Promise<AppProduct[]> {
  const data = await shopifyFetch<ProductsConnection>(PRODUCTS_QUERY, {
    first,
  });

  return data.products.edges.map(({ node }) =>
    mapShopifyNodeToAppProduct(node),
  );
}
