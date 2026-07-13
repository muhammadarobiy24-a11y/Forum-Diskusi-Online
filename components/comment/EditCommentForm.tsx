"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { commentSchema, type CommentFormValues } from "@/schemas/comment.schema";
import { useUpdateComment } from "@/hooks/useUpdateComment";

interface EditCommentFormProps {
  commentId: string;
  initialContent: string;
  postId: string;
  onCancel: () => void;
}

export default function EditCommentForm({
  commentId,
  initialContent,
  postId,
  onCancel,
}: EditCommentFormProps) {
  const { mutate: updateComment, isPending } = useUpdateComment(postId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: initialContent,
    },
  });

  function onSubmit(data: CommentFormValues) {
    updateComment(
      { id: commentId, content: data.content },
      {
        onSuccess: () => {
          onCancel();
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Textarea
        placeholder="Tulis komentar..."
        disabled={isPending}
        className="min-h-[80px]"
        {...register("content")}
      />
      {errors.content && (
        <p className="text-sm text-destructive">{errors.content.message}</p>
      )}
      <div className="flex items-center gap-2">
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              Simpan...
            </>
          ) : (
            "Simpan"
          )}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={isPending}>
          Batal
        </Button>
      </div>
    </form>
  );
}
