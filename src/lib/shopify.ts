const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

export async function shopifyFetch(query: string, variables = {}) {
  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token as string,
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await res.json();
  return data;
}

export async function getProducts() {
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            images(first: 1) {
              edges { node { url } }
            }
            priceRange {
              minVariantPrice { amount currencyCode }
            }
          }
        }
      }
    }
  `;
  const result = await shopifyFetch(query);
  return result?.data?.products?.edges || [];
}

export async function getProductByHandle(handle: string) {
  const query = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        vendor
        images(first: 5) {
          edges { node { url } }
        }
        variants(first: 1) {
          edges {
            node {
              id
              price { amount currencyCode }
            }
          }
        }
      }
    }
  `;
  const result = await shopifyFetch(query, { handle });
  return result?.data?.productByHandle;
}

export async function getProductsByVendor(vendor: string) {
  const query = `
    query getProductsByVendor($query: String!) {
      products(first: 50, query: $query) {
        edges {
          node {
            id
            title
            handle
            vendor
            images(first: 1) {
              edges { node { url } }
            }
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            variants(first: 1) {
              edges {
                node {
                  quantityAvailable
                }
              }
            }
          }
        }
      }
    }
  `;
  const result = await shopifyFetch(query, { query: `vendor:'${vendor}'` });
  return result?.data?.products?.edges || [];
}

export async function createCart() {
  const query = `
    mutation cartCreate {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;
  const result = await shopifyFetch(query);
  return result?.data?.cartCreate?.cart;
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount { amount currencyCode }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product {
                      title
                      handle
                      images(first: 1) {
                        edges { node { url } }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const result = await shopifyFetch(query, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  return result?.data?.cartLinesAdd?.cart;
}

export async function getCart(cartId: string) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount { amount currencyCode }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges { node { url } }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const result = await shopifyFetch(query, { cartId });
  return result?.data?.cart;
}export async function getVendorStats(vendor: string) {
  const products = await getProductsByVendor(vendor);
  const totalProducts = products.length;

  return {
    totalProducts,
  };
}