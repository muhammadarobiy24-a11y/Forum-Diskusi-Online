"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CornerDownRight, X } from "lucide-react";
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
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <textarea
          placeholder="Tulis balasan..."
          disabled={isPending}
          className="w-full min-h-[80px] p-4 bg-transparent text-sm font-medium text-white/90 placeholder:text-white/30 outline-none resize-y"
          {...register("content")}
        />
      </div>

      {errors.content && (
        <p className="text-xs font-semibold text-red-400 ml-1">{errors.content.message}</p>
      )}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", boxShadow: "0 4px 12px rgba(124,58,237,0.35)" }}
        >
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <CornerDownRight className="h-3.5 w-3.5" />
          )}
          Balas
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
        >
          <X className="h-3.5 w-3.5" />
          Batal
        </button>
      </div>
    </form>
  );
}
