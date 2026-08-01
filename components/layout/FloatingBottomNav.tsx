"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Bookmark, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "@/components/providers/SessionProvider";
import { useUnreadNotifications } from "@/hooks/useUnreadNotifications";

const NAV_ITEMS = [
  { href: "/post",          icon: Home,     label: "Home"      },
  { href: "/communities",   icon: Compass,  label: "Community" },
  { href: "/bookmarks",     icon: Bookmark, label: "Saved"     },
  { href: "/notifications", icon: Bell,     label: "Notif"     },
  { href: "/profile",       icon: User,     label: "Profile"   },
];

export default function FloatingBottomNav() {
  const pathname = usePathname();
  const { user } = useSession();
  const { data: unreadCount } = useUnreadNotifications(user?.id);
  const hasUnread = (unreadCount ?? 0) > 0;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <nav
        className="pointer-events-auto flex items-center gap-1 px-3 py-2.5 rounded-full"
        style={{
          background: "#1a1523",
          boxShadow: "0 8px 32px rgba(26,21,35,0.40), 0 2px 8px rgba(0,0,0,0.25)",
        }}
        aria-label="Navigasi utama"
      >
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive =
            href === "/post"
              ? pathname === "/" || pathname.startsWith("/post")
              : pathname.startsWith(href);
          const isNotif = href === "/notifications";

          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200",
                isActive
                  ? "bg-white shadow-md scale-110"
                  : "text-white/50 hover:text-white/80 hover:bg-white/10 active:scale-95"
              )}
            >
              <Icon
                className={cn(
                  "transition-colors duration-200",
                  isActive ? "h-[22px] w-[22px] text-[#1a1523]" : "h-[20px] w-[20px]"
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {/* Unread dot */}
              {isNotif && hasUnread && !isActive && (
                <span
                  className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full border border-[#1a1523]"
                  style={{ background: "#e17055" }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
