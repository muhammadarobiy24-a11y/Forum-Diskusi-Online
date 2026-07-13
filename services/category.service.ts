import { getCategories } from "@/repositories/category.repository";
import type { Category } from "@/types";

export async function fetchCategories(search?: string): Promise<Category[]> {
  return getCategories({ search });
}
