"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, MessageSquare, Hash } from "lucide-react";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import type { Category } from "@/types";

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: category, isLoading } = useQuery({
    queryKey: ["category", slug],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data as Category;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col h-full overflow-hidden relative">
        <ChannelHeader channelName="kategori" channelDescription="Memuat..." />
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 space-y-6 animate-pulse">
            <div className="h-6 w-32 rounded-lg bg-white/5" />
            <div className="h-48 w-full rounded-[32px] bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex flex-col h-full overflow-hidden relative">
        <ChannelHeader channelName="tidak ditemukan" channelDescription="" />
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
          <div
            className="h-20 w-20 mb-6 rounded-3xl flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Hash className="h-10 w-10 text-white/30" />
          </div>
          <h2 className="text-2xl font-bold text-white/80">Kategori tidak ditemukan</h2>
          <p className="text-white/40 mt-2">Kategori yang Anda cari tidak ada atau telah dihapus.</p>
          <Link
            href="/categories"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Kategori
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <ChannelHeader
        channelName={category.name}
        channelDescription={category.description ?? ""}
      />

      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 space-y-8">

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Semua Kategori
          </Link>

          {/* Category Info Card */}
          <div
            className="p-6 md:p-8 rounded-[32px]"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(59,130,246,0.3))",
                  border: "1px solid rgba(167,139,250,0.3)",
                }}
              >
                <Hash className="h-7 w-7 text-violet-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-black text-white/95 leading-tight">{category.name}</h1>
                {category.description && (
                  <p className="mt-2 text-[15px] text-white/60 leading-relaxed">
                    {category.description}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/40">
                  <MessageSquare className="h-4 w-4" />
                  <span>{category.post_count ?? 0} Diskusi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Posts placeholder */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div
              className="h-16 w-16 mb-5 rounded-3xl flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <MessageSquare className="h-8 w-8 text-white/25" />
            </div>
            <p className="text-white/40 font-medium">Postingan dalam kategori ini akan muncul di sini.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
