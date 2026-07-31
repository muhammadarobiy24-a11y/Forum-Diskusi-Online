"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { MessageSquare, Heart, Bookmark, Users } from "lucide-react";

interface ProfileStatsProps {
  userId: string;
}

export default function ProfileStats({ userId }: ProfileStatsProps) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["profile-stats", userId],
    queryFn: async () => {
      const supabase = createClient();

      const [postsRes, likesRes, bookmarksRes, communitiesRes] = await Promise.all([
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("author_id", userId),
        supabase.from("likes").select("id", { count: "exact", head: true }).eq("user_id", userId),
        supabase.from("bookmarks").select("id", { count: "exact", head: true }).eq("user_id", userId),
        supabase.from("community_members").select("id", { count: "exact", head: true }).eq("user_id", userId),
      ]);

      return {
        posts: postsRes.count ?? 0,
        likes: likesRes.count ?? 0,
        bookmarks: bookmarksRes.count ?? 0,
        communities: communitiesRes.count ?? 0,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-[24px] p-6 text-center space-y-3"
            style={{
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="h-10 w-10 rounded-2xl mx-auto bg-white/5 animate-pulse" />
            <div className="h-8 w-12 mx-auto bg-white/5 animate-pulse rounded-lg" />
            <div className="h-4 w-16 mx-auto bg-white/5 animate-pulse rounded" />
          </div>
        ))}
      </div>
    );
  }

  const statItems = [
    { label: "Postingan", count: stats?.posts ?? 0, icon: MessageSquare, color: "text-blue-400", bg: "rgba(59,130,246,0.1)" },
    { label: "Komunitas", count: stats?.communities ?? 0, icon: Users, color: "text-emerald-400", bg: "rgba(16,185,129,0.1)" },
    { label: "Disukai", count: stats?.likes ?? 0, icon: Heart, color: "text-rose-400", bg: "rgba(244,63,94,0.1)" },
    { label: "Tersimpan", count: stats?.bookmarks ?? 0, icon: Bookmark, color: "text-amber-400", bg: "rgba(251,191,36,0.1)" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="rounded-[24px] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] group"
            style={{
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <div className="flex items-center justify-center mb-3">
              <div 
                className="p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: item.bg }}
              >
                <Icon className={`h-6 w-6 ${item.color}`} />
              </div>
            </div>
            <p className="text-3xl font-black text-white tracking-tight mb-1">{item.count}</p>
            <p className="text-xs font-bold text-white/50 uppercase tracking-wider">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}
