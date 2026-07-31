import { notFound } from "next/navigation";
import { Users, Crown, Shield, User } from "lucide-react";
import { getCommunity } from "@/features/community/services/community.service";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import MemberList from "@/components/layout/discord/MemberList";

interface Props {
  params: Promise<{ slug: string }>;
}

function RoleBadge({ role }: { role: string }) {
  if (role === "owner") {
    return (
      <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold text-amber-400"
        style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)" }}>
        <Crown className="h-2.5 w-2.5" /> Owner
      </span>
    );
  }
  if (role === "moderator") {
    return (
      <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold text-violet-400"
        style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)" }}>
        <Shield className="h-2.5 w-2.5" /> Moderator
      </span>
    );
  }
  return null;
}

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
          <div className="max-w-3xl mx-auto px-5 py-8 space-y-6">

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Total Anggota", value: community.member_count.toLocaleString("id-ID"), icon: Users },
                { label: "Total Postingan", value: community.post_count.toLocaleString("id-ID"), icon: User },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-2xl font-black text-white mb-1">{value}</p>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-white/40">
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Member list info */}
            <div className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h2 className="font-bold text-white/90 mb-4 flex items-center gap-2">
                <Users className="h-4 w-4 text-violet-400" />
                Anggota Community
              </h2>
              <p className="text-sm text-white/50 text-center py-8">
                Daftar anggota lengkap akan tersedia setelah fitur membership penuh diimplementasikan.
                <br />
                <span className="text-white/30 text-xs mt-2 block">
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
