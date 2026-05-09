export const CART_FRAGMENT = `
fragment CartFragment on Cart {
  id
  checkoutUrl
  totalQuantity
  cost {
    totalAmount {
      amount
      currencyCode
    }
    subtotalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
              width
              height
            }
            product {
              handle
              title
              featuredImage {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
}
`;

/** Pola produktu używane w listach i w kolekcjach */
const PRODUCT_LIST_BODY = `
        id
        handle
        title
        description
        descriptionHtml
        availableForSale
        tags
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        options {
          id
          name
          values
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
        collections(first: 5) {
          edges {
            node {
              handle
              title
            }
          }
        }
`;

export const PRODUCTS_QUERY = `
query Products(
  $first: Int!
  $after: String
  $sortKey: ProductSortKeys
  $reverse: Boolean
  $query: String
  $country: CountryCode!
) @inContext(country: $country) {
  products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, query: $query) {
    edges {
      cursor
      node {
${PRODUCT_LIST_BODY}
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export const PRODUCT_BY_HANDLE_QUERY = `
query ProductByHandle($handle: String!, $country: CountryCode!)
  @inContext(country: $country) {
  product(handle: $handle) {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    tags
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 20) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    options {
      id
      name
      values
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    collections(first: 5) {
      edges {
        node {
          handle
          title
        }
      }
    }
  }
}
`;

export const COLLECTIONS_QUERY = `
query Collections($first: Int!, $country: CountryCode!)
  @inContext(country: $country) {
  collections(first: $first) {
    edges {
      node {
        id
        handle
        title
        description
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
}
`;

export const COLLECTION_BY_HANDLE_QUERY = `
query CollectionByHandle(
  $handle: String!
  $productsFirst: Int!
  $sortKey: ProductCollectionSortKeys
  $reverse: Boolean
  $country: CountryCode!
) @inContext(country: $country) {
  collection(handle: $handle) {
    id
    handle
    title
    description
    image {
      url
      altText
      width
      height
    }
    products(first: $productsFirst, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
${PRODUCT_LIST_BODY}
        }
      }
    }
  }
}
`;

export const CART_QUERY = `
${CART_FRAGMENT}
query CartQuery($cartId: ID!, $country: CountryCode!)
  @inContext(country: $country) {
  cart(id: $cartId) {
    ...CartFragment
  }
}
`;

export const CART_CREATE_MUTATION = `
${CART_FRAGMENT}
mutation CartCreate($input: CartInput!, $country: CountryCode!)
  @inContext(country: $country) {
  cartCreate(input: $input) {
    cart {
      ...CartFragment
    }
    userErrors {
      field
      message
    }
  }
}
`;

export const CART_LINES_ADD_MUTATION = `
${CART_FRAGMENT}
mutation CartLinesAdd(
  $cartId: ID!
  $lines: [CartLineInput!]!
  $country: CountryCode!
) @inContext(country: $country) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      ...CartFragment
    }
    userErrors {
      field
      message
    }
  }
}
`;

export const CART_LINES_UPDATE_MUTATION = `
${CART_FRAGMENT}
mutation CartLinesUpdate(
  $cartId: ID!
  $lines: [CartLineUpdateInput!]!
  $country: CountryCode!
) @inContext(country: $country) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      ...CartFragment
    }
    userErrors {
      field
      message
    }
  }
}
`;

export const CART_LINES_REMOVE_MUTATION = `
${CART_FRAGMENT}
mutation CartLinesRemove(
  $cartId: ID!
  $lineIds: [ID!]!
  $country: CountryCode!
) @inContext(country: $country) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      ...CartFragment
    }
    userErrors {
      field
      message
    }
  }
}
`;
