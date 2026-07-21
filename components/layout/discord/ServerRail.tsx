"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCommunities } from "@/features/community/hooks/useCommunities";

function ServerIcon({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="group relative flex items-center" title={label}>
      {/* active indicator pill */}
      <span
        className={cn(
          "absolute -left-3 w-1 rounded-r-full bg-[var(--dc-text-primary)] transition-all duration-200",
          active ? "h-9 opacity-100" : "h-0 opacity-0 group-hover:h-5 group-hover:opacity-100"
        )}
      />
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center overflow-hidden transition-all duration-200 text-[var(--dc-text-muted)]",
          active
            ? "rounded-[16px] bg-[var(--dc-blurple)] text-white"
            : "rounded-[24px] bg-[var(--dc-hover)] group-hover:rounded-[16px] group-hover:bg-[var(--dc-blurple)] group-hover:text-white"
        )}
      >
        {children}
      </div>
    </Link>
  );
}

export default function ServerRail() {
  const pathname = usePathname();
  const { data: communities } = useCommunities();

  const isHome = pathname === "/" || pathname.startsWith("/post") || pathname.startsWith("/bookmarks") || pathname.startsWith("/notifications");

  return (
    <nav
      className="dc-server-rail hidden lg:flex flex-col items-center gap-2 py-3 w-[72px] shrink-0 overflow-y-auto"
      aria-label="Server list"
    >
      {/* Home */}
      <ServerIcon href="/" label="Home" active={isHome}>
        <Home className="h-5 w-5" />
      </ServerIcon>

      {/* divider */}
      <div className="mx-auto h-px w-8 bg-[var(--dc-hover)] rounded-full" />

      {/* Communities */}
      {communities?.map((community) => {
        const isActive = pathname === `/communities/${community.slug}` || pathname.startsWith(`/communities/${community.slug}/`);
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
              <span className="text-sm font-bold">{initial}</span>
            )}
          </ServerIcon>
        );
      })}

      {/* divider */}
      <div className="mx-auto h-px w-8 bg-[var(--dc-hover)] rounded-full" />

      {/* Explore */}
      <ServerIcon href="/communities" label="Explore Communities" active={pathname === "/communities"}>
        <Compass className="h-5 w-5" />
      </ServerIcon>

      {/* Create */}
      <ServerIcon href="/communities/create" label="Create Community" active={pathname === "/communities/create"}>
        <Plus className="h-5 w-5" />
      </ServerIcon>
    </nav>
  );
}
