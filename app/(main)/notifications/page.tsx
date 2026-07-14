"use client";

import { useRouter } from "next/navigation";
import { Loader2, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/components/providers/SessionProvider";
import { useNotifications } from "@/hooks/useNotifications";
import { useMarkNotificationRead } from "@/hooks/useMarkNotificationRead";
import NotificationList from "@/components/notification/NotificationList";

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
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Notifikasi</h1>
          <p className="text-muted-foreground mt-1">
            Aktivitas terkait postingan Anda.
          </p>
        </div>
        <NotificationList notifications={undefined} isLoading={true} />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifikasi</h1>
          <p className="text-muted-foreground mt-1">
            Aktivitas terkait postingan Anda.
          </p>
        </div>
        {hasUnread && (
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
        )}
      </div>

      <NotificationList
        notifications={data?.notifications}
        isLoading={isLoading}
        onMarkAsRead={(id) => markOne.mutate(id)}
      />
    </div>
  );
}
