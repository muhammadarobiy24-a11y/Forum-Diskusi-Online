"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PostSort } from "@/types/post";

interface PostSortProps {
  value: PostSort;
  onChange: (value: PostSort) => void;
}

export default function PostSort({ value, onChange }: PostSortProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as PostSort)}>
      <SelectTrigger 
        className="w-[220px] h-[52px] text-sm font-semibold rounded-[20px] border outline-none transition-all duration-300 shadow-lg text-white/90"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.02)",
        }}
      >
        <SelectValue placeholder="Urutkan" />
      </SelectTrigger>
      <SelectContent
        className="rounded-[20px] border shadow-2xl"
        style={{
          background: "rgba(15,10,30,0.85)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          borderColor: "rgba(255,255,255,0.1)",
        }}
      >
        <div className="p-1 space-y-0.5">
          <SelectItem value="newest" className="rounded-xl px-3 py-2.5 text-sm font-semibold text-white/70 focus:text-white focus:bg-white/10 cursor-pointer">
            Terbaru
          </SelectItem>
          <SelectItem value="oldest" className="rounded-xl px-3 py-2.5 text-sm font-semibold text-white/70 focus:text-white focus:bg-white/10 cursor-pointer">
            Terlama
          </SelectItem>
          <SelectItem value="most_viewed" className="rounded-xl px-3 py-2.5 text-sm font-semibold text-white/70 focus:text-white focus:bg-white/10 cursor-pointer">
            Paling Banyak Dilihat
          </SelectItem>
          <SelectItem value="most_commented" className="rounded-xl px-3 py-2.5 text-sm font-semibold text-white/70 focus:text-white focus:bg-white/10 cursor-pointer">
            Paling Banyak Komentar
          </SelectItem>
        </div>
      </SelectContent>
    </Select>
  );
}
