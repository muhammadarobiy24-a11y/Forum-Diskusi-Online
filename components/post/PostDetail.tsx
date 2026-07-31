"use client";

import Link from "next/link";
import { Eye, Clock, ArrowLeft, Pencil } from "lucide-react";
import { formatDate } from "@/lib/utils/date";
import { useSession } from "@/components/providers/SessionProvider";
import { useLikeStatus } from "@/hooks/useLikeStatus";
import { useBookmarkStatus } from "@/hooks/useBookmarkStatus";
import LikeButton from "@/components/like/LikeButton";
import BookmarkButton from "@/components/bookmark/BookmarkButton";
import DeletePostButton from "./DeletePostButton";
import { renderMarkdownMedia } from "@/lib/utils/markdown";
import type { Post } from "@/types/post";

export default function PostDetail({ post }: { post: Post }) {
  const { user } = useSession();
  const { data: isLiked } = useLikeStatus(user?.id, post.id);
  const { data: isBookmarked } = useBookmarkStatus(user?.id, post.id);
  const initials = (post.author?.username || "A").slice(0, 2).toUpperCase();
  const isAuthor = user?.id === post.author?.id;

  return (
    <article className="space-y-5">
      {/* Back link */}
      <Link href="/post"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--forum-text-muted)] hover:text-[var(--forum-text-primary)] transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Link>

      {/* Main card */}
      <div className="rounded-[28px] p-6 md:p-8"
        style={{ background: "#ffffff", border: "1px solid #e8e6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <div className="space-y-6">

          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <h1 className="text-2xl md:text-3xl font-black text-[var(--forum-text-primary)] leading-tight">
                {post.title}
              </h1>
              {post.category && (
                <span className="shrink-0 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full self-start"
                  style={{ background: "#ede9fe", color: "#6d28d9", border: "1px solid #d4caff" }}>
                  {post.category.name}
                </span>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Author & Meta */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-[var(--forum-text-muted)]">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
                    {initials}
                  </div>
                  <span className="font-bold text-[var(--forum-text-primary)]">
                    {post.author?.username || "Anonymous"}
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 hidden md:block" />
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /><span>{formatDate(post.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" /><span>{post.views}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {isAuthor && (
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/post/${post.id}/edit`}>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full text-[var(--forum-text-secondary)] hover:text-violet-600 hover:bg-violet-50 transition-colors border border-gray-200">
                      <Pencil className="h-3.5 w-3.5" />Edit
                    </button>
                  </Link>
                  <DeletePostButton postId={post.id} />
                </div>
              )}
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Content */}
          <div className="prose max-w-none text-[var(--forum-text-primary)]">
            <div className="whitespace-pre-wrap text-[15px] md:text-base leading-relaxed text-[var(--forum-text-secondary)]">
              {renderMarkdownMedia(post.content)}
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Bottom Actions */}
          <div className="flex items-center gap-3">
            <LikeButton postId={post.id} isLiked={isLiked ?? false} likeCount={post.like_count} />
            <BookmarkButton postId={post.id} isBookmarked={isBookmarked ?? false} />
          </div>
        </div>
      </div>
    </article>
  );
}
