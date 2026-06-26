const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const adminToken = process.env.SHOPIFY_ADMIN_API_TOKEN;

const adminHeaders = {
  "Content-Type": "application/json",
  "X-Shopify-Access-Token": adminToken as string,
};

async function getFirstLocationId(): Promise<number | null> {
  const res = await fetch(
    `https://${domain}/admin/api/2024-01/locations.json`,
    { headers: adminHeaders }
  );
  const data = await res.json();
  return data.locations?.[0]?.id ?? null;
}

export async function getAllOrderStats(): Promise<{
  totalOrders: number;
  totalRevenue: number;
  vendorRevenue: Record<string, number>;
}> {
  const res = await fetch(
    `https://${domain}/admin/api/2024-01/orders.json?status=any&limit=250`,
    { headers: adminHeaders }
  );
  const data = await res.json();
  const orders: any[] = data.orders || [];

  let totalRevenue = 0;
  const vendorRevenue: Record<string, number> = {};

  for (const order of orders) {
    totalRevenue += parseFloat(order.total_price || "0");
    for (const item of order.line_items || []) {
      const v = item.vendor || "Unknown";
      vendorRevenue[v] = (vendorRevenue[v] || 0) + parseFloat(item.price) * item.quantity;
    }
  }

  return { totalOrders: orders.length, totalRevenue, vendorRevenue };
}

export async function getVendorOrders(vendor: string): Promise<{
  totalOrders: number;
  revenue: number;
  pendingOrders: number;
}> {
  const res = await fetch(
    `https://${domain}/admin/api/2024-01/orders.json?status=any&limit=250`,
    { headers: adminHeaders }
  );
  const data = await res.json();
  const orders: any[] = data.orders || [];

  let totalOrders = 0;
  let revenue = 0;
  let pendingOrders = 0;

  for (const order of orders) {
    const vendorItems = order.line_items.filter(
      (item: any) => item.vendor === vendor
    );
    if (vendorItems.length === 0) continue;

    totalOrders++;

    for (const item of vendorItems) {
      revenue += parseFloat(item.price) * item.quantity;
    }

    // An order is "pending" if any vendor line item is not yet fulfilled
    const hasPending = vendorItems.some(
      (item: any) => !item.fulfillment_status
    );
    if (hasPending) pendingOrders++;
  }

  return { totalOrders, revenue, pendingOrders };
}

export async function createShopifyProduct({
  title,
  bodyHtml,
  price,
  vendor,
  imageBase64,
  inventory,
}: {
  title: string;
  bodyHtml: string;
  price: string;
  vendor: string;
  imageBase64?: string;
  inventory?: number;
}) {
  const product: Record<string, unknown> = {
    title,
    body_html: bodyHtml,
    vendor,
    variants: [
      {
        price,
        ...(inventory !== undefined
          ? { inventory_management: "shopify", inventory_policy: "deny" }
          : {}),
      },
    ],
  };

  if (imageBase64) {
    product.images = [{ attachment: imageBase64 }];
  }

  const res = await fetch(
    `https://${domain}/admin/api/2024-01/products.json`,
    {
      method: "POST",
      headers: adminHeaders,
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

  const created = data.product;

  if (inventory !== undefined && inventory >= 0) {
    const inventoryItemId = created.variants[0]?.inventory_item_id;
    const locationId = await getFirstLocationId();

    if (inventoryItemId && locationId) {
      await fetch(
        `https://${domain}/admin/api/2024-01/inventory_levels/set.json`,
        {
          method: "POST",
          headers: adminHeaders,
          body: JSON.stringify({
            location_id: locationId,
            inventory_item_id: inventoryItemId,
            available: inventory,
          }),
        }
      );
    }
  }

  return created;
}
