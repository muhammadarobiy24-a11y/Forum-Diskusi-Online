"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { commentSchema, type CommentFormValues } from "@/schemas/comment.schema";
import { useCreateComment } from "@/hooks/useCreateComment";

export default function CommentForm({ postId }: { postId: string }) {
  const { mutate: createComment, isPending } = useCreateComment(postId);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "" },
  });
  const isLoading = isPending || isSubmitting;

  function onSubmit(data: CommentFormValues) {
    createComment(data, { onSuccess: () => reset() });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="relative rounded-[24px] overflow-hidden transition-all duration-200"
        style={{ background: "#f5f4f0", border: "1.5px solid #e5e3de" }}
        onFocus={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12)"; }}
        onBlur={e => { e.currentTarget.style.borderColor = "#e5e3de"; e.currentTarget.style.boxShadow = "none"; }}>
        <textarea
          placeholder="Tuliskan komentar Anda di sini..."
          disabled={isLoading}
          className="w-full min-h-[100px] p-5 bg-transparent text-sm font-medium text-[var(--forum-text-primary)] placeholder:text-[var(--forum-text-muted)] outline-none resize-y"
          {...register("content")}
        />
        <div className="flex justify-end px-4 pb-4">
          <button type="submit" disabled={isLoading}
            className="forum-btn-accent flex items-center gap-2 px-5 py-2 rounded-full text-sm disabled:opacity-50">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Kirim
          </button>
        </div>
      </div>
      {errors.content && (
        <p className="text-sm font-semibold text-red-500 ml-2">{errors.content.message}</p>
      )}
    </form>
  );
}
