"use client";

import { Bell } from "lucide-react";

export default function NotificationEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div 
        className="flex items-center justify-center h-16 w-16 rounded-3xl mb-6"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <Bell className="h-8 w-8 text-white/30" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Belum ada notifikasi</h3>
      <p className="text-sm font-medium text-white/50">
        Aktivitas terbaru akan muncul di sini.
      </p>
    </div>
  );
}
