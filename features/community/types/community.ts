export type CommunityVisibility =
  | "public"
  | "restricted"
  | "private";

export type CommunityRole =
  | "owner"
  | "moderator"
  | "member";

export interface Community {
  id: string;

  category_id: string;

  owner_id: string;

  name: string;

  slug: string;

  description: string | null;

  icon_url: string | null;

  banner_url: string | null;

  visibility: CommunityVisibility;

  member_count: number;

  post_count: number;

  is_verified: boolean;

  is_nsfw: boolean;

  created_at: string;

  updated_at: string;
}

export interface CommunityMember {
  id: string;

  community_id: string;

  user_id: string;

  role: CommunityRole;

  joined_at: string;
}

export interface CreateCommunityInput {
  category_id: string;

  name: string;

  slug: string;

  description?: string;

  icon_url?: string;

  banner_url?: string;

  visibility?: CommunityVisibility;
}

export interface UpdateCommunityInput {
  name?: string;

  description?: string;

  icon_url?: string;

  banner_url?: string;

  visibility?: CommunityVisibility;

  is_verified?: boolean;

  is_nsfw?: boolean;
}

export interface CommunityWithStats extends Community {
  owner_name?: string;

  category_name?: string;

  is_joined?: boolean;
}