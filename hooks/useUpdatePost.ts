import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { editPost } from "@/services/post.service";
import { QUERY_KEYS, queryKeys } from "@/lib/constants/query-keys";
import type { UpdatePostInput } from "@/types/post";

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: UpdatePostInput) => editPost(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts });
      queryClient.invalidateQueries({ queryKey: queryKeys.post(data.id) });
      toast.success("Postingan berhasil diperbarui.");
      router.push(`/post/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message || "Gagal memperbarui postingan.");
    },
  });
}
