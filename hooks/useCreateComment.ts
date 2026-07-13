import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addComment } from "@/services/comment.service";
import { queryKeys } from "@/lib/constants/query-keys";
import type { CreateCommentInput } from "@/types/comment";

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Omit<CreateCommentInput, "postId">) =>
      addComment({ postId, ...input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments(postId) });
      toast.success("Komentar berhasil ditambahkan.");
    },
    onError: () => {
      toast.error("Gagal menambahkan komentar.");
    },
  });
}
