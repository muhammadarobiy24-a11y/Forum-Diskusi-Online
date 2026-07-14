-- Notifications Table
-- Forum Diskusi Online

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id uuid NOT NULL
    REFERENCES profiles(id)
    ON DELETE CASCADE,

  actor_id uuid NOT NULL
    REFERENCES profiles(id)
    ON DELETE CASCADE,

  post_id uuid
    REFERENCES posts(id)
    ON DELETE CASCADE,

  comment_id uuid
    REFERENCES comments(id)
    ON DELETE CASCADE,

  type text NOT NULL
    CHECK (type IN ('like', 'comment', 'reply', 'bookmark')),

  message text NOT NULL,

  is_read boolean NOT NULL DEFAULT false,

  created_at timestamptz NOT NULL DEFAULT now()
);
