"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import PostCard from "@/components/post/PostCard";
import { MessageSquare, Users, Bookmark, Compass } from "lucide-react";
import type { Post, PostAuthor, PostCategory } from "@/types/post";

interface SupabasePostRaw {
  id: string;
  title: string;
  content: string;
  views: number;
  status: string;
  created_at: string;
  author: PostAuthor[] | PostAuthor;
  category: PostCategory[] | PostCategory;
  comments?: { count: number }[];
  likes?: { count: number }[];
  community_id?: string;
}

function mapRawPost(item: SupabasePostRaw): Post {
  return {
    id: item.id,
    title: item.title,
    content: item.content,
    views: item.views,
    status: item.status,
    created_at: item.created_at,
    author: Array.isArray(item.author) ? item.author[0] : item.author,
    category: Array.isArray(item.category) ? item.category[0] : item.category,
    comment_count: item.comments?.[0]?.count ?? 0,
    like_count: item.likes?.[0]?.count ?? 0,
    community_id: item.community_id,
  };
}

interface ProfileTabsProps {
  userId: string;
}

export default function ProfileTabs({ userId }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<"posts" | "communities" | "bookmarks">("posts");

  // User posts query
  const { data: userPosts, isLoading: loadingPosts } = useQuery({
    queryKey: ["user-posts", userId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          author:profiles!posts_author_id_fkey(id, username, avatar_url),
          category:categories(id, name, slug),
          comments(count),
          likes(count)
        `)
        .eq("author_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return ((data as unknown) as SupabasePostRaw[]).map(mapRawPost);
    },
    enabled: activeTab === "posts",
  });

  // User communities query
  const { data: userCommunities, isLoading: loadingCommunities } = useQuery({
    queryKey: ["user-communities", userId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("community_members")
        .select(`
          community:communities(
            id, name, slug, description, icon_url, member_count
          )
        `)
        .eq("user_id", userId);

      if (error) throw error;
      return (data || [])
        .map((item: any) => item.community)
        .filter(Boolean);
    },
    enabled: activeTab === "communities",
  });

  // User bookmarks query
  const { data: userBookmarks, isLoading: loadingBookmarks } = useQuery({
    queryKey: ["user-bookmarks", userId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("bookmarks")
        .select(`
          post:posts(
            *,
            author:profiles!posts_author_id_fkey(id, username, avatar_url),
            category:categories(id, name, slug),
            comments(count),
            likes(count)
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || [])
        .map((item: any) => item.post)
        .filter(Boolean)
        .map((post: any) => mapRawPost(post as SupabasePostRaw));
    },
    enabled: activeTab === "bookmarks",
  });

  return (
    <div className="space-y-6 pt-4">
      {/* Tab Controls */}
      <div className="flex p-1.5 rounded-[24px] mx-auto overflow-x-auto no-scrollbar"
        style={{ background: "#f0edff", border: "1px solid #d4caff" }}>
        <button onClick={() => setActiveTab("posts")}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-[20px] text-sm font-bold transition-all ${
            activeTab === "posts"
              ? "bg-white text-violet-600 shadow-sm"
              : "text-[var(--forum-text-muted)] hover:text-[var(--forum-text-primary)]"
          }`}>
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Postingan Saya</span>
          <span className="sm:hidden">Post</span>
        </button>
        <button onClick={() => setActiveTab("communities")}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-[20px] text-sm font-bold transition-all ${
            activeTab === "communities"
              ? "bg-white text-violet-600 shadow-sm"
              : "text-[var(--forum-text-muted)] hover:text-[var(--forum-text-primary)]"
          }`}>
          <Users className="h-4 w-4" />
          <span>Komunitas</span>
        </button>
        <button onClick={() => setActiveTab("bookmarks")}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-[20px] text-sm font-bold transition-all ${
            activeTab === "bookmarks"
              ? "bg-white text-violet-600 shadow-sm"
              : "text-[var(--forum-text-muted)] hover:text-[var(--forum-text-primary)]"
          }`}>
          <Bookmark className="h-4 w-4" />
          <span>Tersimpan</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "posts" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {loadingPosts ? (
              <div className="grid gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-32 rounded-[28px] bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : !userPosts || userPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-[28px]"
                style={{ background: "#f0edff", border: "1px solid #d4caff" }}>
                <div className="h-14 w-14 mb-5 rounded-[20px] flex items-center justify-center"
                  style={{ background: "#ede9fe", border: "1px solid #d4caff" }}>
                  <MessageSquare className="h-7 w-7 text-violet-500" />
                </div>
                <h3 className="text-lg font-bold text-[var(--forum-text-primary)] mb-2">Belum Ada Postingan</h3>
                <p className="text-sm text-[var(--forum-text-muted)] mb-5">Anda belum pernah membuat postingan.</p>
                <Link href="/post/create"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
                  Buat Post Pertama
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {userPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "communities" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {loadingCommunities ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-24 rounded-[24px] bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : !userCommunities || userCommunities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-[28px]"
                style={{ background: "#edfff5", border: "1px solid #b6f5d3" }}>
                <div className="h-14 w-14 mb-5 rounded-[20px] flex items-center justify-center"
                  style={{ background: "#dcfce7", border: "1px solid #b6f5d3" }}>
                  <Users className="h-7 w-7 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-[var(--forum-text-primary)] mb-2">Belum Bergabung</h3>
                <p className="text-sm text-[var(--forum-text-muted)] mb-5">Jelajahi berbagai komunitas menarik.</p>
                <Link href="/communities"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
                  <Compass className="h-4 w-4" />Jelajahi Komunitas
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {userCommunities.map((c: any) => (
                  <Link key={c.id} href={`/communities/${c.slug}`}
                    className="flex items-start gap-4 p-5 rounded-[24px] transition-all duration-200 hover:-translate-y-0.5 group"
                    style={{ background: "#f0edff", border: "1px solid #d4caff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div className="h-14 w-14 rounded-[20px] flex items-center justify-center text-lg font-black shrink-0 overflow-hidden shadow-md text-white"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
                      {c.icon_url ? <img src={c.icon_url} alt={c.name} className="h-full w-full object-cover" /> : c.name.slice(0,2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1 mt-0.5">
                      <h3 className="text-base font-bold text-[var(--forum-text-primary)] truncate">{c.name}</h3>
                      <p className="text-xs text-[var(--forum-text-muted)] line-clamp-1 mt-0.5">{c.description || "Tidak ada deskripsi"}</p>
                      <span className="text-xs font-bold text-violet-600 mt-2 inline-block px-2.5 py-0.5 rounded-full"
                        style={{ background: "#ede9fe", border: "1px solid #d4caff" }}>
                        {c.member_count ?? 0} Anggota
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "bookmarks" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {loadingBookmarks ? (
              <div className="grid gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-32 rounded-[28px] bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : !userBookmarks || userBookmarks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-[28px]"
                style={{ background: "#fff4ed", border: "1px solid #ffd5b4" }}>
                <div className="h-14 w-14 mb-5 rounded-[20px] flex items-center justify-center"
                  style={{ background: "#fef3e2", border: "1px solid #ffd5b4" }}>
                  <Bookmark className="h-7 w-7 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-[var(--forum-text-primary)] mb-2">Belum Ada Bookmark</h3>
                <p className="text-sm text-[var(--forum-text-muted)]">Simpan postingan favorit Anda untuk dibaca nanti.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {userBookmarks.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
