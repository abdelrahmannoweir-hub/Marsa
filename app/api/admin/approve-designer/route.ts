import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

async function verifyAdmin(token: string) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user || user.user_metadata?.role !== "admin") return null;
  return user;
}

export async function POST(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const admin = await verifyAdmin(token);
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { applicationId, email, name, tradeDiscount = 20 } = await request.json();
  if (!applicationId || !email) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  // Create the designer's Supabase Auth account
  const { data: userData, error: createError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {
        role: "designer",
        trade_discount: tradeDiscount,
        full_name: name ?? "",
      },
    });

  if (createError) {
    return Response.json({ error: createError.message }, { status: 500 });
  }

  // Generate a one-time login link the designer can use to set their password
  const { data: linkData, error: linkError } =
    await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email,
    });

  const loginLink = linkData?.properties?.action_link ?? null;

  // Mark application as approved
  await supabaseAdmin
    .from("designer_applications")
    .update({ status: "approved", updated_at: new Date().toISOString() })
    .eq("id", applicationId);

  return Response.json({
    success: true,
    userId: userData.user?.id,
    loginLink,
  });
}
