import { createClient } from "@/lib/supabase/client";
import type { Category } from "@/types";

interface GetCategoriesParams {
  search?: string;
}

export async function getCategories({ search }: GetCategoriesParams = {}): Promise<Category[]> {
  const supabase = createClient();

  let query = supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return (data as Category[]) || [];
}
