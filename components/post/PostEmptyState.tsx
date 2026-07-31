"use client";

import Link from "next/link";
import { FileText, Plus } from "lucide-react";

export default function PostEmptyState() {
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
        <FileText className="h-8 w-8 text-white/30" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Belum ada postingan</h3>
      <p className="text-sm font-medium text-white/50 mb-8 max-w-sm mx-auto">
        Jadilah yang pertama membagikan ide, pertanyaan, atau diskusi Anda.
      </p>
      
      <Link
        href="/post/create"
        className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
          boxShadow: "0 4px 15px rgba(124,58,237,0.3)",
        }}
      >
        <Plus className="h-4 w-4" />
        Buat Postingan
      </Link>
    </div>
  );
}
