"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { commentSchema, type CommentFormValues } from "@/schemas/comment.schema";
import { useCreateComment } from "@/hooks/useCreateComment";

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const { mutate: createComment, isPending } = useCreateComment(postId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(data: CommentFormValues) {
    createComment(data, {
      onSuccess: () => {
        reset();
      },
    });
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
      <Button type="submit" size="sm" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            Mengirim...
          </>
        ) : (
          "Kirim"
        )}
      </Button>
    </form>
  );
}
