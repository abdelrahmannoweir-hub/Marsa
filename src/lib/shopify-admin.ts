const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const adminToken = process.env.SHOPIFY_ADMIN_API_TOKEN;

export async function createShopifyProduct({
  title,
  bodyHtml,
  price,
  vendor,
  imageBase64,
}: {
  title: string;
  bodyHtml: string;
  price: string;
  vendor: string;
  imageBase64?: string;
}) {
  const product: Record<string, unknown> = {
    title,
    body_html: bodyHtml,
    vendor,
    variants: [{ price }],
  };

  if (imageBase64) {
    product.images = [{ attachment: imageBase64 }];
  }

  const res = await fetch(
    `https://${domain}/admin/api/2024-01/products.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": adminToken as string,
      },
      body: JSON.stringify({ product }),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      typeof data.errors === "string"
        ? data.errors
        : JSON.stringify(data.errors) || "Failed to create product"
    );
  }
  return data.product;
}
