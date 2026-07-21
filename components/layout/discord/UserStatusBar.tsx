"use client";

import { Mic, Headphones, Settings } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/components/providers/SessionProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserStatusBar() {
  const { user } = useSession();

  if (!user) return null;

  const username =
    user.user_metadata?.username || user.email?.split("@")[0] || "User";
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const initials = username.slice(0, 2).toUpperCase();
  const discriminator = user.email?.slice(0, 4) ?? "0000";

  return (
    <div className="flex items-center justify-between px-2 py-2 bg-[var(--dc-server-rail)] shrink-0">
      {/* Avatar + name */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="relative shrink-0">
          <Avatar size="sm">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={username} />}
            <AvatarFallback className="text-xs bg-[var(--dc-blurple)] text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          {/* online indicator */}
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--dc-server-rail)] dc-status-online" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[var(--dc-text-primary)] truncate leading-tight">
            {username}
          </p>
          <p className="text-[10px] text-[var(--dc-text-channel)] truncate leading-tight">
            #{discriminator}
          </p>
        </div>
      </div>

      {/* Action icons */}
      <div className="flex items-center gap-0.5 shrink-0">
        <button
          className="rounded p-1 text-[var(--dc-text-channel)] hover:text-[var(--dc-text-primary)] hover:bg-[var(--dc-hover)] transition-colors"
          aria-label="Mute"
        >
          <Mic className="h-4 w-4" />
        </button>
        <button
          className="rounded p-1 text-[var(--dc-text-channel)] hover:text-[var(--dc-text-primary)] hover:bg-[var(--dc-hover)] transition-colors"
          aria-label="Deafen"
        >
          <Headphones className="h-4 w-4" />
        </button>
        <Link
          href="/settings"
          className="rounded p-1 text-[var(--dc-text-channel)] hover:text-[var(--dc-text-primary)] hover:bg-[var(--dc-hover)] transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
