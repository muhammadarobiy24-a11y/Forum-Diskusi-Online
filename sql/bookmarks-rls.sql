-- Bookmarks Row Level Security (RLS) Policies
-- Forum Diskusi Online
--
-- Database Relationship:
--   profiles.id (= auth.users.id)
--       ↓
--   bookmarks.user_id
--
--   posts.id
--       ↓
--   bookmarks.post_id

-- =============================================================================
-- Enable RLS
-- =============================================================================

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- Policy: Users Can View Own Bookmarks
-- =============================================================================
-- Allows authenticated users to read only their own bookmarks
-- user_id must match the authenticated user's ID (auth.uid())
--
-- Use case: View own bookmarks list

CREATE POLICY "Users can view own bookmarks"
ON bookmarks
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
);

-- =============================================================================
-- Policy: Users Can Create Own Bookmarks
-- =============================================================================
-- Allows authenticated users to insert bookmarks
-- user_id must match the authenticated user's ID (auth.uid())
--
-- Use case: Bookmark a post

CREATE POLICY "Users can create own bookmarks"
ON bookmarks
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid()
);

-- =============================================================================
-- Policy: Users Can Delete Own Bookmarks
-- =============================================================================
-- Allows authenticated users to delete only their own bookmarks
-- user_id must match the authenticated user's ID (auth.uid())
--
-- Use case: Remove bookmark

CREATE POLICY "Users can delete own bookmarks"
ON bookmarks
FOR DELETE
TO authenticated
USING (
  user_id = auth.uid()
);
