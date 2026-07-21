"use client";

import { Mic, Headphones, Settings } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/components/providers/SessionProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function BarIcon({
  children,
  label,
  href,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  const cls =
    "flex h-7 w-7 items-center justify-center rounded-md text-[var(--dc-text-channel)] hover:text-[var(--dc-text-primary)] hover:bg-[oklch(0.31_0.006_264)] transition-all duration-100 cursor-pointer";

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

export default function UserStatusBar() {
  const { user } = useSession();

  if (!user) return null;

  const username =
    (user.user_metadata?.username as string) ||
    user.email?.split("@")[0] ||
    "User";
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const initials = username.slice(0, 2).toUpperCase();
  const tag = user.email?.slice(0, 4) ?? "0000";

  return (
    <div className="flex items-center gap-1.5 px-2 py-2 bg-[oklch(0.195_0.005_264)] border-t border-[oklch(1_0_0/6%)] shrink-0">
      {/* Avatar + info */}
      <div className="flex items-center gap-2 flex-1 min-w-0 rounded-md px-1.5 py-1 hover:bg-[oklch(0.27_0.006_264)] transition-colors cursor-pointer">
        <div className="relative shrink-0">
          <Avatar size="sm">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={username} />}
            <AvatarFallback className="text-[11px] font-bold bg-[var(--dc-blurple)] text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          {/* Online dot */}
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[oklch(0.195_0.005_264)] dc-status-online" />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[var(--dc-text-primary)] truncate leading-tight">
            {username}
          </p>
          <p className="text-[11px] text-[var(--dc-text-channel)] truncate leading-tight">
            Online
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-0.5 shrink-0">
        <BarIcon label="Mute">
          <Mic className="h-4 w-4" />
        </BarIcon>
        <BarIcon label="Deafen">
          <Headphones className="h-4 w-4" />
        </BarIcon>
        <BarIcon label="Settings" href="/settings">
          <Settings className="h-4 w-4" />
        </BarIcon>
      </div>
    </div>
  );
}
