"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useSession } from "@/components/providers/SessionProvider";
import { ArrowLeft } from "lucide-react";
import CategoryForm from "@/components/category/CategoryForm";
import type { CategoryInput } from "@/schemas/category-schema";

export default function CreateCategoryPage() {
  const { user } = useSession();
  const router = useRouter();
  const supabase = createClient();

  const createMutation = useMutation({
    mutationFn: async (data: CategoryInput) => {
      const { error } = await supabase.from("categories").insert({
        name: data.name,
        slug: data.slug,
        description: data.description || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Category created successfully");
      router.push("/admin/categories");
    },
    onError: () => {
      toast.error("Failed to create category");
    },
  });

  if (!user || user.app_metadata?.role !== "admin") {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-muted-foreground">Access denied. Admin only.</p>
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
        onSubmit={async (data) => {
          await createMutation.mutateAsync(data);
        }}
        isLoading={createMutation.isPending}
      />
    </div>
  );
}
