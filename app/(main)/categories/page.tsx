"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useDebounce } from "@/hooks/useDebounce";
import CategoryList from "@/components/category/CategoryList";
import CategoryFilter from "@/components/category/CategoryFilter";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";

export default function CategoriesPage() {
  const [localSearch, setLocalSearch] = useState("");
  const debouncedSearch = useDebounce(localSearch, 500);

  const { data: categories, isLoading } = useCategories(debouncedSearch || undefined);

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <ChannelHeader 
        channelName="categories" 
        channelDescription="Jelajahi kategori dan temukan diskusi yang menarik" 
      />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 space-y-8">
          <div>
            <h1 className="text-3xl font-black text-white/95 tracking-tight">Semua Kategori</h1>
            <p className="text-white/50 mt-2 font-medium">
              Temukan berbagai topik menarik dan bergabunglah dalam diskusi yang sesuai dengan minat Anda.
            </p>
          </div>

          <CategoryFilter value={localSearch} onChange={setLocalSearch} />

          <CategoryList categories={categories} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
