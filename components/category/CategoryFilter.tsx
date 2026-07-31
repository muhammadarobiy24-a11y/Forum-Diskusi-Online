"use client";

import { Search } from "lucide-react";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="relative group w-full max-w-xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-violet-400 transition-colors pointer-events-none" />
      <input
        type="text"
        placeholder="Cari kategori..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl text-[15px] font-medium text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all shadow-inner"
      />
    </div>
  );
}
