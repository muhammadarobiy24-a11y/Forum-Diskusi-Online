"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  createCommunitySchema,
  type CreateCommunitySchema,
} from "../schemas/community.schema";
import { useCreateCommunity } from "../hooks/useCreateCommunity";
import { useCategories } from "@/hooks/useCategories";
import { slugify } from "@/lib/utils/slug";

const VISIBILITY_OPTIONS = [
  {
    value: "public",
    label: "Public",
    description: "Siapa saja bisa melihat dan bergabung.",
  },
  {
    value: "restricted",
    label: "Restricted",
    description: "Siapa saja bisa melihat, tapi perlu persetujuan untuk join.",
  },
  {
    value: "private",
    label: "Private",
    description: "Hanya member yang dapat melihat konten.",
  },
] as const;

export default function CommunityForm() {
  const router = useRouter();
  const [autoSlug, setAutoSlug] = useState(true);

  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const { mutate: createCommunity, isPending } = useCreateCommunity();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateCommunitySchema>({
    resolver: zodResolver(createCommunitySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      category_id: "",
      visibility: "public",
    },
  });

  const watchName = watch("name");

  useEffect(() => {
    if (autoSlug && watchName) {
      setValue("slug", slugify(watchName), { shouldValidate: true });
    }
  }, [watchName, autoSlug, setValue]);

  function onSubmit(data: CreateCommunitySchema) {
    createCommunity(data, {
      onSuccess: (community) => {
        toast.success(`Community r/${community.slug} berhasil dibuat!`);
        router.push(`/communities/${community.slug}`);
      },
      onError: (error) => {
        toast.error(error.message || "Gagal membuat community.");
      },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buat Community Baru</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nama Community <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              placeholder="Contoh: Programming Indonesia"
              disabled={isPending}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug <span className="text-destructive">*</span>
            </label>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground select-none">
                r/
              </span>
              <Input
                id="slug"
                placeholder="programming-indonesia"
                disabled={isPending}
                {...register("slug", {
                  onChange: () => setAutoSlug(false),
                })}
              />
            </div>
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Otomatis dari nama. Edit manual untuk kustomisasi. Hanya huruf
              kecil, angka, dan tanda -{" "}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Deskripsi
            </label>
            <Textarea
              id="description"
              placeholder="Jelaskan tujuan community ini..."
              rows={3}
              disabled={isPending}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category_id" className="text-sm font-medium">
              Kategori <span className="text-destructive">*</span>
            </label>
            <select
              id="category_id"
              disabled={isPending || categoriesLoading}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...register("category_id")}
            >
              <option value="">
                {categoriesLoading ? "Memuat kategori..." : "Pilih kategori"}
              </option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-sm text-destructive">
                Kategori wajib dipilih.
              </p>
            )}
          </div>

          {/* Visibility */}
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Visibilitas <span className="text-destructive">*</span>
            </p>
            <div className="space-y-2">
              {VISIBILITY_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent transition-colors"
                >
                  <input
                    type="radio"
                    value={opt.value}
                    disabled={isPending}
                    className="mt-0.5"
                    {...register("visibility")}
                  />
                  <div>
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {opt.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            {errors.visibility && (
              <p className="text-sm text-destructive">
                {errors.visibility.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Membuat Community...
              </>
            ) : (
              "Buat Community"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
