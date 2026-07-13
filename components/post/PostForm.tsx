"use client";

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { postSchema, type PostFormValues } from "@/schemas/post.schema";
import { useCreatePost } from "@/hooks/useCreatePost";
import { useUpdatePost } from "@/hooks/useUpdatePost";
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
  const supabase = createClient();

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
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      categoryId: initialData?.categoryId || "",
      content: initialData?.content || "",
    },
  });

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
            <Textarea
              id="content"
              placeholder="Tulis isi postingan Anda di sini..."
              disabled={isPending}
              className="min-h-[200px]"
              {...register("content")}
            />
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
