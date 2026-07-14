-- Likes Row Level Security (RLS) Policies
-- Forum Diskusi Online
--
-- Database Relationship:
--   profiles.id (= auth.users.id)
--       ↓
--   likes.user_id
--
--   posts.id
--       ↓
--   likes.post_id

-- =============================================================================
-- Enable RLS
-- =============================================================================

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- Policy: Public Can View Likes
-- =============================================================================
-- Allows anyone (including anonymous users) to read all likes
--
-- Use case: View like count on posts, check if post is liked

CREATE POLICY "Public can view likes"
ON likes
FOR SELECT
USING (true);

-- =============================================================================
-- Policy: Users Can Create Own Likes
-- =============================================================================
-- Allows authenticated users to insert likes
-- user_id must match the authenticated user's ID (auth.uid())
--
-- Use case: Like a post

CREATE POLICY "Users can create own likes"
ON likes
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid()
);

-- =============================================================================
-- Policy: Users Can Delete Own Likes
-- =============================================================================
-- Allows authenticated users to delete only their own likes
-- user_id must match the authenticated user's ID (auth.uid())
--
-- Use case: Unlike a post

CREATE POLICY "Users can delete own likes"
ON likes
FOR DELETE
TO authenticated
USING (
  user_id = auth.uid()
);
