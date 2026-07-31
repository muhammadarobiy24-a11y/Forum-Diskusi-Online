"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useDeleteComment } from "@/hooks/useDeleteComment";

interface DeleteCommentButtonProps {
  commentId: string;
  postId: string;
}

export default function DeleteCommentButton({ commentId, postId }: DeleteCommentButtonProps) {
  const [open, setOpen] = useState(false);
  const { mutate: deleteComment, isPending } = useDeleteComment(postId);

  function handleDelete() {
    deleteComment(commentId, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
      >
        <Trash2 className="h-3 w-3" />
        Hapus
      </button>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          
          {/* Dialog */}
          <div
            className="relative z-10 w-full max-w-sm p-6 rounded-3xl shadow-2xl"
            style={{
              background: "rgba(15,10,30,0.95)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <Trash2 className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Hapus Komentar?</h3>
                <p className="text-xs font-medium text-white/50 mt-0.5">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="flex-1 py-2.5 rounded-2xl text-sm font-bold text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/10 disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)", boxShadow: "0 4px 15px rgba(239,68,68,0.4)" }}
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
