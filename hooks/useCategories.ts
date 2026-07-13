import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/category.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useCategories(search?: string) {
  return useQuery({
    queryKey: queryKeys.categories(search),
    queryFn: () => fetchCategories(search),
    placeholderData: (prev) => prev,
  });
}
