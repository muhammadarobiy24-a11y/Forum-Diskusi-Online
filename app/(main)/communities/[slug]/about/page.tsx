import { notFound } from "next/navigation";
import { Calendar, Users, FileText, Eye, ShieldCheck, Lock, Globe } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { getCommunity } from "@/features/community/services/community.service";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import MemberList from "@/components/layout/discord/MemberList";
import JoinButton from "@/features/community/components/JoinButton";

interface Props { params: Promise<{ slug: string }> }

const VIS: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  public:     { label: "Publik",   icon: Globe, color: "text-emerald-500" },
  restricted: { label: "Terbatas", icon: Lock,  color: "text-amber-500"   },
  private:    { label: "Privat",   icon: Lock,  color: "text-red-500"     },
};

export default async function CommunityAboutPage({ params }: Props) {
  const { slug } = await params;
  const community = await getCommunity(slug);
  if (!community) notFound();

  const createdAgo = formatDistanceToNow(new Date(community.created_at), { addSuffix: true, locale: id });
  const vis = VIS[community.visibility] ?? VIS.public;
  const VisIcon = vis.icon;

  return (
    <>
      <ChannelHeader channelName={`${community.name} — Tentang`} communitySlug={slug} />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-5 py-6 space-y-4">

            {/* Hero card */}
            <div className="rounded-[28px] overflow-hidden" style={{ background: "#fff", border: "1px solid #e8e6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div className="h-28 relative">
                {community.banner_url
                  ? <img src={community.banner_url} alt="" className="h-full w-full object-cover" />
                  : <div className="h-full w-full bg-gradient-to-br from-violet-100 via-blue-50 to-white" />}
              </div>
              <div className="px-6 pb-6">
                <div className="flex items-end gap-4 -mt-8 mb-4">
                  <div className="h-16 w-16 rounded-[20px] border-4 border-white overflow-hidden flex items-center justify-center text-2xl font-black text-white shrink-0 shadow-md"
                    style={{ background: community.icon_url ? undefined : "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
                    {community.icon_url
                      ? <img src={community.icon_url} alt={community.name} className="h-full w-full object-cover" />
                      : (community.name?.[0] ?? "?").toUpperCase()}
                  </div>
                  <div className="pb-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-black text-[var(--forum-text-primary)] truncate">{community.name}</h1>
                      {community.is_verified && <ShieldCheck className="h-5 w-5 text-violet-500 shrink-0" />}
                    </div>
                    <p className="text-sm text-[var(--forum-text-muted)]">r/{community.slug}</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--forum-text-secondary)] leading-relaxed mb-5">
                  {community.description || "Tidak ada deskripsi untuk komunitas ini."}
                </p>
                <JoinButton communityId={community.id} />
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users,   label: "Anggota",     value: community.member_count.toLocaleString("id-ID"), bg: "#f0edff", border: "#d4caff" },
                { icon: FileText,label: "Postingan",    value: community.post_count.toLocaleString("id-ID"),   bg: "#fff4ed", border: "#ffd5b4" },
                { icon: Calendar,label: "Dibuat",       value: createdAgo,                                     bg: "#edfff5", border: "#b6f5d3" },
                { icon: VisIcon, label: "Visibilitas",  value: vis.label, color: vis.color,                    bg: "#edf6ff", border: "#b3d9ff" },
              ].map(({ icon: Icon, label, value, bg, border, color }) => (
                <div key={label} className="flex items-center gap-3 rounded-[20px] p-4" style={{ background: bg, border: `1px solid ${border}` }}>
                  <Icon className={`h-4 w-4 shrink-0 ${color ?? "text-violet-500"}`} />
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-[var(--forum-text-muted)] uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-bold text-[var(--forum-text-primary)] truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {community.is_nsfw && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-[20px] text-sm font-semibold text-red-500"
                style={{ background: "#fff0f0", border: "1px solid #fecaca" }}>
                Komunitas ini ditandai sebagai NSFW (konten dewasa).
              </div>
            )}
          </div>
        </div>
        <MemberList community={community} />
      </div>
    </>
  );
}
