"use client";

import { Bookmark } from "lucide-react";
import { useToggleBookmark } from "@/hooks/useToggleBookmark";
import { useSession } from "@/components/providers/SessionProvider";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  postId: string;
  isBookmarked: boolean;
}

export default function BookmarkButton({ postId, isBookmarked }: BookmarkButtonProps) {
  const { user } = useSession();
  const { mutate: toggleBookmark, isPending } = useToggleBookmark(user?.id);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    toggleBookmark(postId);
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending || !user}
      aria-label={isBookmarked ? "Hapus bookmark" : "Tambah bookmark"}
      title={isBookmarked ? "Hapus bookmark" : "Tambah bookmark"}
      className={cn(
        "flex items-center justify-center p-1.5 rounded-full transition-all duration-300",
        isBookmarked
          ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
          : "text-white/50 hover:text-white hover:bg-white/10 border-transparent"
      )}
      style={{
        borderWidth: 1,
        borderStyle: "solid",
      }}
    >
      <Bookmark
        className={cn(
          "h-4 w-4 transition-transform",
          isBookmarked ? "fill-current scale-110" : "scale-100",
          isPending && "opacity-50"
        )}
      />
    </button>
  );
}
