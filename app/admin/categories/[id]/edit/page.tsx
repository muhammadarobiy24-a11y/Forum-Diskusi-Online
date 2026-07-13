"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useSession } from "@/components/providers/SessionProvider";
import { ArrowLeft } from "lucide-react";
import CategoryForm from "@/components/category/CategoryForm";
import type { Category } from "@/types";
import type { CategoryInput } from "@/schemas/category-schema";

export default function EditCategoryPage() {
  const { user } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const queryClient = useQueryClient();
  const supabase = createClient();

  const { data: category, isLoading } = useQuery({
    queryKey: ["admin-category", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Category;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: CategoryInput) => {
      const { error } = await supabase
        .from("categories")
        .update({
          name: data.name,
          slug: data.slug,
          description: data.description || null,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Category updated successfully");
      router.push("/admin/categories");
    },
    onError: () => {
      toast.error("Failed to update category");
    },
  });

  if (!user || user.user_metadata?.role !== "admin") {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-muted-foreground">Access denied. Admin only.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-muted-foreground">Category not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to categories
      </Link>

      <CategoryForm
        category={category}
        onSubmit={async (data) => {
          await updateMutation.mutateAsync(data);
        }}
        isLoading={updateMutation.isPending}
      />
    </div>
  );
}
