-- Comments Table Indexes
-- Forum Diskusi Online

-- Index for fetching comments by post
-- Used for: Post detail page, comment listing
CREATE INDEX IF NOT EXISTS idx_comments_post_id
ON comments(post_id);

-- Index for fetching comments by author
-- Used for: User's comment history
CREATE INDEX IF NOT EXISTS idx_comments_author_id
ON comments(author_id);

-- Index for fetching replies
-- Used for: Nested comments, reply listing
CREATE INDEX IF NOT EXISTS idx_comments_parent_id
ON comments(parent_id);

-- Index for sorting by creation date
-- Used for: Latest comments, chronological listing
CREATE INDEX IF NOT EXISTS idx_comments_created_at
ON comments(created_at DESC);

-- Composite index for post + date sorting
-- Used for: Post comments sorted by newest first
CREATE INDEX IF NOT EXISTS idx_comments_post_created
ON comments(post_id, created_at DESC);
