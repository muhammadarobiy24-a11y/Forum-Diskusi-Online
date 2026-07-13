import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeComment } from "@/services/comment.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments(postId) });
      toast.success("Komentar berhasil dihapus.");
    },
    onError: () => {
      toast.error("Gagal menghapus komentar.");
    },
  });
}
