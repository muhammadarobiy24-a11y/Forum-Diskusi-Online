-- =====================================================
-- REDDIT ENHANCEMENT
-- Sprint R1.2
-- Community Members
-- =====================================================

-- Enum
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'community_member_role'
    ) THEN
        CREATE TYPE community_member_role AS ENUM (
            'owner',
            'moderator',
            'member'
        );
    END IF;
END$$;

-- =====================================================
-- Community Members Table
-- =====================================================

CREATE TABLE IF NOT EXISTS public.community_members (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    community_id UUID NOT NULL
        REFERENCES public.communities(id)
        ON DELETE CASCADE,

    user_id UUID NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    role community_member_role
        NOT NULL
        DEFAULT 'member',

    joined_at TIMESTAMPTZ
        NOT NULL
        DEFAULT now(),

    UNIQUE(community_id, user_id)
);

-- =====================================================
-- Comments
-- =====================================================

COMMENT ON TABLE public.community_members IS
'Daftar anggota community';

COMMENT ON COLUMN public.community_members.role IS
'owner | moderator | member';

-- =====================================================
-- Indexes
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_community_members_community
ON public.community_members(community_id);

CREATE INDEX IF NOT EXISTS idx_community_members_user
ON public.community_members(user_id);

CREATE INDEX IF NOT EXISTS idx_community_members_role
ON public.community_members(role);

-- =====================================================
-- Enable RLS
-- =====================================================

ALTER TABLE public.community_members
ENABLE ROW LEVEL SECURITY;