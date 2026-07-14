export interface Bookmark {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
  post?: {
    id: string;
    title: string;
    content: string;
    views: number;
    created_at: string;
    author: {
      id: string;
      username: string;
      avatar_url: string | null;
    };
    category: {
      id: string;
      name: string;
      slug: string;
    };
    comments?: { count: number }[];
    likes?: { count: number }[];
  };
}

export type BookmarkSort = "newest" | "oldest" | "most_viewed" | "most_commented";

export interface GetBookmarksParams {
  userId: string;
  page: number;
  limit: number;
  search?: string;
  sort?: BookmarkSort;
}

export interface GetBookmarksResponse {
  bookmarks: Bookmark[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    startItem: number;
    endItem: number;
  };
}
