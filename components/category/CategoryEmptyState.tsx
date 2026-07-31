"use client";

import { FolderOpen } from "lucide-react";

export default function CategoryEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div 
        className="h-20 w-20 mb-6 rounded-3xl flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
        }}
      >
        <FolderOpen className="h-10 w-10 text-white/30" />
      </div>
      <h3 className="text-xl font-bold text-white/80">Belum ada kategori</h3>
      <p className="text-[15px] text-white/40 mt-2 max-w-sm leading-relaxed">
        Kategori belum tersedia saat ini. Coba cari dengan kata kunci yang berbeda.
      </p>
    </div>
  );
}
