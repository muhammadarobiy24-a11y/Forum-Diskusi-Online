"use client";

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
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
        className="w-[200px] h-[46px] text-sm font-semibold rounded-full border outline-none transition-all duration-200"
        style={{
          background: "#f3f2ef",
          borderColor: "#e5e3de",
          color: "var(--forum-text-primary)",
          boxShadow: "none",
        }}
      >
        <SelectValue placeholder="Urutkan" />
      </SelectTrigger>
      <SelectContent
        className="rounded-[24px] border shadow-lg"
        style={{
          background: "#ffffff",
          borderColor: "#e8e6f0",
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
        }}
      >
        <div className="p-1 space-y-0.5">
          {[
            { value: "newest",        label: "Terbaru" },
            { value: "oldest",        label: "Terlama" },
            { value: "most_viewed",   label: "Paling Banyak Dilihat" },
            { value: "most_commented",label: "Paling Banyak Komentar" },
          ].map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="rounded-[16px] px-3 py-2.5 text-sm font-semibold cursor-pointer"
              style={{ color: "var(--forum-text-secondary)" }}
            >
              {opt.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}
