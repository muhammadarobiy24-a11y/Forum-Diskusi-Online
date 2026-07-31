"use client";

import Link from "next/link";
import { Eye, Clock, MessageCircle } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils/date";
import { useSession } from "@/components/providers/SessionProvider";
import { useLikeStatus } from "@/hooks/useLikeStatus";
import { useBookmarkStatus } from "@/hooks/useBookmarkStatus";
import LikeButton from "@/components/like/LikeButton";
import BookmarkButton from "@/components/bookmark/BookmarkButton";
import { stripMarkdown } from "@/lib/utils/markdown";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { user } = useSession();
  const { data: isLiked } = useLikeStatus(user?.id, post.id);
  const { data: isBookmarked } = useBookmarkStatus(user?.id, post.id);

  const strippedContent = stripMarkdown(post.content);
  const contentPreview =
    strippedContent.length > 200
      ? strippedContent.substring(0, 200) + "..."
      : strippedContent;

  return (
    <Link href={`/post/${post.id}`} className="block w-full">
      <div 
        className="group relative flex flex-col p-5 md:p-6 rounded-[24px] transition-all duration-500 hover:-translate-y-1"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at top right, rgba(124,58,237,0.1), transparent 60%)",
            border: "1px solid rgba(167,139,250,0.3)",
          }}
        />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-white/95 leading-snug group-hover:text-white transition-colors line-clamp-2">
              {post.title}
            </h2>
            {post.category && (
              <span 
                className="shrink-0 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {post.category.name}
              </span>
            )}
          </div>

          {/* Body */}
          <p className="text-sm md:text-base text-white/60 leading-relaxed line-clamp-3">
            {contentPreview}
          </p>

          {/* Footer (Meta) */}
          <div className="mt-2 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/5">
            
            {/* Author & Time */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div 
                  className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", color: "white" }}
                >
                  {(post.author?.username || "A").substring(0, 2).toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-white/80">
                  {post.author?.username || "Anonymous"}
                </span>
              </div>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1.5 text-xs font-medium text-white/40">
                <Clock className="h-3.5 w-3.5" />
                <span>{formatRelativeDate(post.created_at)}</span>
              </div>
            </div>

            {/* Actions & Stats */}
            <div className="flex items-center gap-2">
              <div 
                className="flex items-center gap-4 px-4 py-1.5 rounded-2xl"
                style={{ background: "rgba(0,0,0,0.2)" }}
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white/50" title="Views">
                  <Eye className="h-4 w-4" />
                  <span>{post.views}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white/50" title="Comments">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comment_count}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
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
        </div>
      </div>
    </Link>
  );
}
