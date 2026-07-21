"use client";

import { useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { usePosts } from "@/hooks/usePosts";
import { useDebounce } from "@/hooks/useDebounce";
import PostList from "@/components/post/PostList";
import PostSearch from "@/components/post/PostSearch";
import PostSort from "@/components/post/PostSort";
import Pagination from "@/components/post/Pagination";
import CategoryFilterButtons from "@/components/category/CategoryFilterButtons";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import type { Category } from "@/types";
import type { PostSort as PostSortType } from "@/types/post";

const POSTS_PER_PAGE = 10;

export default function PostsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

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
    <>
      <ChannelHeader channelName="posts" channelDescription="Browse discussions and find interesting topics" />
      <div className="flex-1 overflow-y-auto dc-chat-bg">
        <div className="max-w-3xl mx-auto px-5 py-5 space-y-5">
          <PostSearch value={localSearch} onChange={setLocalSearch} />

          {categories && categories.length > 0 && (
            <CategoryFilterButtons
              categories={categories}
              value={category}
              onChange={(value) => updateParams({ category: value })}
            />
          )}

          <div className="flex justify-end">
            <PostSort value={sort} onChange={(value) => updateParams({ sort: value })} />
          </div>

          <PostList posts={data?.posts} isLoading={isLoading} />

          {data && (
            <Pagination
              pagination={data.pagination}
              baseUrl="/post"
              searchParams={searchParamsObj}
            />
          )}
        </div>
      </div>
    </>
  );
}
