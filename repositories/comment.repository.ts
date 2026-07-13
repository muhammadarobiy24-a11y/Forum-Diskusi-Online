import { createClient } from "@/lib/supabase/client";
import type { Comment, Reply, CommentAuthor, CreateCommentInput, UpdateCommentInput, CreateReplyInput } from "@/types/comment";

interface SupabaseComment {
  id: string;
  content: string;
  created_at: string;
  author: CommentAuthor[] | CommentAuthor;
}

function mapComment(item: SupabaseComment): Comment {
  return {
    id: item.id,
    content: item.content,
    created_at: item.created_at,
    author: Array.isArray(item.author) ? item.author[0] : item.author,
  };
}

export async function createComment(input: CreateCommentInput): Promise<Comment> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anda harus login.");
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: input.postId,
      author_id: user.id,
      content: input.content.trim(),
      parent_id: null,
    })
    .select(
      `
      id,
      content,
      created_at,
      author:profiles(
        id,
        username,
        avatar_url
      )
    `
    )
    .single();

  if (error) throw error;

  return mapComment(data as SupabaseComment);
}

export async function updateComment(input: UpdateCommentInput): Promise<Comment> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anda harus login.");
  }

  const { data, error } = await supabase
    .from("comments")
    .update({
      content: input.content.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.id)
    .eq("author_id", user.id)
    .select(
      `
      id,
      content,
      created_at,
      author:profiles(
        id,
        username,
        avatar_url
      )
    `
    )
    .single();

  if (error) {
    throw new Error("Komentar tidak ditemukan atau Anda tidak memiliki akses.");
  }

  return mapComment(data as SupabaseComment);
}

export async function deleteComment(id: string): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anda harus login.");
  }

  const { error, count } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .eq("author_id", user.id);

  if (error) throw error;

  if (count === 0) {
    throw new Error("Komentar tidak ditemukan atau Anda tidak memiliki akses.");
  }
}

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      content,
      created_at,
      author:profiles(
        id,
        username,
        avatar_url
      )
    `
    )
    .eq("post_id", postId)
    .is("parent_id", null)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data as SupabaseComment[] || []).map(mapComment);
}

export async function getReplies(parentId: string): Promise<Reply[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      content,
      created_at,
      author:profiles(
        id,
        username,
        avatar_url
      )
    `
    )
    .eq("parent_id", parentId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return (data as SupabaseComment[] || []).map(mapComment) as Reply[];
}

export async function createReply(input: CreateReplyInput): Promise<Reply> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anda harus login.");
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: input.postId,
      parent_id: input.parentId,
      author_id: user.id,
      content: input.content.trim(),
    })
    .select(
      `
      id,
      content,
      created_at,
      author:profiles(
        id,
        username,
        avatar_url
      )
    `
    )
    .single();

  if (error) throw error;

  return mapComment(data as SupabaseComment) as Reply;
}
