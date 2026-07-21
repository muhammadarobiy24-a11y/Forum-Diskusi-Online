"use client";

import { useQuery } from "@tanstack/react-query";
import { getCommunityMembershipStatus } from "../services/community.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useCommunityMembership(communityId: string) {
  return useQuery({
    queryKey: queryKeys.communityMembership(communityId),
    queryFn: () => getCommunityMembershipStatus(communityId),
    enabled: !!communityId,
  });
}
