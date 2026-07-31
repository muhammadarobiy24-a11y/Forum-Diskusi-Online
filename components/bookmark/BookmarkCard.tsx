"use client";

import Link from "next/link";
import { Eye, Clock, MessageCircle } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils/date";
import { useSession } from "@/components/providers/SessionProvider";
import { useLikeStatus } from "@/hooks/useLikeStatus";
import LikeButton from "@/components/like/LikeButton";
import BookmarkButton from "@/components/bookmark/BookmarkButton";
import type { Bookmark } from "@/types/bookmark";

const CARD_STYLES = [
  { bg: "#ffffff",  border: "#e8e6f0" },
  { bg: "#f0edff",  border: "#d4caff" },
  { bg: "#fff4ed",  border: "#ffd5b4" },
  { bg: "#edf6ff",  border: "#b3d9ff" },
  { bg: "#edfff5",  border: "#b6f5d3" },
];

function getStyle(id: string) {
  const sum = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return CARD_STYLES[sum % CARD_STYLES.length];
}

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const { user } = useSession();
  const post = bookmark.post;
  const { data: isLiked } = useLikeStatus(user?.id, post?.id || "");

  if (!post) return null;

  const style = getStyle(post.id);

  return (
    <Link href={`/post/${post.id}`} className="block w-full">
      <div
        className="group flex flex-col p-5 rounded-[28px] transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: style.bg,
          border: `1px solid ${style.border}`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {/* Title + category */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h2 className="text-base font-bold text-[var(--forum-text-primary)] leading-snug line-clamp-2 flex-1">
            {post.title}
          </h2>
          {post.category && (
            <span className="shrink-0 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-full"
              style={{ background: "#ede9fe", color: "#6d28d9", border: "1px solid #d4caff" }}>
              {post.category.name}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t"
          style={{ borderColor: style.border }}>
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
              {(post.author?.username || "A").substring(0, 2).toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-[var(--forum-text-secondary)] truncate">
              {post.author?.username || "Anonymous"}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
            <div className="flex items-center gap-1 text-xs text-[var(--forum-text-muted)] shrink-0">
              <Clock className="h-3 w-3" />
              <span>{formatRelativeDate(post.created_at)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-3 px-3 py-1 rounded-xl"
              style={{ background: "rgba(0,0,0,0.05)" }}>
              <div className="flex items-center gap-1 text-xs font-medium text-[var(--forum-text-muted)]" title="Views">
                <Eye className="h-3.5 w-3.5" /><span>{post.views}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-[var(--forum-text-muted)]" title="Komentar">
                <MessageCircle className="h-3.5 w-3.5" /><span>{post.comments?.[0]?.count ?? 0}</span>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <LikeButton postId={post.id} isLiked={isLiked ?? false} likeCount={post.likes?.[0]?.count ?? 0} />
              <BookmarkButton postId={post.id} isBookmarked={true} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
