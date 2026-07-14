import { getBookmarks, isBookmarked, toggleBookmark, removeBookmark } from "@/repositories/bookmark.repository";
import type { GetBookmarksParams, GetBookmarksResponse } from "@/types/bookmark";

export async function fetchBookmarks(params: GetBookmarksParams): Promise<GetBookmarksResponse> {
  return getBookmarks(params);
}

export async function checkBookmark(userId: string, postId: string): Promise<boolean> {
  return isBookmarked(userId, postId);
}

export async function toggleUserBookmark(userId: string, postId: string): Promise<{ bookmarked: boolean }> {
  return toggleBookmark(userId, postId);
}

export async function deleteBookmark(id: string, userId: string): Promise<void> {
  return removeBookmark(id, userId);
}
