"use client";

import { useSession } from "@/components/providers/SessionProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PostForm from "@/components/post/PostForm";
import { Loader2 } from "lucide-react";

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
      <div className="max-w-4xl mx-auto flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Buat Postingan</h1>
        <p className="text-muted-foreground mt-1">
          Bagikan ide dan diskusi Anda dengan komunitas.
        </p>
      </div>

      <PostForm mode="create" />
    </div>
  );
}
