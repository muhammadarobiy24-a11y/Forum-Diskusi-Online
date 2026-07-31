"use client";

import { Heart } from "lucide-react";
import { useToggleLike } from "@/hooks/useToggleLike";
import { useSession } from "@/components/providers/SessionProvider";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  postId: string;
  isLiked: boolean;
  likeCount: number;
}

export default function LikeButton({ postId, isLiked, likeCount }: LikeButtonProps) {
  const { user } = useSession();
  const { mutate: toggleLike, isPending } = useToggleLike(user?.id);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    toggleLike(postId);
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending || !user}
      aria-label={isLiked ? "Hapus like" : "Tambah like"}
      title={isLiked ? "Hapus like" : "Tambah like"}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300",
        isLiked
          ? "text-red-400 bg-red-500/10 border-red-500/20"
          : "text-white/50 hover:text-white hover:bg-white/10 border-transparent"
      )}
      style={{
        borderWidth: 1,
        borderStyle: "solid",
      }}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-transform",
          isLiked ? "fill-current scale-110" : "scale-100",
          isPending && "opacity-50"
        )}
      />
      <span>{likeCount}</span>
    </button>
  );
}
