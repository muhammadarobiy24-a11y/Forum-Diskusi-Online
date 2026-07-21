"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCommunities } from "../services/community.service";

export function useCommunities() {
  return useQuery({
    queryKey: ["communities"],
    queryFn: getAllCommunities,
  });
}