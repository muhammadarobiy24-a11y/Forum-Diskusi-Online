"use client";

import Link from "next/link";
import { Users, FileText, ShieldCheck, ChevronRight } from "lucide-react";
import type { Community } from "../types/community";

interface CommunityCardProps {
  community: Community;
}

export default function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link href={`/communities/${community.slug}`} className="block">
      <div 
        className="group relative flex items-center gap-4 p-4 md:p-5 rounded-[24px] transition-all duration-500 hover:-translate-y-1"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at top left, rgba(59,130,246,0.1), transparent 60%)",
            border: "1px solid rgba(96,165,250,0.2)",
          }}
        />

        {/* Icon */}
        <div 
          className="relative h-14 w-14 shrink-0 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] z-10"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {community.icon_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={community.icon_url}
              alt={community.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span 
              className="text-2xl font-black"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              {(community.name?.[0] ?? "?").toUpperCase()}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 z-10">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white/90 group-hover:text-white transition-colors truncate">
              {community.name}
            </span>
            {community.is_verified && (
              <ShieldCheck className="h-4 w-4 text-blue-400 shrink-0" />
            )}
          </div>
          <p className="text-sm font-medium text-white/50 truncate mt-0.5">
            {community.description || "Tidak ada deskripsi."}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs font-semibold text-white/40">
            <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
              <Users className="h-3.5 w-3.5" />
              {community.member_count.toLocaleString("id-ID")} members
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
              <FileText className="h-3.5 w-3.5" />
              {community.post_count.toLocaleString("id-ID")} posts
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 shrink-0 z-10">
          <ChevronRight className="h-4 w-4 text-white" />
        </div>
      </div>
    </Link>
  );
}
