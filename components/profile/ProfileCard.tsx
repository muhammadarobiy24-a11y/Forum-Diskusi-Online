"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { CalendarDays, Shield, Edit3, Settings } from "lucide-react";
import { formatDate } from "@/lib/utils/date";
import type { Profile } from "@/types";

export default function ProfileCard({ userId }: { userId: string }) {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("profiles").select("*").eq("user_id", userId).single();
      if (error) throw error;
      return data as Profile;
    },
  });

  if (isLoading) {
    return (
      <div className="rounded-[28px] overflow-hidden animate-pulse" style={{ background: "#fff", border: "1px solid #e8e6f0" }}>
        <div className="h-28 bg-gray-100" />
        <div className="p-6 pt-0 space-y-3">
          <div className="flex justify-between items-end -mt-10 mb-4">
            <div className="h-20 w-20 rounded-full bg-gray-200 border-4 border-white" />
            <div className="h-9 w-28 rounded-full bg-gray-200" />
          </div>
          <div className="h-6 w-40 bg-gray-200 rounded-full" />
          <div className="h-4 w-28 bg-gray-100 rounded-full" />
          <div className="h-4 w-full max-w-md bg-gray-100 rounded-full" />
        </div>
      </div>
    );
  }

  if (!profile) return null;
  const initials = (profile.username || "U").slice(0, 2).toUpperCase();

  return (
    <div className="rounded-[28px] overflow-hidden" style={{ background: "#fff", border: "1px solid #e8e6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      {/* Banner */}
      <div className="h-28 relative" style={{ background: "linear-gradient(135deg, #ede9fe, #dbeafe)" }} />

      <div className="p-6 pt-0">
        {/* Avatar + Actions */}
        <div className="flex flex-wrap items-end justify-between -mt-12 mb-5 gap-3">
          <div className="relative">
            <div className="h-24 w-24 rounded-full flex items-center justify-center text-2xl font-black border-4 border-white overflow-hidden shadow-md"
              style={{
                background: profile.avatar_url ? `url(${profile.avatar_url}) center/cover` : "linear-gradient(135deg, #7c3aed, #3b82f6)",
                color: "white",
              }}>
              {!profile.avatar_url && initials}
            </div>
            <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-3 border-white bg-emerald-500"
              style={{ borderWidth: 3 }} />
          </div>

          <div className="flex items-center gap-2 mb-1">
            <Link href="/profile/edit"
              className="forum-btn-accent flex items-center gap-2 px-4 py-2 rounded-full text-sm">
              <Edit3 className="h-4 w-4" />Edit Profil
            </Link>
            <Link href="/settings"
              className="flex items-center justify-center h-9 w-9 rounded-full text-[var(--forum-text-muted)] hover:bg-gray-100 transition-colors border border-gray-200">
              <Settings className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div>
            <h1 className="text-2xl font-black text-[var(--forum-text-primary)] tracking-tight">
              {profile.username}
            </h1>
            {profile.full_name && (
              <p className="text-sm font-semibold text-[var(--forum-text-muted)] mt-0.5">{profile.full_name}</p>
            )}
          </div>

          {profile.bio ? (
            <p className="text-sm text-[var(--forum-text-secondary)] leading-relaxed px-4 py-3 rounded-[16px]"
              style={{ background: "#faf9f6", border: "1px solid #e8e6e1" }}>
              {profile.bio}
            </p>
          ) : (
            <p className="text-sm text-[var(--forum-text-muted)] italic">Belum ada bio yang ditulis.</p>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-violet-600"
              style={{ background: "#ede9fe", border: "1px solid #d4caff" }}>
              <Shield className="h-3.5 w-3.5" />
              <span className="capitalize">{profile.role}</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--forum-text-muted)]"
              style={{ background: "#f5f4f0", border: "1px solid #e5e3de" }}>
              <CalendarDays className="h-3.5 w-3.5" />
              Bergabung {formatDate(profile.created_at)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
