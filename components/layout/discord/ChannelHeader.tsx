"use client";

import { useState } from "react";
import { Hash, Bell, Pin, Users, Search, Menu, AtSign } from "lucide-react";
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

function HeaderIcon({
  children,
  label,
  active,
  onClick,
  href,
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const cls = cn(
    "flex h-8 w-8 items-center justify-center rounded-md transition-all duration-100 cursor-pointer",
    active
      ? "bg-[oklch(0.33_0.008_264)] text-[var(--dc-text-primary)]"
      : "text-[var(--dc-text-muted)] hover:bg-[oklch(0.30_0.006_264)] hover:text-[var(--dc-text-primary)]"
  );

  if (href) {
    return (
      <Link href={href} className={cls} aria-label={label} title={label}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cls} aria-label={label} title={label}>
      {children}
    </button>
  );
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
      <header className="flex h-12 items-center gap-2 px-4 border-b border-[oklch(1_0_0/7%)] dc-chat-bg shrink-0 z-10 shadow-sm shadow-black/10">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileNavOpen(true)}
          className="lg:hidden flex h-8 w-8 items-center justify-center rounded-md text-[var(--dc-text-muted)] hover:text-[var(--dc-text-primary)] hover:bg-[oklch(0.30_0.006_264)] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Channel name + description */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Hash className="h-[22px] w-[22px] text-[var(--dc-text-channel)] shrink-0" strokeWidth={2.5} />
          <span className="font-semibold text-[15px] text-[var(--dc-text-primary)] truncate">
            {channelName}
          </span>
          {channelDescription && (
            <>
              <div className="h-5 w-px bg-[oklch(1_0_0/15%)] shrink-0 hidden sm:block" />
              <p className="text-[13px] text-[var(--dc-text-channel)] truncate hidden sm:block">
                {channelDescription}
              </p>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {onToggleMemberList && (
            <HeaderIcon
              label="Toggle Member List"
              active={showMemberList}
              onClick={onToggleMemberList}
            >
              <Users className="h-[18px] w-[18px]" />
            </HeaderIcon>
          )}

          <HeaderIcon label="Notifications" href="/notifications">
            <div className="relative">
              <Bell className="h-[18px] w-[18px]" />
              {hasUnread && (
                <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--dc-red)] text-[8px] font-bold text-white leading-none">
                  {(unreadCount ?? 0) > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
          </HeaderIcon>

          <HeaderIcon label="Pinned Messages">
            <Pin className="h-[18px] w-[18px]" />
          </HeaderIcon>

          <HeaderIcon label="Mentions">
            <AtSign className="h-[18px] w-[18px]" />
          </HeaderIcon>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 rounded-md bg-[oklch(0.19_0.005_264)] px-2.5 py-1.5 w-40 ml-1 border border-[oklch(1_0_0/5%)] hover:border-[oklch(1_0_0/10%)] transition-colors">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-[13px] text-[var(--dc-text-primary)] placeholder:text-[var(--dc-text-channel)] outline-none flex-1 w-full"
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
