"use client";

import NotificationCard from "./NotificationCard";
import NotificationSkeleton from "./NotificationSkeleton";
import NotificationEmptyState from "./NotificationEmptyState";
import type { Notification } from "@/types/notification";

interface NotificationListProps {
  notifications: Notification[] | undefined;
  isLoading: boolean;
  onMarkAsRead?: (notificationId: string) => void;
}

export default function NotificationList({ notifications, isLoading, onMarkAsRead }: NotificationListProps) {
  if (isLoading) {
    return <NotificationSkeleton />;
  }

  if (!notifications || notifications.length === 0) {
    return <NotificationEmptyState />;
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
}
