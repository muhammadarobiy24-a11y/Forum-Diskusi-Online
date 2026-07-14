"use client";

import { FolderOpen } from "lucide-react";

export default function CategoryEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">Belum ada kategori</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Kategori belum tersedia saat ini.
      </p>
    </div>
  );
}
