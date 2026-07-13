export const QUERY_KEYS = {
  profile: ["profile"] as const,

  categories: ["categories"] as const,
  category: ["category"] as const,

  posts: ["posts"] as const,
  post: ["post"] as const,

  comments: ["comments"] as const,
  replies: ["replies"] as const,

  adminCategories: ["admin-categories"] as const,
} as const;

export const queryKeys = {
  profile: (id: string) => [...QUERY_KEYS.profile, id] as const,

  category: (slug: string) => [...QUERY_KEYS.category, slug] as const,

  post: (id: string) => [...QUERY_KEYS.post, id] as const,

  posts: (params?: { page?: number; category?: string; limit?: number; search?: string; sort?: string }) =>
    params
      ? [...QUERY_KEYS.posts, params] as const
      : QUERY_KEYS.posts,

  categories: (search?: string) =>
    search
      ? [...QUERY_KEYS.categories, { search }] as const
      : QUERY_KEYS.categories,

  comments: (postId: string) => [...QUERY_KEYS.comments, postId] as const,

  replies: (commentId: string) => [...QUERY_KEYS.replies, commentId] as const,
};
