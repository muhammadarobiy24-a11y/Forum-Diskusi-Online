"use client";

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
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onChange("")}
        className="px-4 py-2 text-sm font-bold rounded-2xl transition-all duration-300"
        style={{
          background: !value ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: !value ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.08)",
          color: !value ? "white" : "rgba(255,255,255,0.6)",
          boxShadow: !value ? "0 4px 20px rgba(124,58,237,0.2)" : "none",
        }}
      >
        Semua
      </button>
      
      {categories.map((category) => {
        const isActive = value === category.slug;
        return (
          <button
            key={category.id}
            onClick={() => onChange(category.slug)}
            className="px-4 py-2 text-sm font-bold rounded-2xl transition-all duration-300 hover:text-white"
            style={{
              background: isActive ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: isActive ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.08)",
              color: isActive ? "white" : "rgba(255,255,255,0.6)",
              boxShadow: isActive ? "0 4px 20px rgba(124,58,237,0.2)" : "none",
            }}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
