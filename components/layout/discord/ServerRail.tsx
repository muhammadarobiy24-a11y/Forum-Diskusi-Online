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
    <div className="relative flex items-center group w-full justify-center" title={label}>
      {/* Active pill indicator */}
      <span
        className={cn(
          "absolute left-0 w-[4px] rounded-r-full transition-all duration-300 ease-out",
          active
            ? "h-10 bg-violet-400"
            : "h-0 group-hover:h-5 bg-white/50 opacity-0 group-hover:opacity-100"
        )}
        style={{
          boxShadow: active ? "0 0 10px rgba(167,139,250,0.8)" : "none",
        }}
      />

      {/* Notification dot */}
      {hasNotification && !active && (
        <span
          className="absolute left-1.5 bottom-0 w-2.5 h-2.5 rounded-full"
          style={{ background: "#f87171", boxShadow: "0 0 8px #f87171" }}
        />
      )}

      <Link href={href}>
        <div
          className={cn(
            "relative flex h-12 w-12 items-center justify-center overflow-hidden font-bold text-base transition-all duration-300 ease-out select-none",
            active
              ? "rounded-2xl text-white"
              : "rounded-[24px] text-white/50 group-hover:rounded-2xl group-hover:text-white"
          )}
          style={{
            background: active
              ? "linear-gradient(135deg, rgba(124,58,237,0.8), rgba(59,130,246,0.8))"
              : "rgba(255,255,255,0.05)",
            border: active
              ? "1px solid rgba(167,139,250,0.5)"
              : "1px solid rgba(255,255,255,0.05)",
            boxShadow: active
              ? "0 0 20px rgba(124,58,237,0.4)"
              : "none",
            backdropFilter: "blur(12px)",
          }}
        >
          {children}
        </div>
      </Link>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center w-12 my-1">
      <div className="h-[2px] w-8 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}

export default function ServerRail() {
  const pathname = usePathname();
  const { data: communities } = useCommunities();

  const isHome =
    pathname === "/" ||
    pathname === "/post" ||
    pathname.startsWith("/bookmarks") ||
    pathname.startsWith("/notifications") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/categories");

  return (
    <nav
      className="hidden lg:flex flex-col items-center gap-3 pt-4 pb-4 w-[80px] shrink-0 overflow-y-auto overflow-x-hidden border-r"
      style={{
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(255,255,255,0.05)",
      }}
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
              <span className="text-lg font-black tracking-tight">{initial}</span>
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
