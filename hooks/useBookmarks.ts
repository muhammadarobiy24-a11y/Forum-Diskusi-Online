import { useQuery } from "@tanstack/react-query";
import { fetchBookmarks } from "@/services/bookmark.service";
import { queryKeys } from "@/lib/constants/query-keys";
import type { BookmarkSort } from "@/types/bookmark";

interface UseBookmarksParams {
  userId: string;
  page?: number;
  limit?: number;
  search?: string;
  sort?: BookmarkSort;
}

export function useBookmarks({
  userId,
  page = 1,
  limit = 10,
  search,
  sort = "newest",
}: UseBookmarksParams) {
  return useQuery({
    queryKey: queryKeys.bookmarks(userId, { page, limit, search, sort }),
    queryFn: () => fetchBookmarks({ userId, page, limit, search, sort }),
    enabled: !!userId,
    placeholderData: (prev) => prev,
  });
}
