"use client";

import { useState } from "react";
import { Hash, Bell, Pin, Users, Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUnreadNotifications } from "@/hooks/useUnreadNotifications";
import { useSession } from "@/components/providers/SessionProvider";
import Link from "next/link";
import MobileDiscordNav from "./MobileDiscordNav";

interface ChannelHeaderProps {
  channelName?: string;
  channelDescription?: string;
  showMemberList?: boolean;
  onToggleMemberList?: () => void;
  communitySlug?: string;
}

export default function ChannelHeader({
  channelName = "general",
  channelDescription,
  showMemberList,
  onToggleMemberList,
  communitySlug,
}: ChannelHeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { user } = useSession();
  const { data: unreadCount } = useUnreadNotifications(user?.id);
  const hasUnread = (unreadCount ?? 0) > 0;

  return (
    <>
      <header className="flex h-12 items-center gap-3 px-4 border-b border-[var(--dc-hover)] dc-chat-bg shrink-0 z-10">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className="lg:hidden text-[var(--dc-text-muted)] hover:text-[var(--dc-text-primary)] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Channel name */}
        <div className="flex items-center gap-2 min-w-0">
          <Hash className="h-5 w-5 text-[var(--dc-text-muted)] shrink-0" />
          <span className="font-semibold text-sm text-[var(--dc-text-primary)] truncate">
            {channelName}
          </span>
        </div>

        {/* Description divider */}
        {channelDescription && (
          <>
            <div className="h-5 w-px bg-[var(--dc-hover)] shrink-0" />
            <p className="text-xs text-[var(--dc-text-muted)] truncate hidden sm:block">
              {channelDescription}
            </p>
          </>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-1">
          {onToggleMemberList && (
            <button
              onClick={onToggleMemberList}
              className={cn(
                "rounded p-1.5 transition-colors",
                showMemberList
                  ? "text-[var(--dc-text-primary)] bg-[var(--dc-hover)]"
                  : "text-[var(--dc-text-muted)] hover:text-[var(--dc-text-primary)] hover:bg-[var(--dc-hover)]"
              )}
              aria-label="Toggle member list"
            >
              <Users className="h-5 w-5" />
            </button>
          )}

          <Link
            href="/notifications"
            className="relative rounded p-1.5 text-[var(--dc-text-muted)] hover:text-[var(--dc-text-primary)] hover:bg-[var(--dc-hover)] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {hasUnread && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--dc-red)] text-[9px] font-bold text-white">
                {(unreadCount ?? 0) > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>

          <button
            className="rounded p-1.5 text-[var(--dc-text-muted)] hover:text-[var(--dc-text-primary)] hover:bg-[var(--dc-hover)] transition-colors"
            aria-label="Pinned messages"
          >
            <Pin className="h-5 w-5" />
          </button>

          {/* Search bar */}
          <div className="hidden md:flex items-center gap-1.5 rounded bg-[var(--dc-server-rail)] px-2 py-1 w-36">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-xs text-[var(--dc-text-primary)] placeholder:text-[var(--dc-text-channel)] outline-none flex-1 w-full"
            />
            <Search className="h-3.5 w-3.5 text-[var(--dc-text-channel)] shrink-0" />
          </div>
        </div>
      </header>

      <MobileDiscordNav
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        communitySlug={communitySlug}
      />
    </>
  );
}
