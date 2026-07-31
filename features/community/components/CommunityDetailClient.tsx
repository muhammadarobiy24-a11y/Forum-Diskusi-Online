"use client";

import { useState } from "react";
import { FileText, Loader2, PenSquare, ChevronDown } from "lucide-react";
import type { Community } from "../types/community";
import { usePosts } from "@/hooks/usePosts";
import PostCard from "@/components/post/PostCard";
import CommunityPostForm from "./CommunityPostForm";
import { useSession } from "@/components/providers/SessionProvider";

interface CommunityDetailClientProps {
  community: Community;
}

export default function CommunityDetailClient({
  community,
}: CommunityDetailClientProps) {
  const { user } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading } = usePosts({
    page,
    limit: 20,
    communityId: community.id,
    sort: "newest",
  });

  const posts = data?.posts ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <div className="max-w-3xl mx-auto px-5 py-6 space-y-5">

      {/* ── Create post trigger ─────────────────────────────── */}
      {user && (
        <div>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-semibold text-white/40 hover:text-white/70 transition-all group"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0 group-hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
              >
                <PenSquare className="h-4 w-4 text-white" />
              </div>
              <span>Tulis sesuatu di {community.name}...</span>
            </button>
          ) : (
            <div className="space-y-2">
              <CommunityPostForm
                community={community}
                onSuccess={() => setShowForm(false)}
              />
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-1 text-xs font-semibold text-white/35 hover:text-white/60 transition-colors px-1"
              >
                <ChevronDown className="h-3.5 w-3.5 rotate-180" />
                Tutup form
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Divider ─────────────────────────────────────────── */}
      {posts.length > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
            {data?.pagination.total} Postingan
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>
      )}

      {/* ── Posts list ──────────────────────────────────────── */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div
            className="h-16 w-16 rounded-2xl flex items-center justify-center mb-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <FileText className="h-8 w-8 text-white/25" />
          </div>
          <p className="font-bold text-lg text-white/80 mb-1">Belum ada postingan</p>
          <p className="text-sm text-white/40 max-w-xs">
            Jadilah yang pertama memulai diskusi di{" "}
            <span className="text-white/70">{community.name}</span>!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* ── Pagination ──────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4 pb-8">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white/60 hover:text-white disabled:opacity-30 transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            ← Sebelumnya
          </button>
          <span className="text-xs text-white/40 font-medium px-3">
            {page} / {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white/60 hover:text-white disabled:opacity-30 transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            Berikutnya →
          </button>
        </div>
      )}

    </div>
  );
}
