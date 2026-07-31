"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { MessageSquare, Heart, Bookmark, Users } from "lucide-react";

const STAT_STYLES = [
  { bg: "#f0edff", border: "#d4caff", iconBg: "#ede9fe", iconColor: "text-violet-500" },
  { bg: "#edfff5", border: "#b6f5d3", iconBg: "#dcfce7", iconColor: "text-emerald-500" },
  { bg: "#fff0f3", border: "#fecdd3", iconBg: "#fee2e2", iconColor: "text-rose-500"    },
  { bg: "#fff4ed", border: "#ffd5b4", iconBg: "#fef3e2", iconColor: "text-orange-500" },
];

export default function ProfileStats({ userId }: { userId: string }) {
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
          <div key={i} className="rounded-[24px] p-5 text-center animate-pulse"
            style={{ background: "#f5f4f0", border: "1px solid #e5e3de" }}>
            <div className="h-10 w-10 rounded-[14px] mx-auto bg-gray-200 mb-3" />
            <div className="h-8 w-12 mx-auto bg-gray-200 rounded-full mb-2" />
            <div className="h-3 w-14 mx-auto bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  const statItems = [
    { label: "Postingan",  count: stats?.posts ?? 0,       icon: MessageSquare },
    { label: "Komunitas",  count: stats?.communities ?? 0, icon: Users         },
    { label: "Disukai",    count: stats?.likes ?? 0,       icon: Heart         },
    { label: "Tersimpan",  count: stats?.bookmarks ?? 0,   icon: Bookmark      },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        const s = STAT_STYLES[idx];
        return (
          <div key={idx} className="rounded-[24px] p-5 text-center transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: s.bg, border: `1px solid ${s.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-center mb-3">
              <div className="p-2.5 rounded-[14px]" style={{ background: s.iconBg }}>
                <Icon className={`h-5 w-5 ${s.iconColor}`} />
              </div>
            </div>
            <p className="text-3xl font-black text-[var(--forum-text-primary)] tracking-tight mb-1">{item.count}</p>
            <p className="text-[11px] font-bold text-[var(--forum-text-muted)] uppercase tracking-wider">{item.label}</p>
          </div>
        );
      })}
    </div>
  );
}
