"use client";

import { useSession } from "@/components/providers/SessionProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Community } from "@/features/community/types/community";

interface MemberListProps {
  community?: Community | null;
}

/* mock online users — real implementation would need a presence API */
function OnlineMember({
  username,
  avatarUrl,
  role,
  status = "online",
}: {
  username: string;
  avatarUrl?: string | null;
  role?: string;
  status?: "online" | "idle" | "dnd" | "offline";
}) {
  const initials = username.slice(0, 2).toUpperCase();
  const statusClass = {
    online:  "dc-status-online",
    idle:    "dc-status-idle",
    dnd:     "dc-status-dnd",
    offline: "dc-status-offline",
  }[status];

  return (
    <div className="group flex items-center gap-2 rounded px-2 py-1 hover:bg-[var(--dc-hover)] transition-colors cursor-pointer">
      <div className="relative shrink-0">
        <Avatar size="sm">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={username} />}
          <AvatarFallback className="text-xs bg-[var(--dc-blurple)] text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
        <span
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--dc-member-bg)] ${statusClass}`}
        />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--dc-text-muted)] group-hover:text-[var(--dc-text-primary)] truncate transition-colors">
          {username}
        </p>
        {role && (
          <p className="text-[10px] text-[var(--dc-text-channel)] truncate">{role}</p>
        )}
      </div>
    </div>
  );
}

export default function MemberList({ community }: MemberListProps) {
  const { user } = useSession();
  const currentUsername =
    user?.user_metadata?.username || user?.email?.split("@")[0] || "You";
  const currentAvatarUrl = user?.user_metadata?.avatar_url as string | undefined;

  return (
    <aside className="dc-member-bg hidden xl:flex flex-col w-60 shrink-0 overflow-y-auto border-l border-[var(--dc-hover)]">
      <div className="p-3 space-y-4">
        {/* Online section */}
        <div>
          <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--dc-text-channel)]">
            Online — 1
          </p>
          <OnlineMember
            username={currentUsername}
            avatarUrl={currentAvatarUrl}
            role="Member"
            status="online"
          />
        </div>

        {/* Community info */}
        {community && (
          <div>
            <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--dc-text-channel)]">
              About Community
            </p>
            <div className="px-2 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--dc-text-channel)]">Members</span>
                <span className="text-[var(--dc-text-primary)] font-medium">
                  {community.member_count.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[var(--dc-text-channel)]">Posts</span>
                <span className="text-[var(--dc-text-primary)] font-medium">
                  {community.post_count.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[var(--dc-text-channel)]">Type</span>
                <span className="text-[var(--dc-text-primary)] font-medium capitalize">
                  {community.visibility}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Offline section */}
        <div>
          <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--dc-text-channel)]">
            Offline — {community ? Math.max(0, community.member_count - 1) : 0}
          </p>
          <p className="px-2 text-xs text-[var(--dc-text-channel)] italic">
            {community?.member_count
              ? `${community.member_count - 1} member lainnya offline`
              : "Belum ada member lain"}
          </p>
        </div>
      </div>
    </aside>
  );
}
