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
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Urutkan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Terbaru</SelectItem>
        <SelectItem value="oldest">Terlama</SelectItem>
        <SelectItem value="most_viewed">Paling Banyak Dilihat</SelectItem>
        <SelectItem value="most_commented">Paling Banyak Komentar</SelectItem>
      </SelectContent>
    </Select>
  );
}
