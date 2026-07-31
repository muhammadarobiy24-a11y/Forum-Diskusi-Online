"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "@/components/providers/SessionProvider";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useDebounce } from "@/hooks/useDebounce";
import BookmarkList from "@/components/bookmark/BookmarkList";
import PostSearch from "@/components/post/PostSearch";
import PostSort from "@/components/post/PostSort";
import Pagination from "@/components/post/Pagination";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import { Bookmark, Info } from "lucide-react";
import type { BookmarkSort } from "@/types/bookmark";

const BOOKMARKS_PER_PAGE = 10;

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

export default function BookmarksPage() {
  const { user, isLoading: sessionLoading } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page") ?? "1");
  const urlSearch = searchParams.get("search") ?? "";
  const sort = (searchParams.get("sort") ?? "newest") as BookmarkSort;

  const [localSearch, setLocalSearch] = useState(urlSearch);
  const debouncedSearch = useDebounce(localSearch, 500);

  const updateParams = useCallback(
    (updates: { page?: number; search?: string; sort?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (updates.search !== undefined) {
        updates.search ? params.set("search", updates.search) : params.delete("search");
        params.delete("page");
      }
      if (updates.sort !== undefined) {
        updates.sort && updates.sort !== "newest" ? params.set("sort", updates.sort) : params.delete("sort");
        params.delete("page");
      }
      if (updates.page !== undefined) {
        updates.page > 1 ? params.set("page", updates.page.toString()) : params.delete("page");
      }
      router.push(`/bookmarks?${params.toString()}`);
    },
    [searchParams, router]
  );

  if (debouncedSearch !== urlSearch) updateParams({ search: debouncedSearch });

  const { data, isLoading } = useBookmarks({
    userId: user?.id || "",
    page,
    limit: BOOKMARKS_PER_PAGE,
    search: urlSearch || undefined,
    sort,
  });

  if (sessionLoading) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <ChannelHeader />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-4 xl:px-6 xl:py-6">
            <BentoCard><BookmarkList bookmarks={undefined} isLoading={true} /></BentoCard>
          </div>
        </div>
      </div>
    );
  }

  if (!user) { router.push("/login"); return null; }

  const searchParamsObj: Record<string, string> = {};
  searchParams.forEach((value, key) => { if (key !== "page") searchParamsObj[key] = value; });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChannelHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1100px] mx-auto px-4 py-4 xl:px-6 xl:py-6">
          <div className="flex flex-col xl:flex-row gap-4">

            {/* MAIN column */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">

              {/* Hero card */}
              <BentoCard accent={{ bg: "#edfff5", border: "#b6f5d3" }}>
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-[16px] flex items-center justify-center shrink-0"
                    style={{ background: "#dcfce7", border: "1px solid #b6f5d3" }}>
                    <Bookmark className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <h1 className="text-xl font-black text-[var(--forum-text-primary)] tracking-tight">Tersimpan</h1>
                    <p className="text-sm text-[var(--forum-text-muted)]">Postingan yang Anda simpan</p>
                  </div>
                </div>
              </BentoCard>

              {/* Search + Sort */}
              <BentoCard className="!p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <PostSearch value={localSearch} onChange={setLocalSearch} />
                  </div>
                  <PostSort value={sort} onChange={(v) => updateParams({ sort: v })} />
                </div>
              </BentoCard>

              {/* List card */}
              <BentoCard className="!p-5 sm:!p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Bookmark className="h-4 w-4 text-emerald-500" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--forum-text-muted)]">
                    Bookmark Saya
                  </h2>
                  {data?.pagination.total != null && (
                    <span className="ml-auto text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: "#dcfce7", color: "#15803d" }}>
                      {data.pagination.total} tersimpan
                    </span>
                  )}
                </div>
                <BookmarkList bookmarks={data?.bookmarks} isLoading={isLoading} />
                {data && (
                  <div className="pt-6 flex justify-center">
                    <Pagination pagination={data.pagination} baseUrl="/bookmarks" searchParams={searchParamsObj} />
                  </div>
                )}
              </BentoCard>
            </div>

            {/* RIGHT column */}
            <div className="hidden xl:flex flex-col gap-4 w-64 shrink-0">
              <BentoCard accent={{ bg: "#f0edff", border: "#d4caff" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-4 w-4 text-violet-500" />
                  <p className="text-xs font-bold uppercase tracking-widest text-violet-500">Info</p>
                </div>
                <p className="text-sm text-[var(--forum-text-secondary)] leading-relaxed">
                  Bookmark postingan favorit agar mudah ditemukan kembali kapan saja.
                </p>
              </BentoCard>
            </div>

          </div>
          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
