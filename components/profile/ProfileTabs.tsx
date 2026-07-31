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
      <div 
        className="flex p-1.5 rounded-[20px] mx-auto overflow-x-auto no-scrollbar"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
            activeTab === "posts"
              ? "bg-white/10 text-white shadow-lg"
              : "text-white/40 hover:text-white/80 hover:bg-white/5"
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Postingan Saya</span>
          <span className="sm:hidden">Post</span>
        </button>

        <button
          onClick={() => setActiveTab("communities")}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
            activeTab === "communities"
              ? "bg-white/10 text-white shadow-lg"
              : "text-white/40 hover:text-white/80 hover:bg-white/5"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Komunitas</span>
        </button>

        <button
          onClick={() => setActiveTab("bookmarks")}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
            activeTab === "bookmarks"
              ? "bg-white/10 text-white shadow-lg"
              : "text-white/40 hover:text-white/80 hover:bg-white/5"
          }`}
        >
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
                  <div key={i} className="h-40 rounded-[24px] bg-white/5 animate-pulse" style={{ border: "1px solid rgba(255,255,255,0.05)" }} />
                ))}
              </div>
            ) : !userPosts || userPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center rounded-[32px]" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="h-16 w-16 mb-6 rounded-3xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <MessageSquare className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Belum Ada Postingan</h3>
                <p className="text-sm font-medium text-white/50 mb-6">
                  Anda belum pernah membuat postingan di forum ini.
                </p>
                <Link
                  href="/post/create"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", boxShadow: "0 4px 15px rgba(124,58,237,0.3)" }}
                >
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
                  <div key={i} className="h-28 rounded-[24px] bg-white/5 animate-pulse" style={{ border: "1px solid rgba(255,255,255,0.05)" }} />
                ))}
              </div>
            ) : !userCommunities || userCommunities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center rounded-[32px]" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="h-16 w-16 mb-6 rounded-3xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Users className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Belum Bergabung dengan Komunitas</h3>
                <p className="text-sm font-medium text-white/50 mb-6">
                  Jelajahi berbagai komunitas menarik yang tersedia.
                </p>
                <Link
                  href="/communities"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 4px 15px rgba(16,185,129,0.3)" }}
                >
                  <Compass className="h-4 w-4" />
                  Jelajahi Komunitas
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {userCommunities.map((c: any) => (
                  <Link
                    key={c.id}
                    href={`/communities/${c.slug}`}
                    className="flex items-start gap-4 p-5 rounded-[24px] transition-all duration-300 hover:-translate-y-1 group"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div 
                      className="h-14 w-14 rounded-2xl flex items-center justify-center text-lg font-black shrink-0 overflow-hidden shadow-lg transition-transform group-hover:scale-110"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", color: "white" }}
                    >
                      {c.icon_url ? (
                        <img src={c.icon_url} alt={c.name} className="h-full w-full object-cover" />
                      ) : (
                        c.name.slice(0, 2).toUpperCase()
                      )}
                    </div>
                    <div className="min-w-0 flex-1 mt-0.5">
                      <h3 className="text-base font-bold text-white/90 group-hover:text-white transition-colors truncate">
                        {c.name}
                      </h3>
                      <p className="text-xs font-medium text-white/50 line-clamp-1 mt-0.5">
                        {c.description || "Tidak ada deskripsi"}
                      </p>
                      <p className="text-xs font-semibold text-violet-300 mt-2 bg-violet-500/10 inline-block px-2 py-0.5 rounded-lg border border-violet-500/20">
                        {c.member_count ?? 0} Anggota
                      </p>
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
                  <div key={i} className="h-40 rounded-[24px] bg-white/5 animate-pulse" style={{ border: "1px solid rgba(255,255,255,0.05)" }} />
                ))}
              </div>
            ) : !userBookmarks || userBookmarks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center rounded-[32px]" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="h-16 w-16 mb-6 rounded-3xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <Bookmark className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Belum Ada Bookmark</h3>
                <p className="text-sm font-medium text-white/50">
                  Simpan postingan favorit Anda untuk dibaca nanti.
                </p>
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
