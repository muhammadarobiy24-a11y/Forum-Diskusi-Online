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
        <Search size={16} className="text-white/40 transition-colors group-focus-within:text-violet-400" />
      </div>
      <input
        type="text"
        placeholder="Cari diskusi atau topik..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm font-medium text-white/90 placeholder:text-white/30 outline-none transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "1rem 1.25rem 1rem 3rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.02)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,0.02)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.02)";
        }}
      />
    </div>
  );
}
