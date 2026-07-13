"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/components/providers/SessionProvider";
import { fetchPost } from "@/services/post.service";
import PostForm from "@/components/post/PostForm";
import PostDetailSkeleton from "@/components/post/PostDetailSkeleton";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    if (!isSessionLoading && !user) {
      router.push("/login");
    }
  }, [user, isSessionLoading, router]);

  if (isSessionLoading || isLoading) {
    return <PostDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold">Terjadi kesalahan</h2>
        <p className="text-muted-foreground mt-2 mb-4">
          Gagal memuat postingan.
        </p>
        <Button onClick={() => window.location.reload()}>Coba lagi</Button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">Postingan tidak ditemukan</h2>
        <p className="text-muted-foreground mt-2">
          Postingan yang Anda cari tidak ada atau telah dihapus.
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (post.author.id !== user.id) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">Akses ditolak</h2>
        <p className="text-muted-foreground mt-2 mb-4">
          Anda tidak memiliki akses ke postingan ini.
        </p>
        <Button onClick={() => router.push("/post")}>Kembali ke posts</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Postingan</h1>
        <p className="text-muted-foreground mt-1">
          Perbarui postingan Anda.
        </p>
      </div>

      <PostForm
        mode="edit"
        initialData={{
          id: post.id,
          title: post.title,
          categoryId: post.category.id,
          content: post.content,
        }}
      />
    </div>
  );
}
