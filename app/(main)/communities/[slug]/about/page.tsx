import { notFound } from "next/navigation";
import { Calendar, Users, FileText, Eye, ShieldCheck, Lock, Globe } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { getCommunity } from "@/features/community/services/community.service";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import MemberList from "@/components/layout/discord/MemberList";
import JoinButton from "@/features/community/components/JoinButton";

interface Props {
  params: Promise<{ slug: string }>;
}

const VISIBILITY_LABEL: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  public:     { label: "Publik",    icon: Globe,  color: "text-emerald-400" },
  restricted: { label: "Terbatas", icon: Lock,   color: "text-amber-400"   },
  private:    { label: "Privat",   icon: Lock,   color: "text-red-400"     },
};

export default async function CommunityAboutPage({ params }: Props) {
  const { slug } = await params;
  const community = await getCommunity(slug);

  if (!community) notFound();

  const createdAgo = formatDistanceToNow(new Date(community.created_at), {
    addSuffix: true,
    locale: id,
  });

  const vis = VISIBILITY_LABEL[community.visibility] ?? VISIBILITY_LABEL.public;
  const VisIcon = vis.icon;

  return (
    <>
      <ChannelHeader
        channelName={`${community.name} — Tentang`}
        channelDescription="Informasi lengkap tentang komunitas ini"
        communitySlug={slug}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-5 py-8 space-y-6">

            {/* Hero card */}
            <div className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Banner */}
              <div className="h-32 relative">
                {community.banner_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={community.banner_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-violet-600/40 via-blue-500/25 to-transparent" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="px-6 pb-6">
                {/* Icon + name */}
                <div className="flex items-end gap-4 -mt-8 mb-4">
                  <div className="h-16 w-16 rounded-2xl border-4 overflow-hidden flex items-center justify-center text-2xl font-black text-white shrink-0 shadow-xl"
                    style={{
                      background: community.icon_url ? undefined : "linear-gradient(135deg, #7c3aed, #3b82f6)",
                      borderColor: "rgba(0,0,0,0.5)",
                    }}>
                    {community.icon_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={community.icon_url} alt={community.name} className="h-full w-full object-cover" />
                    ) : (
                      (community.name?.[0] ?? "?").toUpperCase()
                    )}
                  </div>
                  <div className="pb-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-black text-white truncate">{community.name}</h1>
                      {community.is_verified && (
                        <ShieldCheck className="h-5 w-5 text-violet-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-white/45">r/{community.slug}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-white/70 leading-relaxed mb-5">
                  {community.description || "Tidak ada deskripsi untuk komunitas ini."}
                </p>

                {/* Join button */}
                <JoinButton communityId={community.id} />
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users,    label: "Anggota",   value: community.member_count.toLocaleString("id-ID") },
                { icon: FileText, label: "Postingan",  value: community.post_count.toLocaleString("id-ID") },
                { icon: Calendar, label: "Dibuat",    value: createdAgo },
                { icon: VisIcon,  label: "Visibilitas",value: vis.label, color: vis.color },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <Icon className={`h-4 w-4 shrink-0 ${color ?? "text-violet-400"}`} />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-bold text-white/90 truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* NSFW badge */}
            {community.is_nsfw && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-400"
                style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.25)" }}>
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
