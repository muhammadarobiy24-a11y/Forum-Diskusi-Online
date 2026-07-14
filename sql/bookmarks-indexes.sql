-- Bookmarks Table Indexes
-- Forum Diskusi Online

-- Index for fetching bookmarks by user
-- Used for: User's bookmarks list
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id
ON bookmarks(user_id);

-- Index for fetching bookmarks by post
-- Used for: Check if post is bookmarked, bookmark count
CREATE INDEX IF NOT EXISTS idx_bookmarks_post_id
ON bookmarks(post_id);

-- Composite index for user + date sorting
-- Used for: User's bookmarks sorted by newest first
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_created
ON bookmarks(user_id, created_at DESC);
