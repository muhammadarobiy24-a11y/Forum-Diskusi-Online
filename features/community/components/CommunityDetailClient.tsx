"use client";

import { useEffect, useRef } from "react";
import { Hash, FileText, Loader2 } from "lucide-react";
import type { Community } from "../types/community";
import { usePosts } from "@/hooks/usePosts";
import MessageItem from "./MessageItem";

interface CommunityDetailClientProps {
  community: Community;
}

export default function CommunityDetailClient({ community }: CommunityDetailClientProps) {
  const { data, isLoading } = usePosts({ 
    page: 1, 
    limit: 50, // Fetch up to 50 latest messages for now
    communityId: community.id,
    sort: "newest", 
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.posts]);

  // Reverse posts so newest is at the bottom
  const posts = data?.posts ? [...data.posts].reverse() : [];

  return (
    <div className="max-w-4xl mx-auto space-y-4 flex flex-col justify-end min-h-[calc(100vh-140px)] p-4 md:p-8">
      {/* Welcome message — Frosted Touch style */}
      <div 
        className="flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-[32px] mt-auto"
        style={{
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <div 
          className="h-20 w-20 rounded-[24px] flex items-center justify-center shrink-0 shadow-lg"
          style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", color: "white" }}
        >
          {community.icon_url ? (
             <img src={community.icon_url} alt={community.name} className="h-full w-full object-cover rounded-[24px]" />
          ) : (
             <Hash className="h-10 w-10 text-white" />
          )}
        </div>
        <div className="flex flex-col justify-center flex-1">
          <h1 className="font-black text-white text-3xl md:text-4xl tracking-tight mb-2">
            Selamat datang di <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #60a5fa)" }}>#{community.slug}</span>!
          </h1>
          <p className="text-base text-white/60 font-medium">
            Ini adalah awal dari channel <strong>#{community.slug}</strong> di komunitas{" "}
            <strong>{community.name}</strong>.
          </p>
          {community.description && (
            <p 
              className="text-sm text-white/80 mt-4 p-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              {community.description}
            </p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 py-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <span 
          className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-4 py-1.5 rounded-full"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          Permulaan Waktu
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent" />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-violet-400" />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center opacity-70">
          <div 
            className="h-20 w-20 rounded-3xl flex items-center justify-center mb-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <FileText className="h-10 w-10 text-white/30" />
          </div>
          <p className="font-bold text-xl text-white mb-2">
            Belum ada pesan
          </p>
          <p className="text-sm font-medium text-white/50 max-w-sm">
            Jadilah yang pertama memulai percakapan di{" "}
            <span className="text-white/80">{community.name}</span>!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 pb-8">
          {posts.map((post) => (
            <MessageItem key={post.id} post={post} />
          ))}
        </div>
      )}
      
      {/* Element to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
}
