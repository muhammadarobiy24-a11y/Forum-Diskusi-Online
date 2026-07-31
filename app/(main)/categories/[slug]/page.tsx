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
      const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).single();
      if (error) throw error;
      return data as Category;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <ChannelHeader />
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 py-6 space-y-4 animate-pulse">
            <div className="h-6 w-32 rounded-full bg-gray-200" />
            <div className="h-32 w-full rounded-[28px] bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <ChannelHeader />
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="h-20 w-20 mb-6 rounded-[24px] flex items-center justify-center"
            style={{ background: "#f0edff", border: "1px solid #d4caff" }}>
            <Hash className="h-10 w-10 text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-[var(--forum-text-primary)]">Kategori tidak ditemukan</h2>
          <p className="text-sm text-[var(--forum-text-muted)] mt-2">Kategori yang Anda cari tidak ada atau telah dihapus.</p>
          <Link href="/categories"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
            <ArrowLeft className="h-4 w-4" />Kembali ke Kategori
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChannelHeader channelName={category.name} channelDescription={category.description ?? ""} />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6 space-y-4">
          <Link href="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--forum-text-muted)] hover:text-[var(--forum-text-primary)] transition-colors">
            <ArrowLeft className="h-4 w-4" />Kembali ke Semua Kategori
          </Link>

          <div className="rounded-[28px] p-6" style={{ background: "#f0edff", border: "1px solid #d4caff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 shrink-0 rounded-[20px] flex items-center justify-center"
                style={{ background: "#ede9fe", border: "1px solid #d4caff" }}>
                <Hash className="h-7 w-7 text-violet-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-black text-[var(--forum-text-primary)]">{category.name}</h1>
                {category.description && (
                  <p className="mt-1.5 text-sm text-[var(--forum-text-secondary)] leading-relaxed">{category.description}</p>
                )}
                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[var(--forum-text-muted)]">
                  <MessageSquare className="h-4 w-4" />
                  <span>{category.post_count ?? 0} Diskusi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-16 text-center rounded-[28px]"
            style={{ background: "#faf9f6", border: "1px solid #e8e6e1" }}>
            <div className="h-14 w-14 mb-4 rounded-[20px] flex items-center justify-center"
              style={{ background: "#f0edff", border: "1px solid #d4caff" }}>
              <MessageSquare className="h-7 w-7 text-violet-400" />
            </div>
            <p className="text-sm text-[var(--forum-text-muted)] font-semibold">
              Postingan dalam kategori ini akan muncul di sini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
