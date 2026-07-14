-- Likes Table
-- Forum Diskusi Online

CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id uuid NOT NULL
    REFERENCES profiles(id)
    ON DELETE CASCADE,

  post_id uuid NOT NULL
    REFERENCES posts(id)
    ON DELETE CASCADE,

  created_at timestamptz NOT NULL
    DEFAULT now(),

  UNIQUE(user_id, post_id)
);
