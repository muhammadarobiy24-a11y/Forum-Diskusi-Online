import { createClient } from "@/lib/supabase/client";
import type { Post, PostAuthor, PostCategory, CreatePostInput, UpdatePostInput, GetPostsParams, GetPostsResponse } from "@/types/post";

const DEFAULT_LIMIT = 10;

interface SupabasePost {
  id: string;
  title: string;
  content: string;
  views: number;
  status: string;
  created_at: string;
  author: PostAuthor[] | PostAuthor;
  category: PostCategory[] | PostCategory;
  comments?: { count: number }[];
}

function mapPost(item: SupabasePost): Post {
  return {
    id: item.id,
    title: item.title,
    content: item.content,
    views: item.views,
    status: item.status,
    created_at: item.created_at,
    author: Array.isArray(item.author) ? item.author[0] : item.author,
    category: Array.isArray(item.category) ? item.category[0] : item.category,
    comment_count: item.comments?.[0]?.count ?? 0,
  };
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anda harus login.");
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({
      author_id: user.id,
      category_id: input.categoryId,
      title: input.title,
      content: input.content,
      status: "published",
    })
    .select()
    .single();

  if (error) throw error;

  return data as Post;
}

export async function updatePost(input: UpdatePostInput): Promise<Post> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anda harus login.");
  }

  const { data: existingPost } = await supabase
    .from("posts")
    .select("author_id")
    .eq("id", input.id)
    .single();

  if (!existingPost) {
    throw new Error("Postingan tidak ditemukan.");
  }

  if (existingPost.author_id !== user.id) {
    throw new Error("Anda tidak memiliki akses.");
  }

  const { data, error } = await supabase
    .from("posts")
    .update({
      title: input.title.trim(),
      category_id: input.categoryId,
      content: input.content.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.id)
    .eq("author_id", user.id)
    .select()
    .single();

  if (error) throw error;

  return data as Post;
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
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
      comments(count)
    `
    )
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return mapPost(data as SupabasePost);
}

export async function incrementPostViews(id: string): Promise<void> {
  const supabase = createClient();

  const { data } = await supabase
    .from("posts")
    .select("views")
    .eq("id", id)
    .single();

  if (data) {
    await supabase
      .from("posts")
      .update({ views: data.views + 1 })
      .eq("id", id);
  }
}

export async function deletePost(id: string): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anda harus login.");
  }

  const { error, count } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .eq("author_id", user.id);

  if (error) throw error;

  if (count === 0) {
    throw new Error("Postingan tidak ditemukan atau Anda tidak memiliki akses.");
  }
}

export async function getPosts({
  page,
  limit = DEFAULT_LIMIT,
  category,
  search,
  sort = "newest",
}: GetPostsParams): Promise<GetPostsResponse> {
  const supabase = createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let categoryId: string | null = null;

  if (category) {
    const { data: categoryData } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", category)
      .single();

    if (categoryData) {
      categoryId = categoryData.id;
    }
  }

  let query = supabase
    .from("posts")
    .select(
      `
      *,
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
      comments(count)
    `,
      { count: "exact" }
    )
    .eq("status", "published");

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  switch (sort) {
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "most_viewed":
      query = query.order("views", { ascending: false });
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

  let posts = (data as SupabasePost[] || []).map(mapPost);

  if (sort === "most_commented") {
    posts = posts.sort((a, b) => b.comment_count - a.comment_count);
  }

  const totalCount = count || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const startItem = totalCount > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, totalCount);

  return {
    posts,
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
