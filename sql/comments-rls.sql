-- Comments Row Level Security (RLS) Policies
-- Forum Diskusi Online
--
-- Database Relationship:
--   posts.id
--       ↓
--   comments.post_id
--
--   profiles.id (= auth.users.id)
--       ↓
--   comments.author_id
--
--   comments.id (self-referencing)
--       ↓
--   comments.parent_id

-- =============================================================================
-- Enable RLS
-- =============================================================================

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments FORCE ROW LEVEL SECURITY;

-- =============================================================================
-- Policy: Public Read Comments
-- =============================================================================
-- Allows anyone (including anonymous users) to read all comments
--
-- Use case: View comments on post detail page

CREATE POLICY "Public can view comments"
ON comments
FOR SELECT
USING (true);

-- =============================================================================
-- Policy: Authenticated Users Can Create Comments
-- =============================================================================
-- Allows authenticated users to insert comments
-- author_id must match the authenticated user's ID (auth.uid())
--
-- Use case: Create new comment or reply

CREATE POLICY "Users can create comments"
ON comments
FOR INSERT
TO authenticated
WITH CHECK (
  author_id = auth.uid()
);

-- =============================================================================
-- Policy: Users Can Update Own Comments
-- =============================================================================
-- Allows authenticated users to update only their own comments
-- author_id must match the authenticated user's ID (auth.uid())
--
-- Use case: Edit own comment

CREATE POLICY "Users can update own comments"
ON comments
FOR UPDATE
TO authenticated
USING (
  author_id = auth.uid()
)
WITH CHECK (
  author_id = auth.uid()
);

-- =============================================================================
-- Policy: Users Can Delete Own Comments
-- =============================================================================
-- Allows authenticated users to delete only their own comments
-- author_id must match the authenticated user's ID (auth.uid())
--
-- Use case: Delete own comment

CREATE POLICY "Users can delete own comments"
ON comments
FOR DELETE
TO authenticated
USING (
  author_id = auth.uid()
);
