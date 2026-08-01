"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import { useDebounce } from "@/hooks/useDebounce";
import { useSession } from "@/components/providers/SessionProvider";
import PostList from "@/components/post/PostList";
import PostSearch from "@/components/post/PostSearch";
import PostSort from "@/components/post/PostSort";
import Pagination from "@/components/post/Pagination";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import { PenSquare, Sparkles, TrendingUp, BookOpen } from "lucide-react";
import type { PostSort as PostSortType } from "@/types/post";

const POSTS_PER_PAGE = 10;

/* ── Bento card wrapper ─────────────────────────────────── */
function BentoCard({
  children,
  className = "",
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: { bg: string; border: string };
}) {
  return (
    <div
      className={`rounded-[28px] p-5 ${className}`}
      style={{
        background: accent?.bg ?? "#ffffff",
        border: `1px solid ${accent?.border ?? "#e8e6f0"}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

export default function PostsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useSession();

  const page = Number(searchParams.get("page") ?? "1");
  const urlSearch = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const sort = (searchParams.get("sort") ?? "newest") as PostSortType;

  const [localSearch, setLocalSearch] = useState(urlSearch);
  const debouncedSearch = useDebounce(localSearch, 500);

  const updateParams = useCallback(
    (updates: { page?: number; search?: string; category?: string; sort?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (updates.search !== undefined) {
        updates.search ? params.set("search", updates.search) : params.delete("search");
        params.delete("page");
      }
      if (updates.category !== undefined) {
        updates.category ? params.set("category", updates.category) : params.delete("category");
        params.delete("page");
      }
      if (updates.sort !== undefined) {
        updates.sort && updates.sort !== "newest" ? params.set("sort", updates.sort) : params.delete("sort");
        params.delete("page");
      }
      if (updates.page !== undefined) {
        updates.page > 1 ? params.set("page", updates.page.toString()) : params.delete("page");
      }
      router.push(`/post?${params.toString()}`);
    },
    [searchParams, router]
  );

  if (debouncedSearch !== urlSearch) updateParams({ search: debouncedSearch });

  const { data, isLoading } = usePosts({
    page,
    category: category || undefined,
    search: urlSearch || undefined,
    sort,
    limit: POSTS_PER_PAGE,
  });

  const searchParamsObj: Record<string, string> = {};
  searchParams.forEach((value, key) => { if (key !== "page") searchParamsObj[key] = value; });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChannelHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-4 py-4 xl:px-6 xl:py-6">

          {/* ── Bento grid ────────────────────────────────────── */}
          <div className="flex flex-col xl:flex-row gap-4">

            {/* ── MAIN column ─────────────────────────────────── */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">

              {/* Row 1 — Hero card (full width): greeting + search + sort */}
              <BentoCard accent={{ bg: "#f0edff", border: "#d4caff" }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="h-5 w-5 text-violet-500" />
                      <h2 className="text-xl font-black text-[var(--forum-text-primary)] tracking-tight">
                        Beranda
                      </h2>
                    </div>
                    <p className="text-sm text-[var(--forum-text-muted)]">
                      Jelajahi diskusi dan temukan topik menarik
                    </p>
                  </div>
                  {user && (
                    <Link
                      href="/post/create"
                      className="forum-btn-accent inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm shrink-0"
                    >
                      <PenSquare className="h-4 w-4" />
                      Buat Post
                    </Link>
                  )}
                </div>
              </BentoCard>

              {/* Row 2 — Search + Sort (full width) */}
              <BentoCard className="!p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <PostSearch value={localSearch} onChange={setLocalSearch} />
                  </div>
                  <PostSort value={sort} onChange={(v) => updateParams({ sort: v })} />
                </div>
              </BentoCard>

              {/* Row 3 — Post feed (full width) */}
              <BentoCard className="!p-4 sm:!p-6">
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen className="h-4 w-4 text-violet-500" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--forum-text-muted)]">
                    Diskusi Terbaru
                  </h3>
                  {data?.pagination.total != null && (
                    <span
                      className="ml-auto text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: "#ede9fe", color: "#6d28d9" }}
                    >
                      {data.pagination.total} post
                    </span>
                  )}
                </div>

                <PostList posts={data?.posts} isLoading={isLoading} />

                {data && (
                  <div className="pt-6 flex justify-center">
                    <Pagination
                      pagination={data.pagination}
                      baseUrl="/post"
                      searchParams={searchParamsObj}
                    />
                  </div>
                )}
              </BentoCard>
            </div>

            {/* ── RIGHT column (xl only) ───────────────────────── */}
            <div className="hidden xl:flex flex-col gap-4 w-72 shrink-0">

              {/* Stats card */}
              <BentoCard accent={{ bg: "#fff4ed", border: "#ffd5b4" }}>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-4 w-4 text-orange-400" />
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400">
                    Statistik
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Total Post", value: data?.pagination.total ?? "—" },
                    { label: "Halaman", value: data?.pagination.totalPages ?? "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-[20px] p-3 text-center"
                      style={{ background: "rgba(255,255,255,0.6)", border: "1px solid #ffd5b4" }}>
                      <p className="text-2xl font-black text-[var(--forum-text-primary)]">{value}</p>
                      <p className="text-[11px] font-semibold text-[var(--forum-text-muted)] mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </BentoCard>

              {/* Buat post CTA */}
              {user && (
                <BentoCard accent={{ bg: "#edfff5", border: "#b6f5d3" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <PenSquare className="h-4 w-4 text-emerald-500" />
                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                      Kontribusi
                    </p>
                  </div>
                  <p className="text-sm text-[var(--forum-text-secondary)] leading-relaxed mb-4">
                    Bagikan ide atau mulai diskusi baru bersama komunitas.
                  </p>
                  <Link href="/post/create" className="forum-btn-accent block w-full text-center py-2.5 rounded-full text-sm">
                    + Tulis Postingan
                  </Link>
                </BentoCard>
              )}

              {/* Trending placeholder */}
              <BentoCard accent={{ bg: "#edf6ff", border: "#b3d9ff" }}>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
                    Trending
                  </p>
                </div>
                {[80, 62, 74, 55, 68].map((w, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b last:border-0"
                    style={{ borderColor: "#b3d9ff" }}>
                    <span className="text-xs font-black forum-gradient-text w-5 shrink-0">
                      #{i + 1}
                    </span>
                    <div className="flex-1 h-2.5 rounded-full animate-pulse"
                      style={{ width: `${w}%`, background: "#dbeafe" }} />
                  </div>
                ))}
                <p className="text-[10px] text-[var(--forum-text-muted)] text-center mt-3 italic">
                  Segera hadir
                </p>
              </BentoCard>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
