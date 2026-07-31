import { notFound } from "next/navigation";
import { Settings, Lock } from "lucide-react";
import { getCommunity } from "@/features/community/services/community.service";
import { createClient } from "@/lib/supabase/server";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import MemberList from "@/components/layout/discord/MemberList";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CommunitySettingsPage({ params }: Props) {
  const { slug } = await params;
  const community = await getCommunity(slug);

  if (!community) notFound();

  // Cek apakah user yang sedang login adalah owner
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isOwner = user?.id === community.owner_id;

  return (
    <>
      <ChannelHeader
        channelName={`${community.name} — Pengaturan`}
        channelDescription="Kelola komunitas Anda"
        communitySlug={slug}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-5 py-8 space-y-5">

            {!isOwner ? (
              /* Non-owner: akses ditolak */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.25)" }}>
                  <Lock className="h-8 w-8 text-red-400" />
                </div>
                <p className="font-bold text-lg text-white/80 mb-2">Akses Terbatas</p>
                <p className="text-sm text-white/45 max-w-xs">
                  Hanya owner komunitas yang dapat mengakses halaman pengaturan.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-white text-base">Pengaturan Komunitas</h1>
                    <p className="text-xs text-white/40">Kelola informasi dan aturan komunitas</p>
                  </div>
                </div>

                {/* Info cards */}
                {[
                  { label: "Nama",        value: community.name          },
                  { label: "Slug",         value: community.slug          },
                  { label: "Visibilitas",  value: community.visibility    },
                  { label: "NSFW",         value: community.is_nsfw ? "Ya" : "Tidak" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between px-5 py-4 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <span className="text-sm font-semibold text-white/50">{label}</span>
                    <span className="text-sm font-bold text-white/90 capitalize">{value}</span>
                  </div>
                ))}

                {/* Coming soon notice */}
                <div className="rounded-xl px-5 py-4 text-sm text-white/40 text-center"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.10)" }}>
                  Form edit komunitas akan tersedia segera.
                </div>
              </>
            )}

          </div>
        </div>

        <MemberList community={community} />
      </div>
    </>
  );
}
