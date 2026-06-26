import { createClient } from "@supabase/supabase-js";
import { getAllOrderStats } from "../../../../src/lib/shopify-admin";
import { getProducts } from "../../../../src/lib/shopify";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

async function verifyAdmin(token: string) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user || user.user_metadata?.role !== "admin") return null;
  return user;
}

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const user = await verifyAdmin(token);
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  const [
    { data: applications },
    { data: bundles },
    orderStats,
    products,
  ] = await Promise.all([
    supabaseAdmin
      .from("designer_applications")
      .select("*")
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("bundle_requests")
      .select("*")
      .order("created_at", { ascending: false }),
    getAllOrderStats(),
    getProducts(),
  ]);

  // Build vendor list with product counts from Shopify
  const vendorMap: Record<string, number> = {};
  for (const { node } of products) {
    const v = node.vendor || "Unknown";
    vendorMap[v] = (vendorMap[v] || 0) + 1;
  }
  const vendors = Object.entries(vendorMap)
    .map(([name, productCount]) => ({
      name,
      productCount,
      revenue: orderStats.vendorRevenue[name] ?? 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  return Response.json({
    applications: applications ?? [],
    bundles: bundles ?? [],
    orders: {
      totalOrders: orderStats.totalOrders,
      totalRevenue: orderStats.totalRevenue,
    },
    vendors,
  });
}
