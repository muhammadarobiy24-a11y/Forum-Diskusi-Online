-- Posts Row Level Security (RLS) Policies
-- Forum Diskusi Online
--
-- Database Relationship:
--   auth.users.id
--         ↓
--   profiles.id (= auth.users.id)
--         ↓
--   posts.author_id
--
-- This ensures auth.uid() can be used directly to match posts.author_id

-- =============================================================================
-- Enable RLS
-- =============================================================================

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- Policy: Public Read Published Posts
-- =============================================================================
-- Allows anyone (including anonymous users) to read posts
-- that have status = 'published'
--
-- Use case: Browse posts, view post detail

CREATE POLICY "Public can view published posts"
ON posts
FOR SELECT
USING (
  status = 'published'
);

-- =============================================================================
-- Policy: Authenticated Users Can Create Posts
-- =============================================================================
-- Allows authenticated users to insert posts
-- author_id must match the authenticated user's ID (auth.uid())
--
-- Use case: Create new post

CREATE POLICY "Authenticated users can create posts"
ON posts
FOR INSERT
TO authenticated
WITH CHECK (
  author_id = auth.uid()
);

-- =============================================================================
-- Policy: Authors Can Update Own Posts
-- =============================================================================
-- Allows authenticated users to update only their own posts
-- author_id must match the authenticated user's ID (auth.uid())
--
-- Use case: Edit own post

CREATE POLICY "Authors can update own posts"
ON posts
FOR UPDATE
TO authenticated
USING (
  author_id = auth.uid()
)
WITH CHECK (
  author_id = auth.uid()
);

-- =============================================================================
-- Policy: Authors Can Delete Own Posts
-- =============================================================================
-- Allows authenticated users to delete only their own posts
-- author_id must match the authenticated user's ID (auth.uid())
--
-- Use case: Delete own post

CREATE POLICY "Authors can delete own posts"
ON posts
FOR DELETE
TO authenticated
USING (
  author_id = auth.uid()
);
