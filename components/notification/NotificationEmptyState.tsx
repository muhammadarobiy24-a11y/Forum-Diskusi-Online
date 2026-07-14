"use client";

import { Bell } from "lucide-react";

export default function NotificationEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Bell className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">Belum ada notifikasi</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Aktivitas terbaru akan muncul di sini.
      </p>
    </div>
  );
}
