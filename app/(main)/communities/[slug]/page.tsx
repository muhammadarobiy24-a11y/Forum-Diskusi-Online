import { notFound } from "next/navigation";
import { ShieldCheck, Lock, EyeOff } from "lucide-react";

import { getCommunity } from "@/features/community/services/community.service";
import JoinButton from "@/features/community/components/JoinButton";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import MemberList from "@/components/layout/discord/MemberList";
import CommunityDetailClient from "@/features/community/components/CommunityDetailClient";

interface CommunityDetailPageProps {
  params: Promise<{ slug: string }>;
}

function VisibilityBadge({
  visibility,
}: {
  visibility: "public" | "restricted" | "private";
}) {
  if (visibility === "public") return null;

  if (visibility === "restricted") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-400">
        <Lock className="h-2.5 w-2.5" />
        Restricted
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-medium text-red-400">
      <EyeOff className="h-2.5 w-2.5" />
      Private
    </span>
  );
}

export default async function CommunityDetailPage({
  params,
}: CommunityDetailPageProps) {
  const { slug } = await params;
  const community = await getCommunity(slug);

  if (!community) notFound();

  return (
    <>
      <ChannelHeader
        channelName="general"
        channelDescription={community.description ?? community.name}
        showMemberList={true}
        communitySlug={slug}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Main chat area */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

          {/* Community banner + info strip */}
          <div className="relative h-24 shrink-0 overflow-hidden">
            {community.banner_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={community.banner_url}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--dc-blurple)]/50 to-[oklch(0.50_0.22_290)]/30" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--dc-chat-bg)] via-[var(--dc-chat-bg)]/20 to-transparent" />

            {/* community icon over banner */}
            <div className="absolute bottom-3 left-5 flex items-end gap-3">
              <div className="h-14 w-14 rounded-2xl border-4 border-[var(--dc-chat-bg)] overflow-hidden bg-[var(--dc-hover)] flex items-center justify-center shadow-lg">
                {community.icon_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={community.icon_url} alt={community.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xl font-bold text-[var(--dc-text-primary)]">
                    {(community.name?.[0] ?? "?").toUpperCase()}
                  </span>
                )}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="font-bold text-[var(--dc-text-primary)] text-base leading-tight">
                    {community.name}
                  </h1>
                  {community.is_verified && (
                    <ShieldCheck className="h-4 w-4 text-[var(--dc-blurple)]" />
                  )}
                  <VisibilityBadge visibility={community.visibility} />
                </div>
                <p className="text-xs text-[var(--dc-text-channel)]">
                  r/{community.slug}
                </p>
              </div>
            </div>

            {/* Join button */}
            <div className="absolute bottom-3 right-5">
              <JoinButton communityId={community.id} />
            </div>
          </div>

          {/* Posts feed */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <CommunityDetailClient community={community} />
          </div>
        </div>

        {/* Member list panel */}
        <MemberList community={community} />
      </div>
    </>
  );
}
