"use client";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ImagePlus, Video } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { postSchema, type PostFormValues } from "@/schemas/post.schema";
import { useCreatePost } from "@/hooks/useCreatePost";
import { useUpdatePost } from "@/hooks/useUpdatePost";
import { useSession } from "@/components/providers/SessionProvider";
import type { Category } from "@/types";

interface PostFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    title: string;
    categoryId: string;
    content: string;
  };
}

export default function PostForm({ mode, initialData }: PostFormProps) {
  const { mutate: createPost, isPending: isCreating } = useCreatePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();
  const { user } = useSession();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const isPending = isCreating || isUpdating;

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      categoryId: initialData?.categoryId || "",
      content: initialData?.content || "",
    },
  });

  async function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Determine type
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    
    if (!isVideo && !isImage) {
      toast.error("Hanya file gambar dan video yang diperbolehkan");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 20MB");
      return;
    }

    setIsUploadingMedia(true);
    toast.loading("Mengunggah media...", { id: "upload-media" });

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        throw new Error(uploadError.message === "Bucket not found" ? "Bucket 'post-images' belum dibuat di Supabase" : uploadError.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("post-images").getPublicUrl(fileName);

      const markdownTag = isVideo ? `\n\n[video](${publicUrl})\n` : `\n\n![Gambar Sisipan](${publicUrl})\n`;
      const currentContent = getValues("content");
      setValue("content", currentContent + markdownTag, { shouldValidate: true });

      toast.success("Media berhasil dilampirkan", { id: "upload-media" });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Gagal mengunggah media", { id: "upload-media" });
    } finally {
      setIsUploadingMedia(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function onSubmit(data: PostFormValues) {
    if (mode === "edit" && initialData) {
      updatePost({ id: initialData.id, ...data });
    } else {
      createPost(data);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === "edit" ? "Edit Postingan" : "Buat Postingan Baru"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Judul
            </label>
            <Input
              id="title"
              placeholder="Judul postingan Anda..."
              disabled={isPending}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="categoryId" className="text-sm font-medium">
              Kategori
            </label>
            <select
              id="categoryId"
              disabled={isPending}
              className="flex h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80"
              {...register("categoryId")}
            >
              <option value="">Pilih kategori</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-destructive">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Isi Postingan
            </label>
            <div className="flex flex-col gap-2">
              <Textarea
                id="content"
                placeholder="Tulis isi postingan Anda di sini..."
                disabled={isPending}
                className="min-h-[200px]"
                {...register("content")}
              />
              
              {/* Media Toolbar */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isUploadingMedia || isPending}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[var(--forum-text-secondary)] hover:text-violet-600 hover:bg-violet-50 border border-gray-200 rounded-full transition-colors disabled:opacity-50"
                >
                  {isUploadingMedia ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ImagePlus className="h-4 w-4" />
                  )}
                  Sisipkan Foto/Video
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                />
              </div>
            </div>
            
            {errors.content && (
              <p className="text-sm text-destructive">
                {errors.content.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : mode === "edit" ? (
              "Perbarui"
            ) : (
              "Terbitkan"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
