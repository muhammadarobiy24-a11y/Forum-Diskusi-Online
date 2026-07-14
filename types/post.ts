export interface PostAuthor {
  id: string;
  username: string;
  avatar_url: string | null;
}

export interface PostCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  views: number;
  status: string;
  created_at: string;
  author: PostAuthor;
  category: PostCategory;
  comment_count: number;
  like_count: number;
}

export type PostSort = "newest" | "oldest" | "most_viewed" | "most_commented";

export interface GetPostsParams {
  page: number;
  limit: number;
  category?: string;
  search?: string;
  sort?: PostSort;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  startItem: number;
  endItem: number;
}

export interface GetPostsResponse {
  posts: Post[];
  pagination: PaginationMeta;
}

export interface CreatePostInput {
  title: string;
  categoryId: string;
  content: string;
}

export interface UpdatePostInput {
  id: string;
  title: string;
  categoryId: string;
  content: string;
}
