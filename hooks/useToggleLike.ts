import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleUserLike } from "@/services/like.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useToggleLike(userId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => {
      if (!userId) throw new Error("Anda harus login.");
      return toggleUserLike(userId, postId);
    },
    onMutate: async (postId) => {
      if (!userId) return {};

      await queryClient.cancelQueries({ queryKey: queryKeys.like(postId) });
      await queryClient.cancelQueries({ queryKey: queryKeys.likes(postId) });

      const previousLikeStatus = queryClient.getQueryData<boolean>(queryKeys.like(postId));
      const previousLikeCount = queryClient.getQueryData<{ count: number }>(queryKeys.likes(postId));

      queryClient.setQueryData<boolean>(queryKeys.like(postId), !previousLikeStatus);
      queryClient.setQueryData<{ count: number }>(queryKeys.likes(postId), {
        count: (previousLikeCount?.count ?? 0) + (previousLikeStatus ? -1 : 1),
      });

      return { previousLikeStatus, previousLikeCount };
    },
    onError: (error, postId, context) => {
      if (context?.previousLikeStatus !== undefined) {
        queryClient.setQueryData<boolean>(queryKeys.like(postId), context.previousLikeStatus);
      }
      if (context?.previousLikeCount !== undefined) {
        queryClient.setQueryData<{ count: number }>(queryKeys.likes(postId), context.previousLikeCount);
      }
      toast.error(error.message || "Gagal mengubah like.");
    },
    onSettled: (data, error, postId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.like(postId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.likes(postId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts() });
      queryClient.invalidateQueries({ queryKey: queryKeys.post(postId) });

      if (!error) {
        toast.success(data?.liked ? "Like ditambahkan." : "Like dihapus.");
      }
    },
  });
}
