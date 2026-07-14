"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/components/providers/SessionProvider";
import { useUnreadNotifications } from "@/hooks/useUnreadNotifications";
import UserMenu from "./UserMenu";
import MobileNav from "./MobileNav";

export default function AppHeader() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { user } = useSession();
  const { data: unreadCount } = useUnreadNotifications(user?.id);

  const displayCount = unreadCount ?? 0;
  const hasUnread = displayCount > 0;

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileNavOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <Link href="/" className="font-semibold text-lg">
          Online Forum
        </Link>

        <div className="flex-1 flex items-center justify-end gap-2">
          <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 w-64">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
            />
          </div>

          <Link href="/notifications">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  {displayCount > 99 ? "99+" : displayCount}
                </span>
              )}
            </Button>
          </Link>

          {user && <UserMenu />}
        </div>
      </header>

      <MobileNav
        open={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
