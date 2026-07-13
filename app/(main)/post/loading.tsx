import PostSkeleton from "@/components/post/PostSkeleton";

export default function PostsLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <div className="h-8 w-32 bg-muted animate-pulse rounded" />
        <div className="h-4 w-64 bg-muted animate-pulse rounded mt-2" />
      </div>
      <PostSkeleton />
    </div>
  );
}
