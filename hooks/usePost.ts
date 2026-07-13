import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "@/services/post.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function usePost(id: string) {
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });
}
