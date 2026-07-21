"use client";

import Link from "next/link";
import { Users, FileText, ShieldCheck, ChevronRight } from "lucide-react";
import type { Community } from "../types/community";

interface CommunityCardProps {
  community: Community;
}

export default function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link href={`/communities/${community.slug}`}>
      <div className="group flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-[var(--dc-hover)] cursor-pointer border border-transparent hover:border-[var(--dc-hover)]">

        {/* Icon */}
        <div className="relative h-12 w-12 shrink-0 rounded-2xl group-hover:rounded-xl overflow-hidden bg-[var(--dc-hover)] flex items-center justify-center transition-all duration-200">
          {community.icon_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={community.icon_url}
              alt={community.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-[var(--dc-text-primary)]">
              {(community.name?.[0] ?? "?").toUpperCase()}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm text-[var(--dc-text-primary)] truncate">
              {community.name}
            </span>
            {community.is_verified && (
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--dc-blurple)] shrink-0" />
            )}
          </div>
          <p className="text-xs text-[var(--dc-text-channel)] truncate mt-0.5">
            {community.description || "Tidak ada deskripsi."}
          </p>
          <div className="flex items-center gap-4 mt-1.5 text-[10px] text-[var(--dc-text-channel)]">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {community.member_count.toLocaleString("id-ID")} members
            </span>
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {community.post_count.toLocaleString("id-ID")} posts
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="h-4 w-4 text-[var(--dc-text-channel)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </div>
    </Link>
  );
}
