"use client";

import { useState, useRef } from "react";
import { PlusCircle, SendHorizontal } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "@/services/post.service";
import type { Community } from "../types/community";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/lib/constants/query-keys";

interface MessageInputProps {
  community: Community;
}

export default function MessageInput({ community }: MessageInputProps) {
  const [content, setContent] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (messageText: string) => {
      // Auto-generate title for chat messages
      let title = messageText.slice(0, 50);
      if (messageText.length > 50) title += "...";
      
      return addPost({
        title: title || "New Message",
        content: messageText,
        categoryId: community.category_id,
        communityId: community.id,
      });
    },
    onSuccess: () => {
      // Invalidate posts query to fetch new messages
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts });
      setContent("");
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 0);
    },
    onError: (error) => {
      toast.error("Gagal mengirim pesan: " + error.message);
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!content.trim() || isPending) return;
      sendMessage(content.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isPending) return;
    sendMessage(content.trim());
  };

  return (
    <div className="px-4 pb-6 pt-2 sticky bottom-0 w-full shrink-0 z-20 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-end p-2 rounded-[24px] shadow-2xl transition-all duration-300 focus-within:shadow-[0_8px_32px_rgba(124,58,237,0.2)]"
          style={{
            background: "rgba(20,20,30,0.7)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Ambient glow behind input when focused could be added here if needed */}
          
          <button
            type="button"
            title="Tambah lampiran"
            className="p-3 mr-1 rounded-2xl text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0 mb-1"
          >
            <PlusCircle className="h-6 w-6" />
          </button>
          
          <textarea
            ref={inputRef}
            rows={1}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Kirim pesan ke #${community.slug}`}
            disabled={isPending}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-[15px] resize-none max-h-32 min-h-[44px] py-3 px-2 scrollbar-thin"
          />

          <button
            type="submit"
            disabled={!content.trim() || isPending}
            className="p-3 ml-2 rounded-2xl shrink-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-1"
            style={{
              background: content.trim() ? "linear-gradient(135deg, #7c3aed, #3b82f6)" : "rgba(255,255,255,0.05)",
              color: content.trim() ? "white" : "rgba(255,255,255,0.3)",
              boxShadow: content.trim() ? "0 4px 15px rgba(124,58,237,0.3)" : "none",
            }}
          >
            <SendHorizontal className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
