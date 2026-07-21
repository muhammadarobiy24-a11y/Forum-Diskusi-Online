import {
  createCommunity,
  deleteCommunity,
  getCommunities,
  getCommunityBySlug,
  getMembershipStatus,
  joinCommunity,
  leaveCommunity,
  updateCommunity,
} from "../repositories/community.repository";

import type {
  Community,
  CommunityMember,
  CreateCommunityInput,
  UpdateCommunityInput,
} from "../types/community";

export async function getAllCommunities(): Promise<Community[]> {
  return await getCommunities();
}

export async function getCommunity(
  slug: string
): Promise<Community | null> {
  return await getCommunityBySlug(slug);
}

export async function createNewCommunity(
  input: CreateCommunityInput
): Promise<Community> {
  if (!input.name.trim()) {
    throw new Error("Nama community wajib diisi.");
  }

  if (!input.slug.trim()) {
    throw new Error("Slug wajib diisi.");
  }

  return await createCommunity({
    ...input,
    name: input.name.trim(),
    slug: input.slug.trim().toLowerCase(),
  });
}

export async function editCommunity(
  id: string,
  input: UpdateCommunityInput
): Promise<Community> {
  return await updateCommunity(id, input);
}

export async function removeCommunity(
  id: string
): Promise<void> {
  await deleteCommunity(id);
}

export async function joinCommunityService(
  communityId: string
): Promise<CommunityMember> {
  return await joinCommunity(communityId);
}

export async function leaveCommunityService(
  communityId: string
): Promise<void> {
  await leaveCommunity(communityId);
}

export async function getCommunityMembershipStatus(
  communityId: string
): Promise<boolean> {
  return await getMembershipStatus(communityId);
}
