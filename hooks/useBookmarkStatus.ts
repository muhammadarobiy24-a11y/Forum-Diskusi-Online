import { useQuery } from "@tanstack/react-query";
import { checkBookmark } from "@/services/bookmark.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useBookmarkStatus(userId: string | undefined, postId: string) {
  return useQuery({
    queryKey: queryKeys.bookmark(postId),
    queryFn: () => checkBookmark(userId!, postId),
    enabled: !!userId && !!postId,
  });
}
