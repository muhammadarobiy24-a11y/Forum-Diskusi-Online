"use client";

import { useRouter } from "next/navigation";
import { Loader2, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <>
        <ChannelHeader channelName="notifications" channelDescription="Aktivitas terkait postingan Anda" />
        <div className="flex-1 overflow-y-auto dc-chat-bg">
          <div className="max-w-3xl mx-auto px-5 py-5">
            <NotificationList notifications={undefined} isLoading={true} />
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <ChannelHeader channelName="notifications" channelDescription="Aktivitas terkait postingan Anda" />
      <div className="flex-1 overflow-y-auto dc-chat-bg">
        <div className="max-w-3xl mx-auto px-5 py-5 space-y-5">
          {hasUnread && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => markAll.mutate()}
                disabled={markAll.isPending}
              >
                {markAll.isPending ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <CheckCheck className="h-4 w-4 mr-1" />
                )}
                Tandai Semua Sudah Dibaca
              </Button>
            </div>
          )}
          <NotificationList
            notifications={data?.notifications}
            isLoading={isLoading}
            onMarkAsRead={(id) => markOne.mutate(id)}
          />
        </div>
      </div>
    </>
  );
}
