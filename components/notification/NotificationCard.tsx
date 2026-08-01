"use client";

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

const typeColors = {
  like: "text-red-400 bg-red-500/10 border-red-500/20",
  comment: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  reply: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  bookmark: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

export default function NotificationCard({ notification, onMarkAsRead }: NotificationCardProps) {
  const Icon = typeIcons[notification.type];
  const colorClass = typeColors[notification.type] || "text-white/50 bg-white/5 border-white/10";
  const initials = (notification.actor?.username || "U").slice(0, 2).toUpperCase();

  function handleClick() {
    if (!notification.is_read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`group relative flex items-start gap-4 p-5 rounded-[24px] transition-all duration-200 cursor-pointer ${
        notification.is_read ? "" : "hover:-translate-y-0.5"
      }`}
      style={{
        background: notification.is_read ? "#ffffff" : "#f0edff",
        border: notification.is_read ? "1px solid #e8e6f0" : "1px solid #d4caff",
        boxShadow: notification.is_read
          ? "0 1px 4px rgba(0,0,0,0.04)"
          : "0 2px 12px rgba(108,92,231,0.12)",
      }}
    >
      {/* Remove dark glow */}

      {/* Actor Avatar */}
      <div
        className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 text-white overflow-hidden"
        style={{
          background: notification.actor?.avatar_url
            ? `url(${notification.actor.avatar_url}) center/cover`
            : "linear-gradient(135deg, #6c5ce7, #a29bfe)",
        }}
      >
        {!notification.actor?.avatar_url && initials}
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-sm text-[var(--forum-text-primary)]">
              {notification.actor?.username || "Seseorang"}
            </span>
            <div className={`flex items-center justify-center h-5 w-5 rounded-lg border ${colorClass}`}>
              <Icon className="h-3 w-3" />
            </div>
            {!notification.is_read && (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-white"
                style={{ background: "#6c5ce7" }}>
                Baru
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-[var(--forum-text-muted)] shrink-0 mt-0.5">
            {formatRelativeDate(notification.created_at)}
          </span>
        </div>

        <p className="text-sm text-[var(--forum-text-secondary)] leading-relaxed">
          {notification.message}
        </p>
      </div>
    </div>
  );
}
