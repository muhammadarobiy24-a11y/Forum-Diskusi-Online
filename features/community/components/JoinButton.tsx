"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <Button variant="outline" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  if (isJoined) {
    return (
      <Button
        variant="outline"
        disabled={isPending}
        onClick={() => leave()}
      >
        {isLeaving ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        Joined
      </Button>
    );
  }

  return (
    <Button disabled={isPending} onClick={() => join()}>
      {isJoining ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      Join
    </Button>
  );
}
