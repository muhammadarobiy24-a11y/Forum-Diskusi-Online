import { getCommentsByPostId, createComment, updateComment, deleteComment, getReplies, createReply } from "@/repositories/comment.repository";
import type { Comment, Reply, CreateCommentInput, UpdateCommentInput, CreateReplyInput } from "@/types/comment";

export async function fetchComments(postId: string): Promise<Comment[]> {
  return getCommentsByPostId(postId);
}

export async function addComment(input: CreateCommentInput): Promise<Comment> {
  return createComment(input);
}

export async function editComment(input: UpdateCommentInput): Promise<Comment> {
  return updateComment(input);
}

export async function removeComment(id: string): Promise<void> {
  return deleteComment(id);
}

export async function fetchReplies(parentId: string): Promise<Reply[]> {
  return getReplies(parentId);
}

export async function addReply(input: CreateReplyInput): Promise<Reply> {
  return createReply(input);
}
