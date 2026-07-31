"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { commentSchema, type CommentFormValues } from "@/schemas/comment.schema";
import { useCreateComment } from "@/hooks/useCreateComment";
import { cn } from "@/lib/utils";

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const { mutate: createComment, isPending } = useCreateComment(postId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = isPending || isSubmitting;

  function onSubmit(data: CommentFormValues) {
    createComment(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div 
        className="relative group rounded-3xl overflow-hidden transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,0.05)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)";
        }}
      >
        <textarea
          placeholder="Tuliskan komentar Anda di sini..."
          disabled={isLoading}
          className="w-full min-h-[120px] p-6 bg-transparent text-sm md:text-base font-medium text-white/90 placeholder:text-white/30 outline-none resize-y"
          {...register("content")}
        />
        
        <div className="absolute bottom-4 right-4 flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
              boxShadow: "0 4px 15px rgba(124,58,237,0.4)",
            }}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Kirim
          </button>
        </div>
      </div>
      
      {errors.content && (
        <p className="text-sm font-semibold text-red-400 ml-4">{errors.content.message}</p>
      )}
    </form>
  );
}
