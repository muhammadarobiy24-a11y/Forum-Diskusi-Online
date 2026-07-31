"use client";

import Link from "next/link";
import { Users, FileText, ShieldCheck, ChevronRight } from "lucide-react";
import type { Community } from "../types/community";

const CARD_ACCENTS = [
  { bg: "#f0edff", border: "#d4caff", icon: "#ede9fe", iconColor: "#7c3aed" },
  { bg: "#fff4ed", border: "#ffd5b4", icon: "#fef3e2", iconColor: "#ea8c00" },
  { bg: "#edf6ff", border: "#b3d9ff", icon: "#dbeafe", iconColor: "#1d72d1" },
  { bg: "#edfff5", border: "#b6f5d3", icon: "#dcfce7", iconColor: "#15803d" },
];

function getAccent(id: string) {
  const sum = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return CARD_ACCENTS[sum % CARD_ACCENTS.length];
}

export default function CommunityCard({ community }: { community: Community }) {
  const accent = getAccent(community.id);

  return (
    <Link href={`/communities/${community.slug}`} className="block">
      <div
        className="group flex items-center gap-4 p-4 rounded-[28px] transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: accent.bg,
          border: `1px solid ${accent.border}`,
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}
      >
        {/* Icon */}
        <div
          className="h-12 w-12 shrink-0 rounded-[20px] overflow-hidden flex items-center justify-center text-xl font-black transition-transform duration-200 group-hover:scale-105"
          style={{ background: accent.icon, border: `1px solid ${accent.border}` }}
        >
          {community.icon_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={community.icon_url} alt={community.name} className="h-full w-full object-cover" />
          ) : (
            <span style={{ color: accent.iconColor }}>{(community.name?.[0] ?? "?").toUpperCase()}</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base text-[var(--forum-text-primary)] truncate">
              {community.name}
            </span>
            {community.is_verified && <ShieldCheck className="h-4 w-4 text-violet-500 shrink-0" />}
          </div>
          <p className="text-sm text-[var(--forum-text-secondary)] truncate mt-0.5">
            {community.description || "Tidak ada deskripsi."}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--forum-text-muted)] px-2 py-0.5 rounded-lg"
              style={{ background: "rgba(0,0,0,0.06)" }}>
              <Users className="h-3.5 w-3.5" />
              {community.member_count.toLocaleString("id-ID")} anggota
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--forum-text-muted)] px-2 py-0.5 rounded-lg"
              style={{ background: "rgba(0,0,0,0.06)" }}>
              <FileText className="h-3.5 w-3.5" />
              {community.post_count.toLocaleString("id-ID")} post
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="h-4 w-4 text-[var(--forum-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </div>
    </Link>
  );
}
