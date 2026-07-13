"use client";

import CategoryCard from "./CategoryCard";
import CategoryListSkeleton from "./CategoryListSkeleton";
import CategoryEmptyState from "./CategoryEmptyState";
import type { Category } from "@/types";

interface CategoryListProps {
  categories: Category[] | undefined;
  isLoading: boolean;
}

export default function CategoryList({ categories, isLoading }: CategoryListProps) {
  if (isLoading) {
    return <CategoryListSkeleton />;
  }

  if (!categories || categories.length === 0) {
    return <CategoryEmptyState />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
