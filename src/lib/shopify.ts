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
          }
        }
      }
    }
  `;
  const result = await shopifyFetch(query, { query: `vendor:'${vendor}'` });
  return result?.data?.products?.edges || [];
}