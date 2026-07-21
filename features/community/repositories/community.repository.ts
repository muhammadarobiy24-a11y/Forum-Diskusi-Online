import { createClient } from "@/lib/supabase/client";
import type {
  Community,
  CommunityMember,
  CreateCommunityInput,
  UpdateCommunityInput,
} from "../types/community";

interface SupabaseCommunity {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_url: string | null;
  banner_url: string | null;
  visibility: "public" | "restricted" | "private";
  member_count: number;
  post_count: number;
  is_verified: boolean;
  is_nsfw: boolean;
  created_at: string;
  updated_at: string;

  owner: {
    id: string;
    username: string;
    avatar_url: string | null;
  };

  category: {
    id: string;
    name: string;
    slug: string;
  };
}

function mapCommunity(item: SupabaseCommunity): Community {
  return {
    id: item.id,

    category_id: item.category.id,

    owner_id: item.owner.id,

    name: item.name,

    slug: item.slug,

    description: item.description,

    icon_url: item.icon_url,

    banner_url: item.banner_url,

    visibility: item.visibility,

    member_count: item.member_count,

    post_count: item.post_count,

    is_verified: item.is_verified,

    is_nsfw: item.is_nsfw,

    created_at: item.created_at,

    updated_at: item.updated_at,
  };
}

export async function getCommunities(): Promise<Community[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("communities")
    .select(`
      *,
      owner:profiles(
        id,
        username,
        avatar_url
      ),
      category:categories(
        id,
        name,
        slug
      )
    `)
    .order("member_count", {
      ascending: false,
    });

  if (error) throw error;

  return (data as SupabaseCommunity[]).map(mapCommunity);
}

export async function getCommunityBySlug(
  slug: string
): Promise<Community | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("communities")
    .select(`
      *,
      owner:profiles(
        id,
        username,
        avatar_url
      ),
      category:categories(
        id,
        name,
        slug
      )
    `)
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }

  return mapCommunity(data as SupabaseCommunity);
}

export async function createCommunity(
  input: CreateCommunityInput
): Promise<Community> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anda harus login.");
  }

  const { data, error } = await supabase
    .from("communities")
    .insert({
      owner_id: user.id,
      category_id: input.category_id,
      name: input.name,
      slug: input.slug,
      description: input.description,
      icon_url: input.icon_url,
      banner_url: input.banner_url,
      visibility: input.visibility,
    })
    .select()
    .single();

  if (error) throw error;

  return data as Community;
}

export async function updateCommunity(
  id: string,
  input: UpdateCommunityInput
): Promise<Community> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anda harus login.");
  }

  const { data: community } = await supabase
    .from("communities")
    .select("owner_id")
    .eq("id", id)
    .single();

  if (!community) {
    throw new Error("Community tidak ditemukan.");
  }

  if (community.owner_id !== user.id) {
    throw new Error("Anda tidak memiliki akses.");
  }

  const { data, error } = await supabase
    .from("communities")
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Community;
}

export async function deleteCommunity(
  id: string
): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anda harus login.");
  }

  const { data: community } = await supabase
    .from("communities")
    .select("owner_id")
    .eq("id", id)
    .single();

  if (!community) {
    throw new Error("Community tidak ditemukan.");
  }

  if (community.owner_id !== user.id) {
    throw new Error("Anda tidak memiliki akses.");
  }

  const { error } = await supabase
    .from("communities")
    .delete()
    .eq("id", id);

  if (error) throw error;
}


export async function joinCommunity(
  communityId: string
): Promise<CommunityMember> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anda harus login.");
  }

  const { data, error } = await supabase
    .from("community_members")
    .insert({
      community_id: communityId,
      user_id: user.id,
      role: "member",
    })
    .select()
    .single();

  if (error) throw error;

  return data as CommunityMember;
}

export async function leaveCommunity(
  communityId: string
): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Anda harus login.");
  }

  const { error } = await supabase
    .from("community_members")
    .delete()
    .eq("community_id", communityId)
    .eq("user_id", user.id);

  if (error) throw error;
}

export async function getMembershipStatus(
  communityId: string
): Promise<boolean> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("community_members")
    .select("id")
    .eq("community_id", communityId)
    .eq("user_id", user.id)
    .single();

  return !!data;
}
