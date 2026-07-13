"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Clock, ArrowLeft, Pencil, MessageCircle } from "lucide-react";
import { formatDate } from "@/lib/utils/date";
import { useSession } from "@/components/providers/SessionProvider";
import DeletePostButton from "./DeletePostButton";
import type { Post } from "@/types/post";

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const { user } = useSession();
  const initials = (post.author?.username || "A").slice(0, 2).toUpperCase();
  const isAuthor = user?.id === post.author?.id;

  return (
    <article className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/post"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to posts
      </Link>

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <div className="flex items-center gap-2 shrink-0">
            {post.category && (
              <Badge variant="secondary">
                {post.category.name}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar size="sm">
                {post.author?.avatar_url && (
                  <AvatarImage src={post.author.avatar_url} alt={post.author.username} />
                )}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-foreground">
                {post.author?.username || "Anonymous"}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(post.created_at)}</span>
            </div>

            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.views} views</span>
            </div>

            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comment_count} komentar</span>
            </div>
          </div>

          {isAuthor && (
            <div className="flex items-center gap-2">
              <Link href={`/post/${post.id}/edit`}>
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </Link>
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-base leading-relaxed">
          {post.content}
        </div>
      </div>
    </article>
  );
}
