const STOREFRONT_API_VERSION = "2024-10";

type ShopifyGraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

function assertShopifyEnv(): { domain: string; token: string } {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) {
    throw new Error(
      "Missing Shopify env vars (SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN)",
    );
  }
  return { domain, token };
}

function assertShopifyPublicEnv(): { domain: string; token: string } {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) {
    throw new Error(
      "Missing NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN / NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN",
    );
  }
  return { domain, token };
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache,
  tags,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<T> {
  const { domain, token } = assertShopifyEnv();
  const endpoint = `https://${domain}/api/${STOREFRONT_API_VERSION}/graphql.json`;
  const trimmed = query.trim();
  const isMutation = trimmed.toLowerCase().startsWith("mutation");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: isMutation ? "no-store" : (cache ?? "default"),
    ...(isMutation
      ? {}
      : {
          next: { revalidate: 60, tags },
        }),
  });

  const bodyText = await res.text();
  if (!res.ok) {
    throw new Error(
      `Shopify Storefront API: ${res.status} ${res.statusText} — ${bodyText.slice(0, 500)}`,
    );
  }

  let json: ShopifyGraphQLResponse<T>;
  try {
    json = JSON.parse(bodyText) as ShopifyGraphQLResponse<T>;
  } catch {
    throw new Error(
      `Shopify Storefront API: niepoprawny JSON — ${bodyText.slice(0, 200)}`,
    );
  }

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  if (!json.data) {
    throw new Error("Shopify Storefront API: brak pola data w odpowiedzi.");
  }

  return json.data;
}

export async function shopifyClientFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const { domain, token } = assertShopifyPublicEnv();
  const endpoint = `https://${domain}/api/${STOREFRONT_API_VERSION}/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const bodyText = await res.text();
  if (!res.ok) {
    throw new Error(
      `Shopify Storefront API (client): ${res.status} ${res.statusText} — ${bodyText.slice(0, 500)}`,
    );
  }

  let json: ShopifyGraphQLResponse<T>;
  try {
    json = JSON.parse(bodyText) as ShopifyGraphQLResponse<T>;
  } catch {
    throw new Error(
      `Shopify Storefront API (client): niepoprawny JSON — ${bodyText.slice(0, 200)}`,
    );
  }

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  if (!json.data) {
    throw new Error("Shopify Storefront API (client): brak pola data.");
  }

  return json.data;
}
