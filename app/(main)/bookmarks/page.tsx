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
import type { BookmarkSort } from "@/types/bookmark";

const BOOKMARKS_PER_PAGE = 10;

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
        if (updates.search) {
          params.set("search", updates.search);
        } else {
          params.delete("search");
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

      router.push(`/bookmarks?${params.toString()}`);
    },
    [searchParams, router]
  );

  if (debouncedSearch !== urlSearch) {
    updateParams({ search: debouncedSearch });
  }

  const { data, isLoading } = useBookmarks({
    userId: user?.id || "",
    page,
    limit: BOOKMARKS_PER_PAGE,
    search: urlSearch || undefined,
    sort,
  });

  if (sessionLoading) {
    return (
      <div className="flex flex-col h-full overflow-hidden relative">
        <ChannelHeader channelName="bookmarks" channelDescription="Postingan yang Anda simpan" />
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
          <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 space-y-8">
            <BookmarkList bookmarks={undefined} isLoading={true} />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const searchParamsObj: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (key !== "page") {
      searchParamsObj[key] = value;
    }
  });

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <ChannelHeader channelName="bookmarks" channelDescription="Postingan yang Anda simpan" />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="w-full sm:w-[400px]">
              <PostSearch value={localSearch} onChange={setLocalSearch} />
            </div>
            <div className="shrink-0">
              <PostSort value={sort} onChange={(value) => updateParams({ sort: value })} />
            </div>
          </div>

          <BookmarkList bookmarks={data?.bookmarks} isLoading={isLoading} />
          
          {data && (
            <div className="pt-4 pb-12 flex justify-center">
              <Pagination
                pagination={data.pagination}
                baseUrl="/bookmarks"
                searchParams={searchParamsObj}
              />
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
