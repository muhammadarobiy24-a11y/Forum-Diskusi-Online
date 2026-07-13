import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addPost } from "@/services/post.service";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import type { CreatePostInput } from "@/types/post";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: CreatePostInput) => addPost(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts });
      toast.success("Postingan berhasil dibuat.");
      router.push(`/post/${data.id}`);
    },
    onError: () => {
      toast.error("Gagal membuat postingan.");
    },
  });
}
