import Link from "next/link";
import { Plus, Compass, Users, Sparkles } from "lucide-react";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import CommunityList from "@/features/community/components/CommunityList";

/* ── Bento card wrapper ─────────────────────────────────── */
function BentoCard({
  children,
  className = "",
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: { bg: string; border: string };
}) {
  return (
    <div
      className={`rounded-[28px] p-5 ${className}`}
      style={{
        background: accent?.bg ?? "#ffffff",
        border: `1px solid ${accent?.border ?? "#e8e6f0"}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

export default function CommunitiesPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChannelHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1100px] mx-auto px-4 py-4 xl:px-6 xl:py-6">

          {/* ── Bento grid ────────────────────────────────────── */}
          <div className="flex flex-col xl:flex-row gap-4">

            {/* ── MAIN column ─────────────────────────────────── */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">

              {/* Row 1 — Hero card (lavender, 100%) */}
              <BentoCard accent={{ bg: "#f0edff", border: "#d4caff" }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div
                        className="h-9 w-9 rounded-[16px] flex items-center justify-center shrink-0"
                        style={{ background: "#ede9fe", border: "1px solid #d4caff" }}
                      >
                        <Compass className="h-5 w-5 text-violet-500" />
                      </div>
                      <h1 className="text-xl font-black text-[var(--forum-text-primary)] tracking-tight">
                        Jelajahi Komunitas
                      </h1>
                    </div>
                    <p className="text-sm text-[var(--forum-text-muted)] max-w-md">
                      Bergabung dengan komunitas yang membahas topik favoritmu dan mulai berdiskusi.
                    </p>
                  </div>
                  <Link
                    href="/communities/create"
                    className="forum-btn-accent inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm shrink-0 self-start sm:self-auto"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                    Buat Komunitas
                  </Link>
                </div>
              </BentoCard>

              {/* Row 2 — Community list card (putih, 100%) */}
              <BentoCard className="!p-5 sm:!p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Users className="h-4 w-4 text-violet-500" />
                  <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--forum-text-muted)]">
                    Semua Komunitas
                  </h2>
                </div>
                <CommunityList />
              </BentoCard>

            </div>

            {/* ── RIGHT column (xl only) ───────────────────────── */}
            <div className="hidden xl:flex flex-col gap-4 w-64 shrink-0">

              {/* Tips card */}
              <BentoCard accent={{ bg: "#fff4ed", border: "#ffd5b4" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-orange-400" />
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400">
                    Tips
                  </p>
                </div>
                <p className="text-sm text-[var(--forum-text-secondary)] leading-relaxed mb-4">
                  Buat komunitas sendiri dan jadilah moderator pertamanya!
                </p>
                <Link
                  href="/communities/create"
                  className="forum-btn-accent block w-full text-center py-2.5 rounded-full text-sm"
                >
                  + Buat Komunitas
                </Link>
              </BentoCard>

              {/* Info card */}
              <BentoCard accent={{ bg: "#edfff5", border: "#b6f5d3" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-emerald-500" />
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">
                    Komunitas
                  </p>
                </div>
                <p className="text-sm text-[var(--forum-text-secondary)] leading-relaxed">
                  Setiap komunitas punya topik, anggota, dan diskusi uniknya sendiri.
                  Bergabunglah dan mulai berdiskusi!
                </p>
              </BentoCard>

            </div>
          </div>

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
