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

// ── Extract media from markdown content ─────────────────────
const IMAGE_REGEX = /!\[([^\]]*)\]\(([^)]+)\)/g;
const VIDEO_REGEX = /\[video\]\(([^)]+)\)/g;

interface MediaItem {
  type: "image" | "video";
  url: string;
  alt?: string;
}

function extractMedia(content: string): MediaItem[] {
  const items: MediaItem[] = [];
  let m: RegExpExecArray | null;

  IMAGE_REGEX.lastIndex = 0;
  while ((m = IMAGE_REGEX.exec(content)) !== null) {
    items.push({ type: "image", url: m[2], alt: m[1] || "Post image" });
  }

  VIDEO_REGEX.lastIndex = 0;
  while ((m = VIDEO_REGEX.exec(content)) !== null) {
    items.push({ type: "video", url: m[1] });
  }

  return items;
}

// ── Media preview component ──────────────────────────────────
function MediaPreview({ items }: { items: MediaItem[] }) {
  if (items.length === 0) return null;

  const first = items[0];
  const extra = items.length - 1;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {first.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={first.url}
          alt={first.alt}
          className="w-full object-cover max-h-80"
          loading="lazy"
          style={{ display: "block" }}
        />
      ) : (
        <video
          src={first.url}
          controls
          className="w-full max-h-80 bg-black/50"
          preload="metadata"
        />
      )}

      {/* Badge: jumlah media tambahan */}
      {extra > 0 && (
        <div
          className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-white"
          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
        >
          <Images className="h-3.5 w-3.5" />
          +{extra}
        </div>
      )}
    </div>
  );
}

// ── PostCard ─────────────────────────────────────────────────
interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { user } = useSession();
  const { data: isLiked } = useLikeStatus(user?.id, post.id);
  const { data: isBookmarked } = useBookmarkStatus(user?.id, post.id);

  const media = extractMedia(post.content);
  const hasMedia = media.length > 0;

  const strippedContent = stripMarkdown(post.content);
  // Kalau ada media, teks preview lebih pendek agar tidak terlalu panjang
  const previewLimit = hasMedia ? 120 : 200;
  const contentPreview =
    strippedContent.length > previewLimit
      ? strippedContent.substring(0, previewLimit) + "..."
      : strippedContent;

  return (
    <Link href={`/post/${post.id}`} className="block w-full">
      <div
        className="group relative flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(124,58,237,0.09), transparent 65%)",
            border: "1px solid rgba(167,139,250,0.20)",
          }}
        />

        {/* ── Media preview (full-bleed di atas) ── */}
        {hasMedia && (
          <div className="relative">
            <MediaPreview items={media} />
          </div>
        )}

        {/* ── Text content ── */}
        <div className="relative z-10 flex flex-col gap-3 p-5">
          {/* Title + category badge */}
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-base font-bold text-white/95 leading-snug group-hover:text-white transition-colors line-clamp-2 flex-1">
              {post.title}
            </h2>
            {post.category && (
              <span
                className="shrink-0 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                {post.category.name}
              </span>
            )}
          </div>

          {/* Body preview — sembunyikan kalau media sudah menjelaskan */}
          {contentPreview && (
            <p className="text-sm text-white/55 leading-relaxed line-clamp-3">
              {contentPreview}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/5">
            {/* Author + time */}
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                  color: "white",
                }}
              >
                {(post.author?.username || "A").substring(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-white/75 truncate">
                {post.author?.username || "Anonymous"}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
              <div className="flex items-center gap-1 text-xs text-white/35 shrink-0">
                <Clock className="h-3 w-3" />
                <span>{formatRelativeDate(post.created_at)}</span>
              </div>
            </div>

            {/* Stats + actions */}
            <div className="flex items-center gap-2 shrink-0">
              <div
                className="flex items-center gap-3 px-3 py-1 rounded-xl"
                style={{ background: "rgba(0,0,0,0.18)" }}
              >
                <div
                  className="flex items-center gap-1 text-xs font-medium text-white/45"
                  title="Views"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>{post.views}</span>
                </div>
                <div
                  className="flex items-center gap-1 text-xs font-medium text-white/45"
                  title="Komentar"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>{post.comment_count}</span>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
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
