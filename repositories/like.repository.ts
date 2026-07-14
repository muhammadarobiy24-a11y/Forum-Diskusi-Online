import { createClient } from "@/lib/supabase/client";
import type { Like, GetLikeCountResponse } from "@/types/like";

export async function getLikeCount(postId: string): Promise<GetLikeCountResponse> {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("likes")
    .select("id", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) throw error;

  return { count: count || 0 };
}

export async function isLiked(userId: string, postId: string): Promise<boolean> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", userId)
    .eq("post_id", postId)
    .maybeSingle();

  if (error) throw error;

  return data !== null;
}

export async function toggleLike(userId: string, postId: string): Promise<{ liked: boolean }> {
  const supabase = createClient();

  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", userId)
    .eq("post_id", postId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("id", existing.id);

    if (error) throw error;
    return { liked: false };
  }

  const { error } = await supabase
    .from("likes")
    .insert({ user_id: userId, post_id: postId });

  if (error) throw error;
  return { liked: true };
}

export async function getLikes(postId: string): Promise<Like[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data as Like[]) || [];
}
