"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { usePost } from "@/hooks/usePost";
import { increasePostViews } from "@/services/post.service";
import PostDetail from "@/components/post/PostDetail";
import PostDetailSkeleton from "@/components/post/PostDetailSkeleton";
import CommentForm from "@/components/comment/CommentForm";
import CommentList from "@/components/comment/CommentList";
import { useSession } from "@/components/providers/SessionProvider";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PostDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useSession();

  const { data: post, isLoading, error } = usePost(id);

  useEffect(() => {
    if (post?.id) {
      const hasIncremented = sessionStorage.getItem(`post-viewed-${post.id}`);
      if (!hasIncremented) {
        increasePostViews(post.id);
        sessionStorage.setItem(`post-viewed-${post.id}`, "true");
      }
    }
  }, [post?.id]);

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold">Terjadi kesalahan</h2>
        <p className="text-muted-foreground mt-2 mb-4">
          Gagal memuat postingan.
        </p>
        <Button onClick={() => window.location.reload()}>Coba lagi</Button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">Postingan tidak ditemukan</h2>
        <p className="text-muted-foreground mt-2">
          Postingan yang Anda cari tidak ada atau telah dihapus.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PostDetail post={post} />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Komentar ({post.comment_count})</h2>

        {user ? (
          <CommentForm postId={post.id} />
        ) : (
          <p className="text-sm text-muted-foreground">
            Silakan login untuk menambahkan komentar.
          </p>
        )}
      </div>

      <CommentList postId={post.id} />
    </div>
  );
}
