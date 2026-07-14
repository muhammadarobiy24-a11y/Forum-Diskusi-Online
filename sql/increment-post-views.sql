-- Increment Post Views Function
-- Forum Diskusi Online
-- Fix: Race condition on view counter (BUG-02)

CREATE OR REPLACE FUNCTION increment_post_views(post_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE posts SET views = views + 1 WHERE id = post_id;
$$;
