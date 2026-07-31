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
      const hasIncremented = sessionStorage.getItem(`post-viewed-${post.id}`);
      if (!hasIncremented) {
        increasePostViews(post.id);
        sessionStorage.setItem(`post-viewed-${post.id}`, "true");
      }
    }
  }, [post?.id]);

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <ChannelHeader channelName="diskusi" channelDescription="Baca dan bagikan pendapat Anda" />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 space-y-12">
          
          {isLoading ? (
            <PostDetailSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-16 w-16 mb-6 rounded-3xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Terjadi Kesalahan</h2>
              <p className="text-white/50 mb-6">Gagal memuat postingan.</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10"
              >
                Coba Lagi
              </button>
            </div>
          ) : !post ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-16 w-16 mb-6 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10">
                <AlertTriangle className="h-8 w-8 text-white/30" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Postingan tidak ditemukan</h2>
              <p className="text-white/50">Postingan yang Anda cari tidak ada atau telah dihapus.</p>
            </div>
          ) : (
            <div className="space-y-12 pb-20">
              <PostDetail post={post} />

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-white/90">Komentar</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    {post.comment_count}
                  </span>
                </div>

                {user ? (
                  <CommentForm postId={post.id} />
                ) : (
                  <div className="p-6 rounded-[20px] text-center bg-white/5 border border-white/10 backdrop-blur-md">
                    <p className="text-sm font-medium text-white/50">
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
