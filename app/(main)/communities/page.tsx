import Link from "next/link";
import { Plus, Compass, TrendingUp } from "lucide-react";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import CommunityList from "@/features/community/components/CommunityList";

export default function CommunitiesPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChannelHeader channelDescription="Temukan dan bergabung dengan komunitas sesuai minatmu" />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 py-8">

          {/* Hero */}
          <div
            className="relative rounded-2xl overflow-hidden mb-8 p-7"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.22) 0%, rgba(59,130,246,0.18) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Glow bg */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top left, rgba(124,58,237,0.18), transparent 60%)",
              }}
            />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <Compass className="h-5 w-5 text-violet-300" />
                  </div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Jelajahi Komunitas
                  </h1>
                </div>
                <p className="text-sm text-white/60 font-medium max-w-md">
                  Bergabung dengan komunitas yang membahas topik favoritmu dan mulai berdiskusi.
                </p>
              </div>

              <Link
                href="/communities/create"
                className="forum-btn-accent inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm shrink-0 self-start sm:self-auto"
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                Buat Komunitas
              </Link>
            </div>
          </div>

          {/* Section header */}
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="h-4 w-4 text-violet-400" />
            <h2 className="text-[13px] font-bold uppercase tracking-widest text-white/50">
              Semua Komunitas
            </h2>
          </div>

          <CommunityList />

          <div className="h-12" />
        </div>
      </div>
    </div>
  );
}
