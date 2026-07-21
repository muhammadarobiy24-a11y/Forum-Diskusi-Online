import Link from "next/link";
import { Hash, Plus, Compass } from "lucide-react";

import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import CommunityList from "@/features/community/components/CommunityList";

export default function CommunitiesPage() {
  return (
    <>
      <ChannelHeader
        channelName="communities"
        channelDescription="Temukan dan bergabung dengan komunitas sesuai minatmu"
      />

      <div className="flex-1 overflow-y-auto dc-chat-bg">
        <div className="mx-auto max-w-4xl px-6 py-6">

          {/* Hero banner */}
          <div className="relative rounded-lg overflow-hidden mb-8 bg-gradient-to-r from-[var(--dc-blurple)] to-[oklch(0.50_0.22_290)] p-8">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Compass className="h-6 w-6 text-white/80" />
                <h1 className="text-2xl font-bold text-white">
                  Explore Communities
                </h1>
              </div>
              <p className="text-white/70 text-sm mb-4">
                Bergabung dengan ribuan komunitas yang membahas topik favoritmu
              </p>
              <Link
                href="/communities/create"
                className="inline-flex items-center gap-2 rounded bg-white/20 hover:bg-white/30 px-4 py-2 text-sm font-semibold text-white transition-colors border border-white/20"
              >
                <Plus className="h-4 w-4" />
                Create Community
              </Link>
            </div>
            {/* decorative circles */}
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
            <div className="absolute -right-4 -bottom-10 h-56 w-56 rounded-full bg-white/5" />
          </div>

          {/* Section header */}
          <div className="flex items-center gap-2 mb-4">
            <Hash className="h-4 w-4 text-[var(--dc-text-channel)]" />
            <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--dc-text-channel)]">
              All Communities
            </h2>
          </div>

          <CommunityList />
        </div>
      </div>
    </>
  );
}
