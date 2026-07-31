"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/components/providers/SessionProvider";
import { fetchPost } from "@/services/post.service";
import PostForm from "@/components/post/PostForm";
import PostDetailSkeleton from "@/components/post/PostDetailSkeleton";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import { AlertTriangle, Pencil } from "lucide-react";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading: isSessionLoading } = useSession();
  const id = params.id as string;

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!isSessionLoading && !user) router.push("/login");
  }, [user, isSessionLoading, router]);

  if (isSessionLoading || isLoading) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <ChannelHeader />
        <div className="flex-1 overflow-y-auto p-6">
          <PostDetailSkeleton />
        </div>
      </div>
    );
  }

  const ErrorCard = ({ title, desc }: { title: string; desc: string }) => (
    <div className="flex flex-col h-full overflow-hidden">
      <ChannelHeader />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center py-16 text-center rounded-[28px] px-8 max-w-sm"
          style={{ background: "#fff0f0", border: "1px solid #fecaca" }}>
          <div className="h-14 w-14 mb-5 rounded-[20px] flex items-center justify-center"
            style={{ background: "#fee2e2", border: "1px solid #fecaca" }}>
            <AlertTriangle className="h-7 w-7 text-red-400" />
          </div>
          <h2 className="text-lg font-bold text-[var(--forum-text-primary)] mb-2">{title}</h2>
          <p className="text-sm text-[var(--forum-text-muted)] mb-5">{desc}</p>
          <button onClick={() => router.push("/post")}
            className="forum-btn-accent px-5 py-2 rounded-full text-sm">
            Kembali ke Posts
          </button>
        </div>
      </div>
    </div>
  );

  if (error) return <ErrorCard title="Terjadi Kesalahan" desc="Gagal memuat postingan." />;
  if (!post) return <ErrorCard title="Postingan tidak ditemukan" desc="Postingan yang Anda cari tidak ada atau telah dihapus." />;
  if (!user) return null;
  if (post.author.id !== user.id) return <ErrorCard title="Akses Ditolak" desc="Anda tidak memiliki akses untuk mengedit postingan ini." />;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChannelHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6 md:px-6 space-y-5">

          {/* Hero card */}
          <div className="rounded-[28px] p-5"
            style={{ background: "#fff4ed", border: "1px solid #ffd5b4", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-[16px] flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}>
                <Pencil className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-[var(--forum-text-primary)] tracking-tight">Edit Postingan</h1>
                <p className="text-sm text-[var(--forum-text-muted)]">Perbarui konten postingan Anda.</p>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-[28px] p-6 md:p-8"
            style={{ background: "#ffffff", border: "1px solid #e8e6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <PostForm
              mode="edit"
              initialData={{ id: post.id, title: post.title, categoryId: post.category.id, content: post.content }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
