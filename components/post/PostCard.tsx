"use client";

import Link from "next/link";
import { Eye, Clock, MessageCircle, Images } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils/date";
import { useSession } from "@/components/providers/SessionProvider";
import { useLikeStatus } from "@/hooks/useLikeStatus";
import { useBookmarkStatus } from "@/hooks/useBookmarkStatus";
import LikeButton from "@/components/like/LikeButton";
import BookmarkButton from "@/components/bookmark/BookmarkButton";
import { stripMarkdown } from "@/lib/utils/markdown";
import type { Post } from "@/types/post";

/* ── Pastel card palette — rotates per post ─────────────── */
const CARD_STYLES = [
  { bg: "#ffffff",  border: "#e8e6f0", hover: "#f5f3ff" },  // putih
  { bg: "#f0edff",  border: "#d4caff", hover: "#e8e3ff" },  // lavender
  { bg: "#fff4ed",  border: "#ffd5b4", hover: "#ffe8d6" },  // peach
  { bg: "#edf6ff",  border: "#b3d9ff", hover: "#daeeff" },  // sky
  { bg: "#edfff5",  border: "#b6f5d3", hover: "#d4fde7" },  // mint
];

function getCardStyle(id: string) {
  const sum = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return CARD_STYLES[sum % CARD_STYLES.length];
}

/* ── Media ───────────────────────────────────────────────── */
const IMAGE_REGEX = /!\[([^\]]*)\]\(([^)]+)\)/g;
const VIDEO_REGEX = /\[video\]\(([^)]+)\)/g;

interface MediaItem { type: "image" | "video"; url: string; alt?: string; }

function extractMedia(content: string): MediaItem[] {
  const items: MediaItem[] = [];
  let m: RegExpExecArray | null;
  IMAGE_REGEX.lastIndex = 0;
  while ((m = IMAGE_REGEX.exec(content)) !== null)
    items.push({ type: "image", url: m[2], alt: m[1] || "Post image" });
  VIDEO_REGEX.lastIndex = 0;
  while ((m = VIDEO_REGEX.exec(content)) !== null)
    items.push({ type: "video", url: m[1] });
  return items;
}

function MediaPreview({ items }: { items: MediaItem[] }) {
  if (items.length === 0) return null;
  const first = items[0];
  const extra = items.length - 1;
  return (
    <div className="relative w-full overflow-hidden rounded-[20px]" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
      {first.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={first.url} alt={first.alt} className="w-full object-cover max-h-80" loading="lazy" style={{ display: "block" }} />
      ) : (
        <video src={first.url} controls className="w-full max-h-80 bg-gray-100" preload="metadata" />
      )}
      {extra > 0 && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-white"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}>
          <Images className="h-3.5 w-3.5" />+{extra}
        </div>
      )}
    </div>
  );
}

/* ── PostCard ────────────────────────────────────────────── */
export default function PostCard({ post }: { post: Post }) {
  const { user } = useSession();
  const { data: isLiked } = useLikeStatus(user?.id, post.id);
  const { data: isBookmarked } = useBookmarkStatus(user?.id, post.id);

  const media = extractMedia(post.content);
  const hasMedia = media.length > 0;
  const previewLimit = hasMedia ? 120 : 200;
  const stripped = stripMarkdown(post.content);
  const preview = stripped.length > previewLimit ? stripped.substring(0, previewLimit) + "..." : stripped;

  const style = getCardStyle(post.id);

  return (
    <Link href={`/post/${post.id}`} className="block w-full">
      <div
        className="group relative flex flex-col rounded-[28px] transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
        style={{
          background: style.bg,
          border: `1px solid ${style.border}`,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = style.hover)}
        onMouseLeave={e => (e.currentTarget.style.background = style.bg)}
      >
        {/* Media preview */}
        {hasMedia && <div className="relative"><MediaPreview items={media} /></div>}

        {/* Content */}
        <div className="flex flex-col gap-3 p-5">
          {/* Title + category */}
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-base font-bold text-[var(--forum-text-primary)] leading-snug line-clamp-2 flex-1">
              {post.title}
            </h2>
            {post.category && (
              <span
                className="shrink-0 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full"
                style={{ background: "#ede9fe", color: "#6d28d9", border: "1px solid #d4caff" }}
              >
                {post.category.name}
              </span>
            )}
          </div>

          {/* Body */}
          {preview && (
            <p className="text-sm text-[var(--forum-text-secondary)] leading-relaxed line-clamp-3">
              {preview}
            </p>
          )}

          {/* Footer — dua baris di mobile, satu baris di sm+ */}
          <div className="flex flex-col gap-2 pt-3 border-t" style={{ borderColor: style.border }}>

            {/* Baris 1: Author + time */}
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 text-white"
                style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
              >
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

            {/* Baris 2: Stats + Like + Bookmark */}
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-3 px-3 py-1.5 rounded-2xl"
                style={{ background: "rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-center gap-1 text-xs font-medium text-[var(--forum-text-muted)]" title="Views">
                  <Eye className="h-3.5 w-3.5" /><span>{post.views}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-[var(--forum-text-muted)]" title="Komentar">
                  <MessageCircle className="h-3.5 w-3.5" /><span>{post.comment_count}</span>
                </div>
              </div>
              <div className="flex items-center gap-0.5 ml-auto">
                <LikeButton postId={post.id} isLiked={isLiked ?? false} likeCount={post.like_count} />
                <BookmarkButton postId={post.id} isBookmarked={isBookmarked ?? false} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </Link>
  );
}
