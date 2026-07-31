import { notFound } from "next/navigation";
import { Settings, Lock } from "lucide-react";
import { getCommunity } from "@/features/community/services/community.service";
import { createClient } from "@/lib/supabase/server";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import MemberList from "@/components/layout/discord/MemberList";

interface Props { params: Promise<{ slug: string }> }

export default async function CommunitySettingsPage({ params }: Props) {
  const { slug } = await params;
  const community = await getCommunity(slug);
  if (!community) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isOwner = user?.id === community.owner_id;

  return (
    <>
      <ChannelHeader channelName={`${community.name} — Pengaturan`} channelDescription="Kelola komunitas Anda" communitySlug={slug} />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-5 py-6 space-y-4">

            {!isOwner ? (
              <div className="flex flex-col items-center justify-center py-20 text-center rounded-[28px]"
                style={{ background: "#fff0f0", border: "1px solid #fecaca" }}>
                <div className="h-16 w-16 rounded-[24px] flex items-center justify-center mb-5"
                  style={{ background: "#fee2e2", border: "1px solid #fecaca" }}>
                  <Lock className="h-8 w-8 text-red-400" />
                </div>
                <p className="font-bold text-lg text-[var(--forum-text-primary)] mb-2">Akses Terbatas</p>
                <p className="text-sm text-[var(--forum-text-muted)] max-w-xs">
                  Hanya owner komunitas yang dapat mengakses halaman pengaturan.
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-[28px] p-5" style={{ background: "#f0edff", border: "1px solid #d4caff" }}>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-[16px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h1 className="font-bold text-[var(--forum-text-primary)] text-base">Pengaturan Komunitas</h1>
                      <p className="text-xs text-[var(--forum-text-muted)]">Kelola informasi dan aturan komunitas</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] overflow-hidden" style={{ background: "#fff", border: "1px solid #e8e6f0" }}>
                  {[
                    { label: "Nama",       value: community.name       },
                    { label: "Slug",       value: community.slug       },
                    { label: "Visibilitas",value: community.visibility },
                    { label: "NSFW",       value: community.is_nsfw ? "Ya" : "Tidak" },
                  ].map(({ label, value }, i, arr) => (
                    <div key={label} className={`flex items-center justify-between px-6 py-4 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                      <span className="text-sm font-semibold text-[var(--forum-text-muted)]">{label}</span>
                      <span className="text-sm font-bold text-[var(--forum-text-primary)] capitalize">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-[20px] px-5 py-4 text-sm text-[var(--forum-text-muted)] text-center"
                  style={{ background: "#faf9f6", border: "1px dashed #d1cfe8" }}>
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
