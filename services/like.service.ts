import { getLikes, getLikeCount, isLiked, toggleLike } from "@/repositories/like.repository";
import type { Like, GetLikeCountResponse } from "@/types/like";

export async function fetchLikes(postId: string): Promise<Like[]> {
  return getLikes(postId);
}

export async function fetchLikeCount(postId: string): Promise<GetLikeCountResponse> {
  return getLikeCount(postId);
}

export async function checkLike(userId: string, postId: string): Promise<boolean> {
  return isLiked(userId, postId);
}

export async function toggleUserLike(userId: string, postId: string): Promise<{ liked: boolean }> {
  return toggleLike(userId, postId);
}
