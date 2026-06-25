import { createClient } from "@supabase/supabase-js";
import { getVendorOrders } from "../../../../src/lib/shopify-admin";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const vendorName = user.user_metadata?.vendor_name as string | undefined;
  if (!vendorName) {
    return Response.json({ error: "Not a vendor account" }, { status: 403 });
  }

  const stats = await getVendorOrders(vendorName);
  return Response.json(stats);
}
