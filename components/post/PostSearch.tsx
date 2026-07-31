"use client";

import { Search } from "lucide-react";

interface PostSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PostSearch({ value, onChange }: PostSearchProps) {
  return (
    <div className="relative group">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search size={16} className="text-[var(--forum-text-muted)] transition-colors group-focus-within:text-violet-500" />
      </div>
      <input
        type="text"
        placeholder="Cari diskusi atau topik..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm font-medium text-[var(--forum-text-primary)] placeholder:text-[var(--forum-text-muted)] outline-none transition-all duration-200"
        style={{
          background: "#f3f2ef",
          border: "1.5px solid #e5e3de",
          borderRadius: 999,
          padding: "0.75rem 1.25rem 0.75rem 3rem",
        }}
        onFocus={(e) => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.borderColor = "#7c3aed";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.background = "#f3f2ef";
          e.currentTarget.style.borderColor = "#e5e3de";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}
