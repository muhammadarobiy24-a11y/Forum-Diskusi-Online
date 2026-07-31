"use client";

import { Loader2 } from "lucide-react";
import { useJoinCommunity } from "../hooks/useJoinCommunity";
import { useLeaveCommunity } from "../hooks/useLeaveCommunity";
import { useCommunityMembership } from "../hooks/useCommunityMembership";

interface JoinButtonProps {
  communityId: string;
}

export default function JoinButton({ communityId }: JoinButtonProps) {
  const { data: isJoined, isLoading: membershipLoading } =
    useCommunityMembership(communityId);

  const { mutate: join, isPending: isJoining } =
    useJoinCommunity(communityId);

  const { mutate: leave, isPending: isLeaving } =
    useLeaveCommunity(communityId);

  const isPending = isJoining || isLeaving;

  if (membershipLoading) {
    return (
      <button 
        disabled 
        className="flex items-center justify-center h-10 w-24 rounded-xl border border-white/10 bg-white/5 transition-all"
      >
        <Loader2 className="h-4 w-4 animate-spin text-white/50" />
      </button>
    );
  }

  if (isJoined) {
    return (
      <button
        disabled={isPending}
        onClick={() => leave()}
        className="flex items-center justify-center gap-2 h-10 px-6 rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 bg-white/10 hover:bg-white/20 text-white shadow-lg backdrop-blur-md"
      >
        {isLeaving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : null}
        Joined
      </button>
    );
  }

  return (
    <button 
      disabled={isPending} 
      onClick={() => join()}
      className="flex items-center justify-center gap-2 h-10 px-6 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(124,58,237,0.3)] backdrop-blur-md"
      style={{
        background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      {isJoining ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : null}
      Join
    </button>
  );
}
