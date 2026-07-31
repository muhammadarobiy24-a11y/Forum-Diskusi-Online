"use client";

import { useRouter } from "next/navigation";
import { Loader2, CheckCheck, Bell, Info } from "lucide-react";
import { useSession } from "@/components/providers/SessionProvider";
import { useNotifications } from "@/hooks/useNotifications";
import { useMarkNotificationRead } from "@/hooks/useMarkNotificationRead";
import NotificationList from "@/components/notification/NotificationList";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";

function BentoCard({
  children,
  className = "",
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: { bg: string; border: string };
}) {
  return (
    <div
      className={`rounded-[28px] p-5 ${className}`}
      style={{
        background: accent?.bg ?? "#ffffff",
        border: `1px solid ${accent?.border ?? "#e8e6f0"}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04)",
      }}
    >
      {children}
    </div>
  );
}

export default function NotificationsPage() {
  const { user, isLoading: sessionLoading } = useSession();
  const router = useRouter();

  const { data, isLoading } = useNotifications({ userId: user?.id || "" });
  const { markOne, markAll } = useMarkNotificationRead(user?.id);
  const hasUnread = data?.notifications?.some((n) => !n.is_read) ?? false;
  const unreadCount = data?.notifications?.filter((n) => !n.is_read).length ?? 0;

  if (sessionLoading) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <ChannelHeader />
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-4 xl:px-6 xl:py-6">
            <BentoCard><NotificationList notifications={undefined} isLoading={true} /></BentoCard>
          </div>
        </div>
      </div>
    );
  }

  if (!user) { router.push("/login"); return null; }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChannelHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1100px] mx-auto px-4 py-4 xl:px-6 xl:py-6">
          <div className="flex flex-col xl:flex-row gap-4">

            {/* MAIN column */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">

              {/* Hero card */}
              <BentoCard accent={{ bg: "#edf6ff", border: "#b3d9ff" }}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-[16px] flex items-center justify-center shrink-0"
                      style={{ background: "#dbeafe", border: "1px solid #b3d9ff" }}>
                      <Bell className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h1 className="text-xl font-black text-[var(--forum-text-primary)] tracking-tight">Notifikasi</h1>
                      <p className="text-sm text-[var(--forum-text-muted)]">Aktivitas terkait postingan Anda</p>
                    </div>
                  </div>
                  {hasUnread && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: "#dbeafe", color: "#1d4ed8" }}>
                      {unreadCount} belum dibaca
                    </span>
                  )}
                </div>
              </BentoCard>

              {/* Notification list card */}
              <BentoCard className="!p-5 sm:!p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-blue-500" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--forum-text-muted)]">
                      Semua Notifikasi
                    </h2>
                  </div>
                  {hasUnread && (
                    <button
                      onClick={() => markAll.mutate()}
                      disabled={markAll.isPending}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all disabled:opacity-50"
                      style={{ background: "#dbeafe", color: "#1d4ed8", border: "1px solid #b3d9ff" }}
                    >
                      {markAll.isPending
                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        : <CheckCheck className="h-3.5 w-3.5" />}
                      Tandai Semua Dibaca
                    </button>
                  )}
                </div>
                <NotificationList
                  notifications={data?.notifications}
                  isLoading={isLoading}
                  onMarkAsRead={(id) => markOne.mutate(id)}
                />
              </BentoCard>
            </div>

            {/* RIGHT column */}
            <div className="hidden xl:flex flex-col gap-4 w-64 shrink-0">
              <BentoCard accent={{ bg: "#fff4ed", border: "#ffd5b4" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Info className="h-4 w-4 text-orange-400" />
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Info</p>
                </div>
                <p className="text-sm text-[var(--forum-text-secondary)] leading-relaxed">
                  Notifikasi muncul saat seseorang menyukai atau mengomentari postinganmu.
                </p>
              </BentoCard>
            </div>

          </div>
          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
