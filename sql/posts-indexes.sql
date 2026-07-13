-- Posts Table Indexes
-- Forum Diskusi Online

-- Index for filtering posts by author
-- Used for: User profile posts, author-based queries
CREATE INDEX IF NOT EXISTS idx_posts_author_id
ON posts(author_id);

-- Index for filtering posts by category
-- Used for: Category pages, category-based filtering
CREATE INDEX IF NOT EXISTS idx_posts_category_id
ON posts(category_id);

-- Index for filtering posts by status
-- Used for: Published posts listing, draft management
CREATE INDEX IF NOT EXISTS idx_posts_status
ON posts(status);

-- Index for sorting posts by creation date
-- Used for: Latest posts, feed, chronological listing
CREATE INDEX IF NOT EXISTS idx_posts_created_at
ON posts(created_at DESC);

-- Composite index for category + date sorting
-- Used for: Category pages sorted by newest first
CREATE INDEX IF NOT EXISTS idx_posts_category_created
ON posts(category_id, created_at DESC);

-- Composite index for status + date sorting
-- Used for: Published posts listing sorted by newest
CREATE INDEX IF NOT EXISTS idx_posts_status_created
ON posts(status, created_at DESC);
