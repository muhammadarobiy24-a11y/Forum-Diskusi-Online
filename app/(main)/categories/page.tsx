"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import CategoryList from "@/components/category/CategoryList";
import CategoryFilter from "@/components/category/CategoryFilter";

export default function CategoriesPage() {
  const [localSearch, setLocalSearch] = useState("");
  const debouncedSearch = useDebounce(localSearch, 500);

  const { data: categories, isLoading } = useCategories(debouncedSearch || undefined);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Categories</h1>
        <p className="text-muted-foreground mt-1">
          Browse categories and find discussions that interest you.
        </p>
      </div>

      <CategoryFilter value={localSearch} onChange={setLocalSearch} />

      <CategoryList categories={categories} isLoading={isLoading} />
    </div>
  );
}
