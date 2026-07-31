"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { leaveCommunityService } from "../services/community.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useLeaveCommunity(communityId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => leaveCommunityService(communityId),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.communityMembership(communityId),
      });
      const previous = queryClient.getQueryData<boolean>(
        queryKeys.communityMembership(communityId)
      );
      queryClient.setQueryData<boolean>(
        queryKeys.communityMembership(communityId),
        false
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
      toast.error(error.message || "Gagal keluar dari community.");
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
      toast.success("Berhasil keluar dari community.");
    },
  });
}
