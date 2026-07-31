import { notFound } from "next/navigation";
import { Users, User } from "lucide-react";
import { getCommunity } from "@/features/community/services/community.service";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import MemberList from "@/components/layout/discord/MemberList";

interface Props { params: Promise<{ slug: string }> }

export default async function CommunityMembersPage({ params }: Props) {
  const { slug } = await params;
  const community = await getCommunity(slug);
  if (!community) notFound();

  return (
    <>
      <ChannelHeader
        channelName={`${community.name} — Anggota`}
        channelDescription={`${community.member_count.toLocaleString("id-ID")} anggota terdaftar`}
        communitySlug={slug}
      />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-5 py-6 space-y-4">

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total Anggota",   value: community.member_count.toLocaleString("id-ID"), icon: Users, bg: "#f0edff", border: "#d4caff" },
                { label: "Total Postingan", value: community.post_count.toLocaleString("id-ID"),   icon: User,  bg: "#fff4ed", border: "#ffd5b4" },
              ].map(({ label, value, icon: Icon, bg, border }) => (
                <div key={label} className="rounded-[24px] p-5" style={{ background: bg, border: `1px solid ${border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <p className="text-2xl font-black text-[var(--forum-text-primary)] mb-1">{value}</p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--forum-text-muted)]">
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Member list */}
            <div className="rounded-[28px] p-6" style={{ background: "#fff", border: "1px solid #e8e6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <h2 className="font-bold text-[var(--forum-text-primary)] mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-violet-500" />
                Anggota Community
              </h2>
              <p className="text-sm text-[var(--forum-text-muted)] text-center py-8">
                Daftar anggota lengkap akan tersedia setelah fitur membership penuh diimplementasikan.
                <br />
                <span className="text-[var(--forum-text-muted)] text-xs mt-2 block">
                  Community ini memiliki {community.member_count.toLocaleString("id-ID")} anggota.
                </span>
              </p>
            </div>

          </div>
        </div>
        <MemberList community={community} />
      </div>
    </>
  );
}
