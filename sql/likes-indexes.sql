-- Likes Table Indexes
-- Forum Diskusi Online

-- Index for fetching likes by user
-- Used for: Check if user liked a post
CREATE INDEX IF NOT EXISTS idx_likes_user_id
ON likes(user_id);

-- Index for fetching likes by post
-- Used for: Like count, check if post is liked
CREATE INDEX IF NOT EXISTS idx_likes_post_id
ON likes(post_id);

-- Composite index for post + date sorting
-- Used for: Post's likes sorted by newest first
CREATE INDEX IF NOT EXISTS idx_likes_post_created
ON likes(post_id, created_at DESC);
