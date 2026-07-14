-- Notifications Row Level Security (RLS) Policies
-- Forum Diskusi Online
--
-- Database Relationship:
--   profiles.id (= auth.users.id)
--       ↓
--   notifications.user_id
--
--   profiles.id (= auth.users.id)
--       ↓
--   notifications.actor_id
--
--   posts.id
--       ↓
--   notifications.post_id
--
--   comments.id
--       ↓
--   notifications.comment_id

-- =============================================================================
-- Enable RLS
-- =============================================================================

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- Policy: Users Can View Own Notifications
-- =============================================================================
-- Allows authenticated users to read only their own notifications
-- user_id must match the authenticated user's ID (auth.uid())
--
-- Use case: View notifications list

CREATE POLICY "Users can view own notifications"
ON notifications
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
);

-- =============================================================================
-- Policy: Authenticated Users Can Create Notifications
-- =============================================================================
-- Allows authenticated users to insert notifications
-- user_id must match the authenticated user's ID (auth.uid())
--
-- Use case: System creates notification for user action

CREATE POLICY "Users can create notifications"
ON notifications
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid()
);

-- =============================================================================
-- Policy: Users Can Update Own Notifications
-- =============================================================================
-- Allows authenticated users to update only their own notifications
-- user_id must match the authenticated user's ID (auth.uid())
--
-- Use case: Mark notification as read

CREATE POLICY "Users can update own notifications"
ON notifications
FOR UPDATE
TO authenticated
USING (
  user_id = auth.uid()
)
WITH CHECK (
  user_id = auth.uid()
);

-- =============================================================================
-- Policy: Users Can Delete Own Notifications
-- =============================================================================
-- Allows authenticated users to delete only their own notifications
-- user_id must match the authenticated user's ID (auth.uid())
--
-- Use case: Delete notification

CREATE POLICY "Users can delete own notifications"
ON notifications
FOR DELETE
TO authenticated
USING (
  user_id = auth.uid()
);
