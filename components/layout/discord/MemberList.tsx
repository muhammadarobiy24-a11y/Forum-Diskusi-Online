"use client";

import { Users, FileText, Eye, ShieldCheck, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import type { Community } from "@/features/community/types/community";
import JoinButton from "@/features/community/components/JoinButton";

interface Props {
  community?: Community | null;
}

function StatCard({
  icon: Icon, label, value, accent,
}: {
  icon: React.ElementType; label: string; value: string; accent?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-[20px] p-3"
      style={{
        background: accent ? "#f0edff" : "#faf9f6",
        border: accent ? "1px solid #d4caff" : "1px solid #e8e6e1",
      }}
    >
      <div
        className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: accent ? "#ede9fe" : "#f0eee8" }}
      >
        <Icon className="h-4 w-4" style={{ color: accent ? "#7c3aed" : "#8b87a0" }} />
      </div>
      <div>
        <p className="text-[13px] font-bold text-[var(--forum-text-primary)] leading-tight">{value}</p>
        <p className="text-[11px] text-[var(--forum-text-muted)] leading-tight">{label}</p>
      </div>
    </div>
  );
}

export default function MemberList({ community }: Props) {
  if (!community) return null;

  const createdAgo = formatDistanceToNow(new Date(community.created_at), {
    addSuffix: true, locale: id,
  });

  const visibilityLabel: Record<string, string> = {
    public: "Publik", restricted: "Terbatas", private: "Privat",
  };

  return (
    <aside
      className="hidden xl:flex flex-col w-72 shrink-0 overflow-y-auto"
      style={{
        background: "#faf9f6",
        borderLeft: "1px solid #e8e6e1",
      }}
    >
      <div className="p-4 space-y-4">
        {/* About */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--forum-text-muted)] mb-3">
            Tentang Komunitas
          </p>

          <div className="rounded-[24px] p-4 mb-3 bg-white" style={{ border: "1px solid #e8e6f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="h-10 w-10 rounded-[16px] overflow-hidden flex items-center justify-center text-base font-black text-white shrink-0"
                style={{
                  background: community.icon_url ? undefined : "linear-gradient(135deg, #7c3aed, #3b82f6)",
                  backgroundImage: community.icon_url ? `url(${community.icon_url})` : undefined,
                  backgroundSize: "cover", backgroundPosition: "center",
                }}
              >
                {!community.icon_url && (community.name?.[0] ?? "?").toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-[var(--forum-text-primary)] truncate">{community.name}</p>
                  {community.is_verified && <ShieldCheck className="h-3.5 w-3.5 text-violet-500 shrink-0" />}
                </div>
                <p className="text-[11px] text-[var(--forum-text-muted)] capitalize">
                  {visibilityLabel[community.visibility] ?? community.visibility}
                </p>
              </div>
            </div>
            {community.description && (
              <p className="text-[12px] text-[var(--forum-text-secondary)] leading-relaxed line-clamp-4">
                {community.description}
              </p>
            )}
          </div>

          <JoinButton communityId={community.id} />
        </div>

        {/* Stats */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--forum-text-muted)] mb-3">
            Statistik
          </p>
          <div className="space-y-2">
            <StatCard icon={Users} label="Anggota" value={community.member_count.toLocaleString("id-ID")} accent />
            <StatCard icon={FileText} label="Postingan" value={community.post_count.toLocaleString("id-ID")} />
            <StatCard icon={Eye} label="Visibilitas" value={visibilityLabel[community.visibility] ?? community.visibility} />
            <StatCard icon={Calendar} label="Dibuat" value={createdAgo} />
          </div>
        </div>

        <p className="text-[11px] text-[var(--forum-text-muted)] text-center pb-2">
          Komunitas ini dikelola oleh anggota aktif.
        </p>
      </div>
    </aside>
  );
}
