"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categorySchema, type CategoryInput } from "@/schemas/category-schema";
import { slugify } from "@/lib/utils/slug";
import type { Category } from "@/types";

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: CategoryInput) => Promise<void>;
  isLoading?: boolean;
}

export default function CategoryForm({
  category,
  onSubmit,
  isLoading = false,
}: CategoryFormProps) {
  const [autoSlug, setAutoSlug] = useState(!category);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
    },
  });

  const watchName = watch("name");

  useEffect(() => {
    if (autoSlug && watchName) {
      setValue("slug", slugify(watchName));
    }
  }, [watchName, autoSlug, setValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{category ? "Edit Category" : "Create Category"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              placeholder="Category name"
              disabled={isLoading}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug
            </label>
            <Input
              id="slug"
              placeholder="category-slug"
              disabled={isLoading}
              {...register("slug", {
                onChange: () => setAutoSlug(false),
              })}
            />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Auto-generated from name. Edit manually to customize.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Optional description..."
              disabled={isLoading}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : category ? (
              "Update Category"
            ) : (
              "Create Category"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
