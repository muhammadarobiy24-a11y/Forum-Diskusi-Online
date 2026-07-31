"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { usePosts } from "@/hooks/usePosts";
import { useDebounce } from "@/hooks/useDebounce";
import { useSession } from "@/components/providers/SessionProvider";
import PostList from "@/components/post/PostList";
import PostSearch from "@/components/post/PostSearch";
import PostSort from "@/components/post/PostSort";
import Pagination from "@/components/post/Pagination";
import CategoryFilterButtons from "@/components/category/CategoryFilterButtons";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import { PenSquare } from "lucide-react";
import type { Category } from "@/types";
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

  const supabase = createClient();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
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

            {/* Action row: Search + Sort + Create — rata kiri sama dengan judul */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
              <div className="flex-1 min-w-0">
                <PostSearch value={localSearch} onChange={setLocalSearch} />
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <PostSort value={sort} onChange={(value) => updateParams({ sort: value })} />
                {user && (
                  <Link
                    href="/post/create"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:brightness-110"
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
            </div>

            {/* Category filter — rata kiri sama dengan judul dan search */}
            {categories && categories.length > 0 && (
              <div className="mb-6">
                <CategoryFilterButtons
                  categories={categories}
                  value={category}
                  onChange={(value) => updateParams({ category: value })}
                />
              </div>
            )}

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
              {/* Create Post CTA */}
              {user && (
                <Link href="/post/create" className="block">
                  <div
                    className="group rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
                    style={{
                      background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(59,130,246,0.15))",
                      border: "1px solid rgba(167,139,250,0.25)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 0 40px rgba(124,58,237,0.1)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                          boxShadow: "0 0 16px rgba(124,58,237,0.5)",
                        }}
                      >
                        <PenSquare className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-sm font-black text-white/90">Buat Postingan</p>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Bagikan ide, tanya jawab, atau mulai diskusi dengan komunitas.
                    </p>
                    <div
                      className="mt-4 w-full py-2 rounded-xl text-center text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
                    >
                      + Tulis Postingan
                    </div>
                  </div>
                </Link>
              )}

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
