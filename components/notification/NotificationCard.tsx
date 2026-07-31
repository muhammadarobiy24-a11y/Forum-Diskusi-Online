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
      className={`group relative flex items-start gap-4 p-5 md:p-6 rounded-[24px] transition-all duration-500 ${
        notification.is_read 
          ? "hover:bg-white/[0.04]" 
          : "cursor-pointer hover:-translate-y-1"
      }`}
      style={{
        background: notification.is_read ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: notification.is_read ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(255,255,255,0.15)",
        boxShadow: notification.is_read ? "none" : "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      {/* Glow effect on hover for unread */}
      {!notification.is_read && (
        <div 
          className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at top left, rgba(124,58,237,0.15), transparent 60%)",
            border: "1px solid rgba(167,139,250,0.4)",
          }}
        />
      )}

      {/* Actor Avatar */}
      <div 
        className="relative z-10 h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-xs font-bold mt-1"
        style={{ 
          background: notification.actor?.avatar_url ? `url(${notification.actor.avatar_url}) center/cover` : "linear-gradient(135deg, #7c3aed, #3b82f6)", 
          color: "white" 
        }}
      >
        {!notification.actor?.avatar_url && initials}
      </div>

      <div className="relative z-10 flex-1 min-w-0 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-sm text-white/90">
              {notification.actor?.username || "Unknown"}
            </span>
            <div className={`flex items-center justify-center h-6 w-6 rounded-lg border ${colorClass}`}>
              <Icon className="h-3 w-3" />
            </div>
            {!notification.is_read && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-violet-500 text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                Baru
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-white/40 shrink-0 mt-1">
            {formatRelativeDate(notification.created_at)}
          </span>
        </div>
        
        <p className="text-sm font-medium text-white/70 leading-relaxed">
          {notification.message}
        </p>
      </div>
    </div>
  );
}
