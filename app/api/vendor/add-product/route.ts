import { createClient } from "@supabase/supabase-js";
import { createShopifyProduct } from "../../../../src/lib/shopify-admin";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export async function POST(request: Request) {
  // Verify the vendor's auth token
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const vendorName = user.user_metadata?.vendor_name as string | undefined;
  if (!vendorName) {
    return Response.json({ error: "Not a vendor account" }, { status: 403 });
  }

  const body = await request.json();
  const { title, description, price, imageBase64 } = body;

  if (!title || !price) {
    return Response.json(
      { error: "Title and price are required" },
      { status: 400 }
    );
  }

  try {
    const product = await createShopifyProduct({
      title,
      bodyHtml: description || "",
      price: String(price),
      vendor: vendorName,
      imageBase64,
    });
    return Response.json({ product });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
