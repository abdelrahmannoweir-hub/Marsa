import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, company, licenseNumber, website, message } = body;

  if (!name || !email) {
    return Response.json({ error: "Name and email are required" }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.from("designer_applications").insert({
    name,
    email,
    company: company || null,
    license_number: licenseNumber || null,
    website: website || null,
    message: message || null,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
