"use client";

import { useSession } from "@/components/providers/SessionProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Shield } from "lucide-react";
import type { Community } from "@/features/community/types/community";

type MemberStatus = "online" | "idle" | "dnd" | "offline";

interface MemberRowProps {
  username: string;
  avatarUrl?: string | null;
  role?: "owner" | "moderator" | "member";
  status?: MemberStatus;
  activity?: string;
}

const STATUS_CONFIG: Record<MemberStatus, { cls: string; label: string }> = {
  online:  { cls: "dc-status-online",  label: "Online"  },
  idle:    { cls: "dc-status-idle",    label: "Idle"    },
  dnd:     { cls: "dc-status-dnd",     label: "Do Not Disturb" },
  offline: { cls: "dc-status-offline", label: "Offline" },
};

function MemberRow({ username, avatarUrl, role, status = "online", activity }: MemberRowProps) {
  const initials = username.slice(0, 2).toUpperCase();
  const { cls, label } = STATUS_CONFIG[status];
  const isOffline = status === "offline";

  return (
    <div
      className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-[oklch(0.30_0.006_264)] transition-colors cursor-pointer mx-2"
    >
      <div className="relative shrink-0">
        <Avatar size="sm">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={username} />}
          <AvatarFallback
            className={`text-[11px] font-bold ${isOffline ? "bg-[oklch(0.31_0.006_264)] text-[var(--dc-text-channel)]" : "bg-[var(--dc-blurple)] text-white"}`}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
        <span
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[oklch(0.225_0.005_264)] ${cls}`}
          title={label}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <p
            className={`text-[13px] font-semibold truncate transition-colors leading-tight ${
              isOffline
                ? "text-[var(--dc-text-channel)] group-hover:text-[oklch(0.72_0.006_264)]"
                : "text-[oklch(0.78_0.006_264)] group-hover:text-[var(--dc-text-primary)]"
            }`}
          >
            {username}
          </p>
          {role === "owner" && (
            <Crown className="h-3 w-3 text-amber-400 shrink-0" />
          )}
          {role === "moderator" && (
            <Shield className="h-3 w-3 text-[var(--dc-blurple)] shrink-0" />
          )}
        </div>
        {activity && (
          <p className="text-[11px] text-[var(--dc-text-channel)] truncate leading-tight">
            {activity}
          </p>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ label, count }: { label: string; count: number }) {
  return (
    <p className="px-4 pt-5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--dc-text-channel)]">
      {label} — {count}
    </p>
  );
}

interface MemberListProps {
  community?: Community | null;
}

export default function MemberList({ community }: MemberListProps) {
  const { user } = useSession();
  const currentUsername =
    (user?.user_metadata?.username as string) ||
    user?.email?.split("@")[0] ||
    "You";
  const currentAvatarUrl = user?.user_metadata?.avatar_url as string | undefined;

  const offlineCount = community ? Math.max(0, community.member_count - 1) : 0;

  return (
    <aside className="dc-member-bg hidden xl:flex flex-col w-64 shrink-0 overflow-y-auto border-l border-[oklch(1_0_0/6%)]">
      {/* Online members */}
      <SectionLabel label="Online" count={1} />
      <MemberRow
        username={currentUsername}
        avatarUrl={currentAvatarUrl}
        role="member"
        status="online"
        activity="Browsing forum"
      />

      {/* Offline members */}
      {offlineCount > 0 && (
        <>
          <SectionLabel label="Offline" count={offlineCount} />
          <div className="px-2">
            {[...Array(Math.min(offlineCount, 5))].map((_, i) => (
              <MemberRow
                key={i}
                username={`Member ${i + 1}`}
                status="offline"
                role="member"
              />
            ))}
            {offlineCount > 5 && (
              <p className="px-2 pt-1 pb-2 text-[12px] text-[var(--dc-text-channel)] italic">
                +{offlineCount - 5} more offline
              </p>
            )}
          </div>
        </>
      )}

      {/* Community info card */}
      {community && (
        <div className="mx-3 mt-4 mb-3 rounded-lg bg-[oklch(0.21_0.005_264)] border border-[oklch(1_0_0/6%)] p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--dc-text-channel)] mb-2">
            Community Info
          </p>
          <div className="space-y-1.5">
            {[
              { label: "Members",    value: community.member_count.toLocaleString("id-ID") },
              { label: "Posts",      value: community.post_count.toLocaleString("id-ID") },
              { label: "Visibility", value: community.visibility },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-[12px] text-[var(--dc-text-channel)]">{label}</span>
                <span className="text-[12px] font-medium text-[var(--dc-text-primary)] capitalize">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
