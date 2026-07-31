"use client";

import Link from "next/link";
import { Eye, Clock, ArrowLeft, Pencil, MessageCircle } from "lucide-react";
import { formatDate } from "@/lib/utils/date";
import { useSession } from "@/components/providers/SessionProvider";
import { useLikeStatus } from "@/hooks/useLikeStatus";
import { useBookmarkStatus } from "@/hooks/useBookmarkStatus";
import LikeButton from "@/components/like/LikeButton";
import BookmarkButton from "@/components/bookmark/BookmarkButton";
import DeletePostButton from "./DeletePostButton";
import { renderMarkdownMedia } from "@/lib/utils/markdown";
import type { Post } from "@/types/post";

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const { user } = useSession();
  const { data: isLiked } = useLikeStatus(user?.id, post.id);
  const { data: isBookmarked } = useBookmarkStatus(user?.id, post.id);
  const initials = (post.author?.username || "A").slice(0, 2).toUpperCase();
  const isAuthor = user?.id === post.author?.id;

  return (
    <article className="space-y-8">
      {/* Back link */}
      <Link
        href="/post"
        className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Link>

      {/* Main Glass Panel */}
      <div 
        className="p-6 md:p-8 rounded-[32px]"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="space-y-8">
          
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <h1 className="text-3xl md:text-4xl font-black text-white/95 leading-tight">
                {post.title}
              </h1>
              {post.category && (
                <span 
                  className="shrink-0 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {post.category.name}
                </span>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Author & Meta */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-white/50">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", color: "white" }}
                  >
                    {initials}
                  </div>
                  <span className="font-bold text-white/90">
                    {post.author?.username || "Anonymous"}
                  </span>
                </div>
                
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 hidden md:block" />
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    <span>{post.views}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {isAuthor && (
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/post/${post.id}/edit`}>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors border border-white/10">
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                  </Link>
                  <DeletePostButton postId={post.id} />
                </div>
              )}
            </div>
          </div>

          <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.05)" }} />

          {/* Content */}
          <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-white/80 prose-a:text-violet-400 prose-strong:text-white">
            <div className="whitespace-pre-wrap text-[15px] md:text-base font-medium">
              {renderMarkdownMedia(post.content)}
            </div>
          </div>

          <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.05)" }} />

          {/* Bottom Actions */}
          <div className="flex items-center gap-3">
            <LikeButton
              postId={post.id}
              isLiked={isLiked ?? false}
              likeCount={post.like_count}
            />
            <BookmarkButton
              postId={post.id}
              isBookmarked={isBookmarked ?? false}
            />
          </div>

        </div>
      </div>
    </article>
  );
}
