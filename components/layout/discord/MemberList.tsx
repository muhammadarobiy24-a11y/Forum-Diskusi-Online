"use client";

import { Users, FileText, Eye, ShieldCheck, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import type { Community } from "@/features/community/types/community";
import JoinButton from "@/features/community/components/JoinButton";

interface CommunityInfoPanelProps {
  community?: Community | null;
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl p-3 transition-colors"
      style={{
        background: accent
          ? "rgba(124,58,237,0.08)"
          : "rgba(255,255,255,0.03)",
        border: accent
          ? "1px solid rgba(124,58,237,0.20)"
          : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: accent
            ? "rgba(124,58,237,0.20)"
            : "rgba(255,255,255,0.06)",
        }}
      >
        <Icon className="h-4 w-4 text-white/60" />
      </div>
      <div>
        <p className="text-[13px] font-bold text-white/90 leading-tight">
          {value}
        </p>
        <p className="text-[11px] text-white/40 leading-tight">{label}</p>
      </div>
    </div>
  );
}

export default function MemberList({ community }: CommunityInfoPanelProps) {
  if (!community) return null;

  const createdAgo = formatDistanceToNow(new Date(community.created_at), {
    addSuffix: true,
    locale: id,
  });

  const visibilityLabel: Record<string, string> = {
    public: "Publik",
    restricted: "Terbatas",
    private: "Privat",
  };

  return (
    <aside
      className="hidden xl:flex flex-col w-72 shrink-0 overflow-y-auto"
      style={{
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderLeft: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="p-4 space-y-4">
        {/* Section: About */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/35 mb-3">
            Tentang Komunitas
          </p>

          {/* Community name card */}
          <div
            className="rounded-2xl p-4 mb-3"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="h-10 w-10 rounded-xl overflow-hidden flex items-center justify-center text-base font-black text-white shrink-0"
                style={{
                  background: community.icon_url
                    ? undefined
                    : "linear-gradient(135deg, #7c3aed, #3b82f6)",
                  backgroundImage: community.icon_url
                    ? `url(${community.icon_url})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!community.icon_url &&
                  (community.name?.[0] ?? "?").toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-white truncate">
                    {community.name}
                  </p>
                  {community.is_verified && (
                    <ShieldCheck className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-white/40 capitalize">
                  {visibilityLabel[community.visibility] ?? community.visibility}
                </p>
              </div>
            </div>

            {community.description && (
              <p className="text-[12px] text-white/55 leading-relaxed line-clamp-4">
                {community.description}
              </p>
            )}
          </div>

          {/* Join button */}
          <JoinButton communityId={community.id} />
        </div>

        {/* Section: Stats */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/35 mb-3">
            Statistik
          </p>
          <div className="space-y-2">
            <StatCard
              icon={Users}
              label="Anggota"
              value={community.member_count.toLocaleString("id-ID")}
              accent
            />
            <StatCard
              icon={FileText}
              label="Postingan"
              value={community.post_count.toLocaleString("id-ID")}
            />
            <StatCard
              icon={Eye}
              label="Visibilitas"
              value={visibilityLabel[community.visibility] ?? community.visibility}
            />
            <StatCard
              icon={Calendar}
              label="Dibuat"
              value={createdAgo}
            />
          </div>
        </div>

        {/* Footer note */}
        <p className="text-[11px] text-white/25 text-center pb-2">
          Komunitas ini dikelola oleh anggota aktif.
        </p>
      </div>
    </aside>
  );
}
