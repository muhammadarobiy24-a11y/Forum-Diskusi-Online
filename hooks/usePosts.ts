import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/services/post.service";
import { queryKeys } from "@/lib/constants/query-keys";
import type { PostSort } from "@/types/post";

interface UsePostsParams {
  page: number;
  category?: string;
  search?: string;
  sort?: PostSort;
  limit?: number;
}

export function usePosts({ page, category, search, sort, limit = 10 }: UsePostsParams) {
  return useQuery({
    queryKey: queryKeys.posts({ page, category, search, sort, limit }),
    queryFn: () => fetchPosts({ page, limit, category, search, sort }),
    placeholderData: (prev) => prev,
  });
}
