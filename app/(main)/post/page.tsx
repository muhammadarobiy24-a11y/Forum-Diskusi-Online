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
import { PenSquare, Search, TrendingUp, BookOpen } from "lucide-react";
import type { PostSort as PostSortType } from "@/types/post";
import { useCategories } from "@/hooks/useCategories";

const POSTS_PER_PAGE = 10;

export default function PostsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useSession();
  const { data: categories } = useCategories();

  const page = Number(searchParams.get("page") ?? "1");
  const urlSearch = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const sort = (searchParams.get("sort") ?? "newest") as PostSortType;

  const [localSearch, setLocalSearch] = useState(urlSearch);
  const debouncedSearch = useDebounce(localSearch, 500);

  const updateParams = useCallback(
    (updates: { page?: number; search?: string; category?: string; sort?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (updates.search !== undefined) { updates.search ? params.set("search", updates.search) : params.delete("search"); params.delete("page"); }
      if (updates.category !== undefined) { updates.category ? params.set("category", updates.category) : params.delete("category"); params.delete("page"); }
      if (updates.sort !== undefined) { updates.sort && updates.sort !== "newest" ? params.set("sort", updates.sort) : params.delete("sort"); params.delete("page"); }
      if (updates.page !== undefined) { updates.page > 1 ? params.set("page", updates.page.toString()) : params.delete("page"); }
      router.push(`/post?${params.toString()}`);
    },
    [searchParams, router]
  );

  if (debouncedSearch !== urlSearch) updateParams({ search: debouncedSearch });

  const { data, isLoading } = usePosts({
    page, category: category || undefined,
    search: urlSearch || undefined, sort, limit: POSTS_PER_PAGE,
  });

  const searchParamsObj: Record<string, string> = {};
  searchParams.forEach((v, k) => { if (k !== "page") searchParamsObj[k] = v; });

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-4">

      {/* ── Greeting header ─────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-bold text-[var(--forum-text-muted)]">Forum Diskusi</p>
          <h1 className="text-2xl font-black text-[var(--forum-text-primary)] tracking-tight leading-tight">
            Beranda 👋
          </h1>
        </div>
        {user && (
          <Link href="/post/create"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-black text-white shadow-lg transition-all hover:scale-105 active:scale-95"
            style={{ background: "var(--card-purple)", boxShadow: "0 4px 16px rgba(90,49,200,0.35)" }}>
            <PenSquare className="h-4 w-4" />
            Buat Post
          </Link>
        )}
      </div>

      {/* ── Hero card — stats ────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-[28px] p-5 card-purple-bold">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center">
              <BookOpen className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Post</span>
          </div>
          <p className="text-4xl font-black text-white leading-none">{data?.pagination.total ?? "—"}</p>
          <p className="text-xs font-semibold text-white/60 mt-1">Diskusi aktif</p>
        </div>

        <div className="rounded-[28px] p-5 card-cream-soft">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-7 w-7 rounded-full flex items-center justify-center" style={{ background: "var(--card-orange)" }}>
              <TrendingUp className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xs font-bold text-[var(--forum-text-muted)] uppercase tracking-widest">Trending</span>
          </div>
          <p className="text-4xl font-black text-[var(--forum-text-primary)] leading-none">{data?.pagination.totalPages ?? "—"}</p>
          <p className="text-xs font-semibold text-[var(--forum-text-muted)] mt-1">Halaman</p>
        </div>
      </div>

      {/* ── Search bar ──────────────────────────────────── */}
      <div className="mb-4">
        <PostSearch value={localSearch} onChange={setLocalSearch} />
      </div>

      {/* ── Category pills ──────────────────────────────── */}
      {categories && categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-none" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => updateParams({ category: "" })}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${
              !category
                ? "text-white shadow-md"
                : "text-[var(--forum-text-secondary)] bg-white/60 hover:bg-white"
            }`}
            style={!category ? { background: "var(--card-purple)" } : {}}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button key={cat.id}
              onClick={() => updateParams({ category: cat.slug })}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                category === cat.slug
                  ? "text-white shadow-md"
                  : "text-[var(--forum-text-secondary)] bg-white/60 hover:bg-white"
              }`}
              style={category === cat.slug ? { background: "var(--card-orange)" } : {}}>
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* ── Sort + Feed ─────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-black text-[var(--forum-text-primary)] uppercase tracking-widest flex items-center gap-1.5">
          <span>Diskusi Terbaru</span>
        </h2>
        <PostSort value={sort} onChange={(v) => updateParams({ sort: v })} />
      </div>

      <PostList posts={data?.posts} isLoading={isLoading} />

      {data && (
        <div className="pt-6 pb-4 flex justify-center">
          <Pagination pagination={data.pagination} baseUrl="/post" searchParams={searchParamsObj} />
        </div>
      )}
    </div>
  );
}
