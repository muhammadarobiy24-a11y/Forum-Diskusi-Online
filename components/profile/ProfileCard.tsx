"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { CalendarDays, Shield, Edit3, Settings, Sparkles } from "lucide-react";
import { formatDate } from "@/lib/utils/date";
import type { Profile } from "@/types";

export default function ProfileCard({ userId }: { userId: string }) {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      return data as Profile;
    },
  });

  if (isLoading) {
    return (
      <div 
        className="rounded-[32px] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="h-32 bg-white/5 animate-pulse" />
        <div className="p-6 relative pt-0">
          <div className="flex justify-between items-end -mt-12 mb-4">
            <div className="h-24 w-24 rounded-full border-4 border-[#0a1020] bg-white/10 animate-pulse" />
            <div className="h-9 w-28 rounded-xl bg-white/5 animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="h-6 w-40 bg-white/5 animate-pulse rounded" />
            <div className="h-4 w-28 bg-white/5 animate-pulse rounded" />
            <div className="h-4 w-full max-w-md bg-white/5 animate-pulse rounded mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const initials = (profile.username || "U").slice(0, 2).toUpperCase();

  return (
    <div 
      className="rounded-[32px] overflow-hidden shadow-2xl relative"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 48px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Top Banner Gradient */}
      <div 
        className="h-36 md:h-48 relative"
        style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(59,130,246,0.3) 100%)",
        }}
      >
        {/* Glow behind banner */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-xs font-bold shadow-lg">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Forum Member</span>
        </div>
      </div>

      {/* Profile Info Container */}
      <div className="p-6 md:p-8 pt-0 relative z-10">
        {/* Avatar + Actions row */}
        <div className="flex flex-wrap items-end justify-between -mt-16 md:-mt-20 mb-6 gap-4">
          <div className="relative">
            <div 
              className="h-28 w-28 md:h-36 md:w-36 rounded-full flex items-center justify-center text-3xl font-bold border-[6px] border-[#0a1020] shadow-2xl"
              style={{
                background: profile.avatar_url ? `url(${profile.avatar_url}) center/cover` : "linear-gradient(135deg, #7c3aed, #3b82f6)",
                color: "white"
              }}
            >
              {!profile.avatar_url && initials}
            </div>
            {/* Online Indicator */}
            <span className="absolute bottom-2 right-2 h-6 w-6 rounded-full border-4 border-[#0a1020] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/profile/edit"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-2xl transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                boxShadow: "0 4px 15px rgba(124,58,237,0.4)"
              }}
            >
              <Edit3 className="h-4 w-4" />
              Edit Profil
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-white/60 bg-white/5 hover:bg-white/10 hover:text-white transition-all rounded-2xl border border-white/10"
              title="Pengaturan"
            >
              <Settings className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* User Titles & Bio */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-snug">
              {profile.username}
            </h1>
            {profile.full_name && (
              <p className="text-sm font-semibold text-white/50 mt-1">
                {profile.full_name}
              </p>
            )}
          </div>

          {profile.bio ? (
            <p 
              className="text-sm text-white/80 leading-relaxed max-w-2xl p-4 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)"
              }}
            >
              {profile.bio}
            </p>
          ) : (
            <p className="text-sm font-medium text-white/30 italic">
              Belum ada bio yang ditulis.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-white/60">
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}
            >
              <Shield className="h-3.5 w-3.5 text-violet-400" />
              <span className="capitalize text-violet-300">{profile.role}</span>
            </div>
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <CalendarDays className="h-3.5 w-3.5 text-white/40" />
              <span>Bergabung {formatDate(profile.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
