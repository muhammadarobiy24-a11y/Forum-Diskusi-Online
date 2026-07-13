import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "@/services/comment.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useComments(postId: string) {
  return useQuery({
    queryKey: queryKeys.comments(postId),
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });
}
