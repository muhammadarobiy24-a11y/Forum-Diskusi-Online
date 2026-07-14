import { createClient } from "@/lib/supabase/client";
import type { Bookmark, GetBookmarksParams, GetBookmarksResponse } from "@/types/bookmark";

export async function getBookmarks({
  userId,
  page,
  limit,
  search,
  sort = "newest",
}: GetBookmarksParams): Promise<GetBookmarksResponse> {
  const supabase = createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("bookmarks")
    .select(
      `
      *,
      post:posts(
        id,
        title,
        content,
        views,
        created_at,
        author:profiles(
          id,
          username,
          avatar_url
        ),
        category:categories(
          id,
          name,
          slug
        ),
        comments(count),
        likes(count)
      )
    `,
      { count: "exact" }
    )
    .eq("user_id", userId);

  if (search) {
    query = query.or(`post.title.ilike.%${search}%,post.author.username.ilike.%${search}%,post.category.name.ilike.%${search}%`);
  }

  switch (sort) {
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "most_viewed":
      query = query.order("post.views", { ascending: false });
      break;
    case "most_commented":
      query = query.order("created_at", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw error;

  let bookmarks = (data as Bookmark[]) || [];

  if (sort === "most_commented") {
    bookmarks = bookmarks.sort((a, b) => {
      const aCount = a.post?.comments?.[0]?.count ?? 0;
      const bCount = b.post?.comments?.[0]?.count ?? 0;
      return bCount - aCount;
    });
  }

  const totalCount = count || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const startItem = totalCount > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, totalCount);

  return {
    bookmarks,
    pagination: {
      page,
      limit,
      total: totalCount,
      totalPages,
      startItem,
      endItem,
    },
  };
}

export async function isBookmarked(userId: string, postId: string): Promise<boolean> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("post_id", postId)
    .maybeSingle();

  if (error) throw error;

  return data !== null;
}

export async function toggleBookmark(userId: string, postId: string): Promise<{ bookmarked: boolean }> {
  const supabase = createClient();

  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("post_id", postId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", existing.id);

    if (error) throw error;
    return { bookmarked: false };
  }

  const { error } = await supabase
    .from("bookmarks")
    .insert({ user_id: userId, post_id: postId });

  if (error) throw error;
  return { bookmarked: true };
}

export async function removeBookmark(id: string, userId: string): Promise<void> {
  const supabase = createClient();

  const { error, count } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) throw error;

  if (count === 0) {
    throw new Error("Bookmark tidak ditemukan atau Anda tidak memiliki akses.");
  }
}
