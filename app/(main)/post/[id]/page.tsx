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
import ChannelHeader from "@/components/layout/discord/ChannelHeader";

export default function PostDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useSession();
  const { data: post, isLoading, error } = usePost(id);

  useEffect(() => {
    if (post?.id) {
      const seen = sessionStorage.getItem(`post-viewed-${post.id}`);
      if (!seen) { increasePostViews(post.id); sessionStorage.setItem(`post-viewed-${post.id}`, "true"); }
    }
  }, [post?.id]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChannelHeader />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6 md:px-6 space-y-6">

          {isLoading ? (
            <PostDetailSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-[28px]"
              style={{ background: "#fff0f0", border: "1px solid #fecaca" }}>
              <div className="h-16 w-16 mb-6 rounded-[24px] flex items-center justify-center"
                style={{ background: "#fee2e2", border: "1px solid #fecaca" }}>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-[var(--forum-text-primary)] mb-2">Terjadi Kesalahan</h2>
              <p className="text-sm text-[var(--forum-text-muted)] mb-6">Gagal memuat postingan.</p>
              <button onClick={() => window.location.reload()}
                className="px-6 py-2.5 rounded-full text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
                Coba Lagi
              </button>
            </div>
          ) : !post ? (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-[28px]"
              style={{ background: "#f0edff", border: "1px solid #d4caff" }}>
              <div className="h-16 w-16 mb-6 rounded-[24px] flex items-center justify-center"
                style={{ background: "#ede9fe", border: "1px solid #d4caff" }}>
                <AlertTriangle className="h-8 w-8 text-violet-400" />
              </div>
              <h2 className="text-xl font-bold text-[var(--forum-text-primary)] mb-2">Postingan tidak ditemukan</h2>
              <p className="text-sm text-[var(--forum-text-muted)]">Postingan yang Anda cari tidak ada atau telah dihapus.</p>
            </div>
          ) : (
            <div className="space-y-6 pb-12">
              <PostDetail post={post} />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-[var(--forum-text-primary)]">Komentar</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: "#ede9fe", color: "#6d28d9", border: "1px solid #d4caff" }}>
                    {post.comment_count}
                  </span>
                </div>
                {user ? (
                  <CommentForm postId={post.id} />
                ) : (
                  <div className="p-5 rounded-[24px] text-center" style={{ background: "#f0edff", border: "1px solid #d4caff" }}>
                    <p className="text-sm font-semibold text-[var(--forum-text-secondary)]">
                      Silakan login untuk ikut berdiskusi.
                    </p>
                  </div>
                )}
              </div>
              <CommentList postId={post.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
