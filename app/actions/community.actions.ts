"use server";

import { redirect } from "next/navigation";
import {
  createNewCommunity,
} from "@/features/community/services/community.service";

import type {
  CreateCommunityInput,
} from "@/features/community/types/community";

export async function createCommunityAction(
  input: CreateCommunityInput
) {
  const community =
    await createNewCommunity(input);

  redirect(`/communities/${community.slug}`);
}