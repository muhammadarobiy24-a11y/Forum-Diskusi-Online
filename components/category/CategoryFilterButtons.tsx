"use client";

import { Button } from "@/components/ui/button";
import type { Category } from "@/types";

interface CategoryFilterButtonsProps {
  categories: Category[];
  value?: string;
  onChange: (value: string) => void;
}

export default function CategoryFilterButtons({
  categories,
  value,
  onChange,
}: CategoryFilterButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={!value ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("")}
      >
        Semua
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={value === category.slug ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(category.slug)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
