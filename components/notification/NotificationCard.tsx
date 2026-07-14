"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Reply, Bookmark } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils/date";
import type { Notification } from "@/types/notification";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: (notificationId: string) => void;
}

const typeIcons = {
  like: Heart,
  comment: MessageCircle,
  reply: Reply,
  bookmark: Bookmark,
};

export default function NotificationCard({ notification, onMarkAsRead }: NotificationCardProps) {
  const Icon = typeIcons[notification.type];
  const initials = (notification.actor?.username || "U").slice(0, 2).toUpperCase();

  function handleClick() {
    if (!notification.is_read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  }

  return (
    <Card
      className={`transition-colors ${notification.is_read ? "" : "bg-muted/50 hover:bg-muted/70 cursor-pointer"}`}
      onClick={handleClick}
    >
      <CardContent className="py-4">
        <div className="flex items-start gap-3">
          <Avatar size="sm">
            {notification.actor?.avatar_url && (
              <AvatarImage src={notification.actor.avatar_url} alt={notification.actor.username} />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">
                {notification.actor?.username || "Unknown"}
              </span>
              <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
              {!notification.is_read && (
                <Badge variant="secondary" className="text-xs shrink-0">
                  Baru
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {notification.message}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatRelativeDate(notification.created_at)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
