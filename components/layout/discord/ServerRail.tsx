"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, Compass, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCommunities } from "@/features/community/hooks/useCommunities";

interface ServerIconProps {
  href: string;
  label: string;
  active?: boolean;
  hasNotification?: boolean;
  children: React.ReactNode;
}

function ServerIcon({ href, label, active, hasNotification, children }: ServerIconProps) {
  return (
    <div className="relative flex items-center group" title={label}>
      {/* Active pill indicator */}
      <span
        className={cn(
          "absolute -left-3 w-[3px] rounded-r-full bg-white transition-all duration-200 ease-out",
          active
            ? "h-10"
            : "h-0 group-hover:h-5 opacity-0 group-hover:opacity-100"
        )}
      />

      {/* Notification dot */}
      {hasNotification && !active && (
        <span className="absolute -left-1.5 bottom-0 w-2 h-2 rounded-full bg-white" />
      )}

      <Link href={href}>
        <div
          className={cn(
            "relative flex h-12 w-12 items-center justify-center overflow-hidden font-semibold text-base transition-all duration-200 ease-out select-none",
            active
              ? "rounded-2xl bg-[var(--dc-blurple)] text-white shadow-lg dc-glow-blurple"
              : "rounded-3xl bg-[oklch(0.28_0.006_264)] text-[var(--dc-text-muted)] group-hover:rounded-2xl group-hover:bg-[var(--dc-blurple)] group-hover:text-white group-hover:shadow-lg group-hover:dc-glow-blurple"
          )}
        >
          {children}
        </div>
      </Link>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center w-12">
      <div className="h-[2px] w-8 rounded-full bg-[oklch(0.31_0.006_264)]" />
    </div>
  );
}

export default function ServerRail() {
  const pathname = usePathname();
  const { data: communities } = useCommunities();

  const isHome =
    pathname === "/" ||
    pathname.startsWith("/post") ||
    pathname.startsWith("/bookmarks") ||
    pathname.startsWith("/notifications") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/categories");

  return (
    <nav
      className="dc-server-rail hidden lg:flex flex-col items-center gap-2.5 pt-3 pb-3 w-[80px] shrink-0 overflow-y-auto overflow-x-hidden"
      aria-label="Communities"
    >
      {/* Home / Direct Messages */}
      <ServerIcon href="/post" label="Home" active={isHome}>
        <MessageSquare className="h-[22px] w-[22px]" />
      </ServerIcon>

      <Divider />

      {/* Community server icons */}
      {communities?.map((community) => {
        const isActive =
          pathname === `/communities/${community.slug}` ||
          pathname.startsWith(`/communities/${community.slug}/`);
        const initial = (community.name?.[0] ?? "?").toUpperCase();

        return (
          <ServerIcon
            key={community.id}
            href={`/communities/${community.slug}`}
            label={community.name}
            active={isActive}
          >
            {community.icon_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={community.icon_url}
                alt={community.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-base font-bold tracking-tight">{initial}</span>
            )}
          </ServerIcon>
        );
      })}

      <Divider />

      {/* Explore communities */}
      <ServerIcon
        href="/communities"
        label="Explore Communities"
        active={pathname === "/communities"}
      >
        <Compass className="h-[22px] w-[22px]" />
      </ServerIcon>

      {/* Create community */}
      <ServerIcon
        href="/communities/create"
        label="Create a Community"
        active={pathname === "/communities/create"}
      >
        <Plus className="h-[22px] w-[22px]" strokeWidth={2.5} />
      </ServerIcon>
    </nav>
  );
}
