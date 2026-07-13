import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { removePost } from "@/services/post.service";
import { QUERY_KEYS } from "@/lib/constants/query-keys";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => removePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts });
      toast.success("Postingan berhasil dihapus.");
      router.push("/post");
    },
    onError: (error) => {
      toast.error(error.message || "Gagal menghapus postingan.");
    },
  });
}
