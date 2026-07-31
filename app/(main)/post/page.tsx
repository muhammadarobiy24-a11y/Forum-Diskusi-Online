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
import { PenSquare } from "lucide-react";
import type { PostSort as PostSortType } from "@/types/post";

const POSTS_PER_PAGE = 10;

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
    (updates: {
      page?: number;
      search?: string;
      category?: string;
      sort?: string;
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.search !== undefined) {
        if (updates.search) {
          params.set("search", updates.search);
        } else {
          params.delete("search");
        }
        params.delete("page");
      }

      if (updates.category !== undefined) {
        if (updates.category) {
          params.set("category", updates.category);
        } else {
          params.delete("category");
        }
        params.delete("page");
      }

      if (updates.sort !== undefined) {
        if (updates.sort && updates.sort !== "newest") {
          params.set("sort", updates.sort);
        } else {
          params.delete("sort");
        }
        params.delete("page");
      }

      if (updates.page !== undefined) {
        if (updates.page > 1) {
          params.set("page", updates.page.toString());
        } else {
          params.delete("page");
        }
      }

      router.push(`/post?${params.toString()}`);
    },
    [searchParams, router]
  );

  if (debouncedSearch !== urlSearch) {
    updateParams({ search: debouncedSearch });
  }

  const { data, isLoading } = usePosts({
    page,
    category: category || undefined,
    search: urlSearch || undefined,
    sort,
    limit: POSTS_PER_PAGE,
  });

  const searchParamsObj: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (key !== "page") {
      searchParamsObj[key] = value;
    }
  });

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <ChannelHeader channelName="posts" channelDescription="Jelajahi diskusi dan temukan topik menarik" />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="flex gap-8 px-8 py-8 w-full max-w-[1280px] mx-auto">

          {/* ── LEFT: Post Feed ─────────────────────────────────── */}
          <div className="flex-1 min-w-0 max-w-[700px]">

            {/* Page title + description */}
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white tracking-tight">Posts</h2>
              <p className="text-sm text-white/50 mt-1">Jelajahi diskusi dan temukan topik menarik</p>
            </div>

            {/* Action row: Search (grow) + Sort + Create — satu baris horizontal */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex-1 min-w-0">
                <PostSearch value={localSearch} onChange={setLocalSearch} />
              </div>
              <PostSort value={sort} onChange={(value) => updateParams({ sort: value })} />
              {user && (
                <Link
                  href="/post/create"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:brightness-110 shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                    boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                  }}
                >
                  <PenSquare className="h-4 w-4" />
                  Buat Post
                </Link>
              )}
            </div>

            {/* Feed */}
            <PostList posts={data?.posts} isLoading={isLoading} />

            {/* Pagination */}
            {data && (
              <div className="pt-6 pb-12 flex justify-center">
                <Pagination
                  pagination={data.pagination}
                  baseUrl="/post"
                  searchParams={searchParamsObj}
                />
              </div>
            )}
          </div>

          {/* ── RIGHT: Sidebar ───────────────────────────────────── */}
          <aside className="hidden xl:flex flex-col w-72 shrink-0">
            <div className="sticky top-8 space-y-4">
              {/* Trending Placeholder */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">
                  🔥 Trending Topics
                </p>
                {[80, 60, 72, 55, 68].map((w, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
                    <span
                      className="text-xs font-black"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      #{i + 1}
                    </span>
                    <div
                      className="h-3 rounded-full animate-pulse"
                      style={{ width: `${w}%`, background: "rgba(255,255,255,0.06)" }}
                    />
                  </div>
                ))}
                <p className="text-[10px] font-medium text-white/30 mt-4 text-center italic">
                  Segera hadir
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
