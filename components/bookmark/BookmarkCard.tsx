"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, MessageCircle } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils/date";
import { useSession } from "@/components/providers/SessionProvider";
import { useLikeStatus } from "@/hooks/useLikeStatus";
import LikeButton from "@/components/like/LikeButton";
import BookmarkButton from "@/components/bookmark/BookmarkButton";
import type { Bookmark } from "@/types/bookmark";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const { user } = useSession();
  const post = bookmark.post;
  const { data: isLiked } = useLikeStatus(user?.id, post?.id || "");

  if (!post) return null;

  return (
    <div className="relative">
      <Link href={`/post/${post.id}`}>
        <Card className="transition-colors hover:bg-muted/50 cursor-pointer h-full">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
              {post.category && (
                <Badge variant="secondary" className="shrink-0">
                  {post.category.name}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="font-medium text-foreground">
                  {post.author?.username || "Anonymous"}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments?.[0]?.count ?? 0}</span>
                </div>
                <LikeButton
                  postId={post.id}
                  isLiked={isLiked ?? false}
                  likeCount={post.likes?.[0]?.count ?? 0}
                />
                <BookmarkButton
                  postId={post.id}
                  isBookmarked={true}
                />
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatRelativeDate(post.created_at)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
