"use client";

import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";
import PostEmptyState from "./PostEmptyState";
import type { Post } from "@/types/post";

interface PostListProps {
  posts: Post[] | undefined;
  isLoading: boolean;
}

export default function PostList({ posts, isLoading }: PostListProps) {
  if (isLoading) {
    return <PostSkeleton />;
  }

  if (!posts || posts.length === 0) {
    return <PostEmptyState />;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
