"use client";

import Link from "next/link";

import { MessageSquare } from "lucide-react";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="block h-full group">
      <div 
        className="relative flex flex-col p-6 rounded-[24px] h-full transition-all duration-500 hover:-translate-y-1"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at top left, rgba(124,58,237,0.15), transparent 70%)",
            border: "1px solid rgba(167,139,250,0.3)",
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-xl font-bold text-white/95 group-hover:text-white transition-colors">
            {category.name}
          </h3>
          
          {category.description && (
            <p className="mt-3 text-[15px] text-white/50 line-clamp-2 leading-relaxed flex-1">
              {category.description}
            </p>
          )}

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/40">
              <MessageSquare className="h-4 w-4" />
              <span>{category.post_count ?? 0} Diskusi</span>
            </div>
            
            <div className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <span className="text-white/60 text-xs">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
