"use client";

import { useSession } from "@/components/providers/SessionProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PostForm from "@/components/post/PostForm";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import { Loader2, PenSquare } from "lucide-react";

export default function CreatePostPage() {
  const { user, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <ChannelHeader />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChannelHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6 md:px-6 space-y-5">

          {/* Hero card */}
          <div className="rounded-[28px] p-5"
            style={{ background: "#f0edff", border: "1px solid #d4caff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-[16px] flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
                <PenSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-[var(--forum-text-primary)] tracking-tight">Buat Postingan</h1>
                <p className="text-sm text-[var(--forum-text-muted)]">Bagikan ide dan diskusi Anda dengan komunitas.</p>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-[28px] p-6 md:p-8"
            style={{ background: "#ffffff", border: "1px solid #e8e6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <PostForm mode="create" />
          </div>

        </div>
      </div>
    </div>
  );
}
