-- =====================================================
-- REDDIT ENHANCEMENT
-- Sprint R1.1
-- Create Communities
-- =====================================================

-- Enum
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'community_visibility'
    ) THEN
        CREATE TYPE community_visibility AS ENUM (
            'public',
            'restricted',
            'private'
        );
    END IF;
END$$;

-- =====================================================
-- Communities Table
-- =====================================================

CREATE TABLE IF NOT EXISTS public.communities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    category_id UUID NOT NULL
        REFERENCES public.categories(id)
        ON DELETE RESTRICT,

    owner_id UUID NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    name VARCHAR(100) NOT NULL,

    slug VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    icon_url TEXT,

    banner_url TEXT,

    visibility community_visibility
        NOT NULL
        DEFAULT 'public',

    member_count INTEGER
        NOT NULL
        DEFAULT 0
        CHECK (member_count >= 0),

    post_count INTEGER
        NOT NULL
        DEFAULT 0
        CHECK (post_count >= 0),

    is_verified BOOLEAN
        NOT NULL
        DEFAULT FALSE,

    is_nsfw BOOLEAN
        NOT NULL
        DEFAULT FALSE,

    created_at TIMESTAMPTZ
        NOT NULL
        DEFAULT now(),

    updated_at TIMESTAMPTZ
        NOT NULL
        DEFAULT now()
);

-- =====================================================
-- Comments
-- =====================================================

COMMENT ON TABLE public.communities IS
'Community seperti subreddit Reddit';

COMMENT ON COLUMN public.communities.slug IS
'Digunakan pada URL, contoh: /r/nextjs';

COMMENT ON COLUMN public.communities.visibility IS
'public | restricted | private';

-- =====================================================
-- Indexes
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_communities_category
ON public.communities(category_id);

CREATE INDEX IF NOT EXISTS idx_communities_owner
ON public.communities(owner_id);

CREATE INDEX IF NOT EXISTS idx_communities_slug
ON public.communities(slug);

CREATE INDEX IF NOT EXISTS idx_communities_member_count
ON public.communities(member_count DESC);

CREATE INDEX IF NOT EXISTS idx_communities_created_at
ON public.communities(created_at DESC);

-- =====================================================
-- Updated At Trigger
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_update_communities_updated_at
ON public.communities;

CREATE TRIGGER trg_update_communities_updated_at
BEFORE UPDATE
ON public.communities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- Enable RLS
-- =====================================================

ALTER TABLE public.communities
ENABLE ROW LEVEL SECURITY;