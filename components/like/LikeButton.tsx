"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToggleLike } from "@/hooks/useToggleLike";
import { useSession } from "@/components/providers/SessionProvider";

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
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={isPending || !user}
      aria-label={isLiked ? "Hapus like" : "Tambah like"}
      title={isLiked ? "Hapus like" : "Tambah like"}
      className="gap-1"
    >
      <Heart
        className={`h-5 w-5 ${isLiked ? "fill-current text-red-500" : ""}`}
      />
      <span>{likeCount}</span>
    </Button>
  );
}
