import { useQuery } from "@tanstack/react-query";
import { fetchLikeCount } from "@/services/like.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useLikeCount(postId: string) {
  return useQuery({
    queryKey: queryKeys.likes(postId),
    queryFn: () => fetchLikeCount(postId),
    enabled: !!postId,
  });
}
