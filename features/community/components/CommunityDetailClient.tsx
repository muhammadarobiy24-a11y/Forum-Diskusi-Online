"use client";

import { Hash, FileText } from "lucide-react";
import type { Community } from "../types/community";

interface CommunityDetailClientProps {
  community: Community;
}

export default function CommunityDetailClient({ community }: CommunityDetailClientProps) {
  return (
    <div className="max-w-2xl space-y-4">

      {/* Welcome message — Discord style system message */}
      <div className="flex gap-4 py-3">
        <div className="h-10 w-10 rounded-full bg-[var(--dc-blurple)] flex items-center justify-center shrink-0">
          <Hash className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-[var(--dc-text-primary)] text-base">
            Selamat datang di #{" "}
            <span className="text-[var(--dc-blurple)]">general</span>!
          </p>
          <p className="text-sm text-[var(--dc-text-muted)] mt-0.5">
            Ini adalah awal dari channel <strong>#general</strong> di community{" "}
            <strong>{community.name}</strong>.
          </p>
          {community.description && (
            <p className="text-sm text-[var(--dc-text-channel)] mt-2 bg-[var(--dc-hover)] rounded-lg px-3 py-2">
              {community.description}
            </p>
          )}
        </div>
      </div>

      {/* Divider dengan tanggal — Discord style */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[var(--dc-hover)]" />
        <span className="text-[10px] font-semibold text-[var(--dc-text-channel)] whitespace-nowrap">
          Hari ini
        </span>
        <div className="flex-1 h-px bg-[var(--dc-hover)]" />
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-16 w-16 rounded-full bg-[var(--dc-hover)] flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-[var(--dc-text-channel)]" />
        </div>
        <p className="font-semibold text-[var(--dc-text-primary)] mb-1">
          Belum ada post
        </p>
        <p className="text-sm text-[var(--dc-text-channel)] max-w-xs">
          Jadilah yang pertama memulai percakapan di{" "}
          <span className="text-[var(--dc-text-primary)]">{community.name}</span>!
        </p>
      </div>
    </div>
  );
}
