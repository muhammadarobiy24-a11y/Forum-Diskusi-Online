"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import { useDebounce } from "@/hooks/useDebounce";
import { useSession } from "@/components/providers/SessionProvider";
import PostList from "@/components/post/PostList";
import PostSort from "@/components/post/PostSort";
import Pagination from "@/components/post/Pagination";
import { useCategories } from "@/hooks/useCategories";
import { PenSquare, TrendingUp, FileText, ArrowRight } from "lucide-react";
import type { PostSort as PostSortType } from "@/types/post";

const POSTS_PER_PAGE = 10;

export default function PostsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useSession();
  const { data: categories } = useCategories();

  const page   = Number(searchParams.get("page")     ?? "1");
  const urlSearch = searchParams.get("search")        ?? "";
  const category  = searchParams.get("category")      ?? "";
  const sort   = (searchParams.get("sort") ?? "newest") as PostSortType;

  const [localSearch, setLocalSearch] = useState(urlSearch);
  const debouncedSearch = useDebounce(localSearch, 500);

  const updateParams = useCallback(
    (updates: { page?: number; search?: string; category?: string; sort?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (updates.search    !== undefined) { updates.search    ? params.set("search",   updates.search)            : params.delete("search");   params.delete("page"); }
      if (updates.category  !== undefined) { updates.category  ? params.set("category", updates.category)          : params.delete("category"); params.delete("page"); }
      if (updates.sort      !== undefined) { updates.sort && updates.sort !== "newest" ? params.set("sort", updates.sort) : params.delete("sort"); params.delete("page"); }
      if (updates.page      !== undefined) { updates.page > 1  ? params.set("page",     updates.page.toString())   : params.delete("page"); }
      router.push(`/post?${params.toString()}`);
    },
    [searchParams, router]
  );

  if (debouncedSearch !== urlSearch) updateParams({ search: debouncedSearch });

  const { data, isLoading } = usePosts({
    page, category: category || undefined,
    search: urlSearch || undefined, sort,
    limit: POSTS_PER_PAGE,
  });

  const searchParamsObj: Record<string, string> = {};
  searchParams.forEach((v, k) => { if (k !== "page") searchParamsObj[k] = v; });

  return (
    <div className="max-w-2xl mx-auto px-4 pt-4 pb-6">

      {/* ── Hero card ungu — sesuai referensi ─────────────── */}
      <div
        className="rounded-[28px] p-6 mb-4 relative overflow-hidden"
        style={{ background: "var(--c-purple)" }}
      >
        {/* Dekoratif lingkaran */}
        <div className="absolute -top-8 -right-8 h-36 w-36 rounded-full opacity-20" style={{ background: "var(--c-lavender)" }} />
        <div className="absolute -bottom-10 -left-4 h-28 w-28 rounded-full opacity-15" style={{ background: "var(--c-lavender)" }} />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h2 className="text-2xl font-black text-white leading-tight mb-1">
                Selamat datang<br />di Forum Diskusi 👋
              </h2>
              <p className="text-sm font-semibold text-white/70">
                Temukan diskusi menarik dan bagikan ideamu.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            {/* Stats mini */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl" style={{ background: "rgba(255,255,255,0.15)" }}>
              <FileText className="h-3.5 w-3.5 text-white/80" />
              <span className="text-sm font-black text-white">{data?.pagination.total ?? "—"}</span>
              <span className="text-xs font-semibold text-white/60">Post</span>
            </div>

            {user && (
              <Link
                href="/post/create"
                className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-black text-[var(--c-purple)] ml-auto transition-all hover:scale-105 active:scale-95"
                style={{ background: "white" }}
              >
                <PenSquare className="h-4 w-4" />
                Buat Post
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Stat cards 2 kolom ─────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Card oranye */}
        <div className="rounded-[24px] p-5 relative overflow-hidden" style={{ background: "var(--c-orange)" }}>
          <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full opacity-20" style={{ background: "white" }} />
          <div className="relative z-10">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.25)" }}>
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <p className="text-3xl font-black text-white leading-none">{data?.pagination.total ?? "—"}</p>
            <p className="text-xs font-bold text-white/70 mt-1 uppercase tracking-wider">Diskusi</p>
          </div>
        </div>

        {/* Card putih */}
        <div className="rounded-[24px] p-5 card-white-soft relative overflow-hidden">
          <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full opacity-10" style={{ background: "var(--c-purple)" }} />
          <div className="relative z-10">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center mb-3" style={{ background: "var(--c-lavender)", opacity: 0.9 }}>
              <FileText className="h-4 w-4 text-white" />
            </div>
            <p className="text-3xl font-black text-[var(--forum-text-primary)] leading-none">{data?.pagination.totalPages ?? "—"}</p>
            <p className="text-xs font-bold text-[var(--forum-text-muted)] mt-1 uppercase tracking-wider">Halaman</p>
          </div>
        </div>
      </div>

      {/* ── Category pills ─────────────────────────────────── */}
      {categories && categories.length > 0 && (
        <div
          className="flex gap-2 overflow-x-auto pb-1 mb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button
            onClick={() => updateParams({ category: "" })}
            className="shrink-0 px-4 py-2 rounded-full text-sm font-black transition-all active:scale-95"
            style={
              !category
                ? { background: "var(--c-dark)", color: "white" }
                : { background: "white", color: "var(--forum-text-secondary)", border: "1.5px solid oklch(0.88 0.025 62)" }
            }
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateParams({ category: cat.slug })}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-black transition-all active:scale-95 whitespace-nowrap"
              style={
                category === cat.slug
                  ? { background: "var(--c-purple)", color: "white" }
                  : { background: "white", color: "var(--forum-text-secondary)", border: "1.5px solid oklch(0.88 0.025 62)" }
              }
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* ── Feed header ────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-black uppercase tracking-widest text-[var(--forum-text-muted)] flex items-center gap-1.5">
          Diskusi Terbaru
        </h3>
        <PostSort value={sort} onChange={(v) => updateParams({ sort: v })} />
      </div>

      {/* ── Post feed ──────────────────────────────────────── */}
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
    </div>
  );
}
