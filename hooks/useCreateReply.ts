import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addReply } from "@/services/comment.service";
import { queryKeys } from "@/lib/constants/query-keys";
import type { CreateReplyInput } from "@/types/comment";

export function useCreateReply(parentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Omit<CreateReplyInput, "parentId">) =>
      addReply({ parentId, ...input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.replies(parentId) });
      toast.success("Balasan berhasil ditambahkan.");
    },
    onError: () => {
      toast.error("Gagal menambahkan balasan.");
    },
  });
}
