import { notFound } from "next/navigation";

import { getCommunity } from "@/features/community/services/community.service";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import MemberList from "@/components/layout/discord/MemberList";
import CommunityDetailClient from "@/features/community/components/CommunityDetailClient";
import MessageInput from "@/features/community/components/MessageInput";

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
        {/* Main content */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* Feed + input */}
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto">
              <CommunityDetailClient community={community} />
            </div>
            <MessageInput community={community} />
          </div>
        </div>

        {/* Community info panel (right) */}
        <MemberList community={community} />
      </div>
    </>
  );
}
