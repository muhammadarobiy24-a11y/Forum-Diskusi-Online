import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleUserBookmark } from "@/services/bookmark.service";
import { QUERY_KEYS, queryKeys } from "@/lib/constants/query-keys";

export function useToggleBookmark(userId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => {
      if (!userId) throw new Error("Anda harus login.");
      return toggleUserBookmark(userId, postId);
    },
    onMutate: async (postId) => {
      if (!userId) return {};

      await queryClient.cancelQueries({ queryKey: queryKeys.bookmark(postId) });

      const previousBookmarkStatus = queryClient.getQueryData<boolean>(queryKeys.bookmark(postId));

      queryClient.setQueryData<boolean>(queryKeys.bookmark(postId), !previousBookmarkStatus);

      return { previousBookmarkStatus };
    },
    onError: (error, postId, context) => {
      if (context?.previousBookmarkStatus !== undefined) {
        queryClient.setQueryData<boolean>(queryKeys.bookmark(postId), context.previousBookmarkStatus);
      }
      toast.error(error.message || "Gagal mengubah bookmark.");
    },
    onSettled: (data, error, postId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.bookmarks });
      queryClient.invalidateQueries({ queryKey: queryKeys.bookmark(postId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts() });
      queryClient.invalidateQueries({ queryKey: queryKeys.post(postId) });

      if (!error) {
        toast.success(data?.bookmarked ? "Bookmark ditambahkan." : "Bookmark dihapus.");
      }
    },
  });
}
