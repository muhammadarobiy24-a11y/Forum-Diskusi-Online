"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { joinCommunityService } from "../services/community.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useJoinCommunity(communityId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => joinCommunityService(communityId),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.communityMembership(communityId),
      });
      const previous = queryClient.getQueryData<boolean>(
        queryKeys.communityMembership(communityId)
      );
      queryClient.setQueryData<boolean>(
        queryKeys.communityMembership(communityId),
        true
      );
      return { previous };
    },
    onError: (error, _vars, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData<boolean>(
          queryKeys.communityMembership(communityId),
          context.previous
        );
      }
      toast.error(error.message || "Gagal bergabung ke community.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.communityMembership(communityId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.communities(),
      });
      // Invalidate semua query community individual agar member_count terupdate
      queryClient.invalidateQueries({
        queryKey: ["community"],
      });
    },
    onSuccess: () => {
      toast.success("Berhasil bergabung ke community.");
    },
  });
}
