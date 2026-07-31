"use client";

import { useRouter } from "next/navigation";
import { Loader2, CheckCheck } from "lucide-react";
import { useSession } from "@/components/providers/SessionProvider";
import { useNotifications } from "@/hooks/useNotifications";
import { useMarkNotificationRead } from "@/hooks/useMarkNotificationRead";
import NotificationList from "@/components/notification/NotificationList";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";

export default function NotificationsPage() {
  const { user, isLoading: sessionLoading } = useSession();
  const router = useRouter();

  const { data, isLoading } = useNotifications({
    userId: user?.id || "",
  });

  const { markOne, markAll } = useMarkNotificationRead(user?.id);

  const hasUnread = data?.notifications?.some((n) => !n.is_read) ?? false;

  if (sessionLoading) {
    return (
      <div className="flex flex-col h-full overflow-hidden relative">
        <ChannelHeader channelName="notifications" channelDescription="Aktivitas terkait postingan Anda" />
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
          <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
            <NotificationList notifications={undefined} isLoading={true} />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <ChannelHeader channelName="notifications" channelDescription="Aktivitas terkait postingan Anda" />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 space-y-6">
          
          {hasUnread && (
            <div className="flex justify-end mb-2">
              <button
                onClick={() => markAll.mutate()}
                disabled={markAll.isPending}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30"
              >
                {markAll.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCheck className="h-4 w-4" />
                )}
                Tandai Semua Sudah Dibaca
              </button>
            </div>
          )}

          <div className="pb-12">
            <NotificationList
              notifications={data?.notifications}
              isLoading={isLoading}
              onMarkAsRead={(id) => markOne.mutate(id)}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}
