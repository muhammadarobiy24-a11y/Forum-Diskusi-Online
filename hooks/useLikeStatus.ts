import { useQuery } from "@tanstack/react-query";
import { checkLike } from "@/services/like.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useLikeStatus(userId: string | undefined, postId: string) {
  return useQuery({
    queryKey: queryKeys.like(postId),
    queryFn: () => checkLike(userId!, postId),
    enabled: !!userId && !!postId,
  });
}
