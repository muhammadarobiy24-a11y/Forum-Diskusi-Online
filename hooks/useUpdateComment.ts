import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editComment } from "@/services/comment.service";
import { queryKeys } from "@/lib/constants/query-keys";
import type { UpdateCommentInput } from "@/types/comment";

export function useUpdateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateCommentInput) => editComment(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments(postId) });
      toast.success("Komentar berhasil diperbarui.");
    },
    onError: () => {
      toast.error("Gagal memperbarui komentar.");
    },
  });
}
