"use client";

import { useQuery } from "@tanstack/react-query";
import { getCommunity } from "../services/community.service";

export function useCommunity(slug: string) {
  return useQuery({
    queryKey: ["community", slug],
    queryFn: () => getCommunity(slug),
    enabled: !!slug,
  });
}
