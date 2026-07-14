-- Notifications Table Indexes
-- Forum Diskusi Online

-- Index for fetching notifications by user
-- Used for: User's notifications list
CREATE INDEX IF NOT EXISTS idx_notifications_user
ON notifications(user_id);

-- Index for sorting by creation date
-- Used for: Latest notifications, chronological listing
CREATE INDEX IF NOT EXISTS idx_notifications_created
ON notifications(created_at DESC);

-- Index for filtering unread notifications
-- Used for: Unread notification count, badge
CREATE INDEX IF NOT EXISTS idx_notifications_is_read
ON notifications(is_read);

-- Composite index for user + read status
-- Used for: User's unread notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_read
ON notifications(user_id, is_read);

-- Composite index for user + date sorting
-- Used for: User's notifications sorted by newest first
CREATE INDEX IF NOT EXISTS idx_notifications_user_created
ON notifications(user_id, created_at DESC);
