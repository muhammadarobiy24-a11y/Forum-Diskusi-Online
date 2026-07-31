import { notFound } from "next/navigation";

import { getCommunity } from "@/features/community/services/community.service";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import MemberList from "@/components/layout/discord/MemberList";
import CommunityDetailClient from "@/features/community/components/CommunityDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CommunityDetailPage({ params }: Props) {
  const { slug } = await params;
  const community = await getCommunity(slug);

  if (!community) notFound();

  return (
    <>
      <ChannelHeader
        channelName={community.name}
        channelDescription={community.description ?? undefined}
        communitySlug={slug}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Main content — scrollable feed + inline post form */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          <CommunityDetailClient community={community} />
        </div>

        {/* Community info panel */}
        <MemberList community={community} />
      </div>
    </>
  );
}
