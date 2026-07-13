import { getPosts, getPostById, incrementPostViews, createPost, updatePost, deletePost } from "@/repositories/post.repository";
import type { Post, CreatePostInput, UpdatePostInput, GetPostsParams, GetPostsResponse } from "@/types/post";

export async function fetchPosts(params: GetPostsParams): Promise<GetPostsResponse> {
  return getPosts(params);
}

export async function fetchPost(id: string): Promise<Post | null> {
  return getPostById(id);
}

export async function increasePostViews(id: string): Promise<void> {
  return incrementPostViews(id);
}

export async function addPost(input: CreatePostInput): Promise<Post> {
  return createPost(input);
}

export async function editPost(input: UpdatePostInput): Promise<Post> {
  return updatePost(input);
}

export async function removePost(id: string): Promise<void> {
  return deletePost(id);
}
