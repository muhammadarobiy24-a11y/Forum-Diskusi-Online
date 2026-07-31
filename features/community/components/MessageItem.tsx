"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { MessageSquare, ExternalLink } from "lucide-react";
import type { Post } from "@/types/post";
import LikeButton from "@/components/like/LikeButton";
import BookmarkButton from "@/components/bookmark/BookmarkButton";
import { useLikeStatus } from "@/hooks/useLikeStatus";
import { useBookmarkStatus } from "@/hooks/useBookmarkStatus";
import { useSession } from "@/components/providers/SessionProvider";

interface MessageItemProps {
  post: Post;
}

export default function MessageItem({ post }: MessageItemProps) {
  const { user } = useSession();
  const { data: isLiked } = useLikeStatus(user?.id, post.id);
  const { data: isBookmarked } = useBookmarkStatus(user?.id, post.id);

  return (
    <div 
      className="flex gap-4 p-4 rounded-[24px] transition-all duration-300 group relative border border-transparent hover:border-white/5"
      style={{
        background: "transparent", // default transparent
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        e.currentTarget.style.backdropFilter = "blur(10px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.backdropFilter = "none";
      }}
    >
      {/* Quick Action Toolbar on Hover */}
      <div 
        className="absolute right-4 -top-4 hidden group-hover:flex items-center gap-1.5 px-2 py-1.5 rounded-xl shadow-lg z-10 animate-in fade-in slide-in-from-bottom-1"
        style={{
          background: "rgba(20,20,30,0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <LikeButton postId={post.id} isLiked={!!isLiked} likeCount={post.like_count} />
        <BookmarkButton postId={post.id} isBookmarked={!!isBookmarked} />
        
        <Link
          href={`/post/${post.id}`}
          className="p-1.5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
          title="Buka detail & komentar"
        >
          <MessageSquare className="h-4 w-4" />
          {post.comment_count > 0 && <span>{post.comment_count}</span>}
        </Link>

        <Link
          href={`/post/${post.id}`}
          className="p-1.5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-colors"
          title="Detail Thread"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      {/* Avatar */}
      <div className="h-12 w-12 shrink-0 mt-1">
        <div 
          className="h-full w-full rounded-2xl overflow-hidden shadow-md flex items-center justify-center text-lg font-bold"
          style={{
            background: post.author.avatar_url ? `url(${post.author.avatar_url}) center/cover` : "linear-gradient(135deg, #7c3aed, #3b82f6)",
            color: "white"
          }}
        >
          {!post.author.avatar_url && post.author.username.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[15px] text-white/90 hover:text-white cursor-pointer transition-colors">
            {post.author.username}
          </span>
          <span className="text-[11px] font-medium text-white/40">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: id })}
          </span>
        </div>

        {/* Message body */}
        <div className="text-white/80 whitespace-pre-wrap mt-1 leading-relaxed text-[15px]">
          {post.content}
        </div>

        {/* Comment footer pill if comments exist */}
        {post.comment_count > 0 && (
          <Link
            href={`/post/${post.id}`}
            className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(124,58,237,0.1)",
              color: "rgba(167,139,250,1)",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{post.comment_count} balasan</span>
          </Link>
        )}
      </div>
    </div>
  );
}
