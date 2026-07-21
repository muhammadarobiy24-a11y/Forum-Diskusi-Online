"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCommunity } from "../services/community.service";
import { queryKeys } from "@/lib/constants/query-keys";

export function useCreateCommunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.communities(),
      });
    },
  });
}
