import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Room = {
  id: string;
  title: string;
  slug: string;
  image_url: string | null;
  product_handles: string[];
  hotspots: { n: number; x: number; y: number }[];
  created_at: string;
};

export async function getRooms(): Promise<Room[]> {
  try {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) return [];
    return (data as Room[]) || [];
  } catch {
    return [];
  }
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  try {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) return null;
    return data as Room;
  } catch {
    return null;
  }
}