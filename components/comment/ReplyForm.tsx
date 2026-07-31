"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CornerDownRight, X } from "lucide-react";
import { commentSchema, type CommentFormValues } from "@/schemas/comment.schema";
import { useCreateReply } from "@/hooks/useCreateReply";

export default function ReplyForm({ parentId, postId, onCancel }: { parentId: string; postId: string; onCancel: () => void }) {
  const { mutate: createReply, isPending } = useCreateReply(parentId);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "" },
  });

  function onSubmit(data: CommentFormValues) {
    createReply({ postId, content: data.content }, { onSuccess: () => { reset(); onCancel(); } });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="rounded-[20px] overflow-hidden transition-all duration-200"
        style={{ background: "#f5f4f0", border: "1.5px solid #e5e3de" }}
        onFocus={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.10)"; }}
        onBlur={e => { e.currentTarget.style.borderColor = "#e5e3de"; e.currentTarget.style.boxShadow = "none"; }}>
        <textarea
          placeholder="Tulis balasan..."
          disabled={isPending}
          className="w-full min-h-[72px] p-4 bg-transparent text-sm font-medium text-[var(--forum-text-primary)] placeholder:text-[var(--forum-text-muted)] outline-none resize-y"
          {...register("content")}
        />
      </div>

      {errors.content && (
        <p className="text-xs font-semibold text-red-500 ml-1">{errors.content.message}</p>
      )}

      <div className="flex items-center gap-2">
        <button type="submit" disabled={isPending}
          className="forum-btn-accent flex items-center gap-1.5 px-4 py-2 rounded-full text-xs disabled:opacity-50">
          {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CornerDownRight className="h-3.5 w-3.5" />}
          Balas
        </button>
        <button type="button" onClick={onCancel} disabled={isPending}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[var(--forum-text-muted)] hover:text-[var(--forum-text-primary)] hover:bg-gray-100 transition-all">
          <X className="h-3.5 w-3.5" />Batal
        </button>
      </div>
    </form>
  );
}
