import { useQuery } from "@tanstack/react-query";
import { fetchReplies } from "@/services/comment.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useReplies(commentId: string) {
  return useQuery({
    queryKey: queryKeys.replies(commentId),
    queryFn: () => fetchReplies(commentId),
    enabled: !!commentId,
  });
}
