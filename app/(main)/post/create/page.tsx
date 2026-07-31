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
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full overflow-hidden relative">
        <ChannelHeader channelName="buat postingan" channelDescription="Tulis dan bagikan diskusi Anda" />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <ChannelHeader channelName="buat postingan" channelDescription="Tulis dan bagikan diskusi Anda" />

      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 space-y-8">

          {/* Page Header */}
          <div className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                boxShadow: "0 0 24px rgba(124,58,237,0.5)",
              }}
            >
              <PenSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white/95 tracking-tight">Buat Postingan</h1>
              <p className="text-[15px] text-white/50 font-medium mt-0.5">
                Bagikan ide dan diskusi Anda dengan komunitas.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div
            className="rounded-[32px] p-6 md:p-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <PostForm mode="create" />
          </div>

        </div>
      </div>
    </div>
  );
}
