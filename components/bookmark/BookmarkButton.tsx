"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToggleBookmark } from "@/hooks/useToggleBookmark";
import { useSession } from "@/components/providers/SessionProvider";

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
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      disabled={isPending || !user}
      aria-label={isBookmarked ? "Hapus bookmark" : "Tambah bookmark"}
      title={isBookmarked ? "Hapus bookmark" : "Tambah bookmark"}
    >
      <Bookmark
        className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`}
      />
    </Button>
  );
}
