"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { commentSchema, type CommentFormValues } from "@/schemas/comment.schema";
import { useCreateReply } from "@/hooks/useCreateReply";

interface ReplyFormProps {
  parentId: string;
  postId: string;
  onCancel: () => void;
}

export default function ReplyForm({ parentId, postId, onCancel }: ReplyFormProps) {
  const { mutate: createReply, isPending } = useCreateReply(parentId);

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
    createReply(
      { postId, content: data.content },
      {
        onSuccess: () => {
          reset();
          onCancel();
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Textarea
        placeholder="Tulis balasan..."
        disabled={isPending}
        className="min-h-[60px]"
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
              Mengirim...
            </>
          ) : (
            "Balas"
          )}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={isPending}>
          Batal
        </Button>
      </div>
    </form>
  );
}
