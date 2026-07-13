-- Comments Table
-- Forum Diskusi Online

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  post_id uuid NOT NULL
    REFERENCES posts(id)
    ON DELETE CASCADE,

  author_id uuid NOT NULL
    REFERENCES profiles(id)
    ON DELETE CASCADE,

  parent_id uuid
    REFERENCES comments(id)
    ON DELETE CASCADE,

  content text NOT NULL,

  created_at timestamptz
    DEFAULT now(),

  updated_at timestamptz
    DEFAULT now()
);

-- Add comment count to posts table (optional)
-- ALTER TABLE posts ADD COLUMN IF NOT EXISTS comment_count integer DEFAULT 0;
