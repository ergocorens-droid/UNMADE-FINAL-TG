import { shopifyClientFetch } from "./client";
import { mapImage, mapMoney } from "./product-map";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_QUERY,
} from "./queries";
import type {
  Cart,
  CartLine,
  CartLineMerchandise,
  ProductVariant,
} from "./types";

type GQLMoney = { amount: string; currencyCode: string };

type GQLImageRaw = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

type GQLMerch = {
  id: string;
  title: string;
  selectedOptions: Array<{ name: string; value: string }>;
  image: GQLImageRaw | null;
  product: {
    handle: string;
    title: string;
    featuredImage: GQLImageRaw | null;
    images: {
      edges: Array<{ node: GQLImageRaw }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          selectedOptions: Array<{ name: string; value: string }>;
          image: GQLImageRaw | null;
        };
      }>;
    };
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
  cost: {
    totalAmount: GQLMoney;
    subtotalAmount: GQLMoney;
  };
  lines: { edges: Array<{ node: GQLCartLineNode }> };
};

function mapMerchToCartLineMerch(
  m: GQLMerch,
  lineCurrencyCode: string,
): CartLineMerchandise {
  const base: ProductVariant = {
    id: m.id,
    title: m.title,
    availableForSale: true,
    quantityAvailable: null,
    price: { amount: "0", currencyCode: lineCurrencyCode },
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
      images: m.product.images.edges
        .map((edge) => mapImage(edge.node))
        .filter((image): image is NonNullable<typeof image> => image !== null),
      variants: m.product.variants.edges.map(({ node }) => ({
        id: node.id,
        selectedOptions: node.selectedOptions.map((o) => ({
          name: o.name,
          value: o.value,
        })),
        image: mapImage(node.image),
      })),
    },
  };
}

function mapCartLineNode(node: GQLCartLineNode): CartLine {
  const cc = node.cost.totalAmount.currencyCode;
  return {
    id: node.id,
    quantity: node.quantity,
    merchandise: mapMerchToCartLineMerch(node.merchandise, cc),
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

export async function cartCreate(
  country: string,
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
      input: {
        buyerIdentity: { countryCode: country },
        ...(lines?.length ? { lines } : {}),
      },
      country,
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
  country: string,
): Promise<Cart> {
  type R = {
    cartLinesAdd: {
      cart: GQLCart | null;
      userErrors: Array<{ message: string }>;
    };
  };
  const data = await shopifyClientFetch<R>({
    query: CART_LINES_ADD_MUTATION,
    variables: { cartId, lines, country },
  });
  throwUserErrors(data.cartLinesAdd.userErrors);
  const cart = mapCartFromGql(data.cartLinesAdd.cart);
  if (!cart) throw new Error("cartLinesAdd: brak koszyka w odpowiedzi");
  return cart;
}

export async function cartLinesUpdate(
  cartId: string,
  lines: { id: string; quantity: number }[],
  country: string,
): Promise<Cart> {
  type R = {
    cartLinesUpdate: {
      cart: GQLCart | null;
      userErrors: Array<{ message: string }>;
    };
  };
  const data = await shopifyClientFetch<R>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: { cartId, lines, country },
  });
  throwUserErrors(data.cartLinesUpdate.userErrors);
  const cart = mapCartFromGql(data.cartLinesUpdate.cart);
  if (!cart) throw new Error("cartLinesUpdate: brak koszyka w odpowiedzi");
  return cart;
}

export async function cartLinesRemove(
  cartId: string,
  lineIds: string[],
  country: string,
): Promise<Cart> {
  type R = {
    cartLinesRemove: {
      cart: GQLCart | null;
      userErrors: Array<{ message: string }>;
    };
  };
  const data = await shopifyClientFetch<R>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: { cartId, lineIds, country },
  });
  throwUserErrors(data.cartLinesRemove.userErrors);
  const cart = mapCartFromGql(data.cartLinesRemove.cart);
  if (!cart) throw new Error("cartLinesRemove: brak koszyka w odpowiedzi");
  return cart;
}

export async function getCart(
  cartId: string,
  country: string,
): Promise<Cart | null> {
  type R = { cart: GQLCart | null };
  const data = await shopifyClientFetch<R>({
    query: CART_QUERY,
    variables: { cartId, country },
  });
  return mapCartFromGql(data.cart);
}
