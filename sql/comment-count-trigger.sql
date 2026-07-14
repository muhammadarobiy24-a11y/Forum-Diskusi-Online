-- Add comment_count Column + Trigger
-- Forum Diskusi Online
-- Fix: Sort most_commented not accurate on pagination (BUG-01)

-- Tambah kolom denormalized comment_count ke tabel posts
ALTER TABLE posts ADD COLUMN IF NOT EXISTS comment_count integer NOT NULL DEFAULT 0;

-- Sync nilai awal dari data yang sudah ada
UPDATE posts p
SET comment_count = (
  SELECT COUNT(*) FROM comments c
  WHERE c.post_id = p.id AND c.parent_id IS NULL
);

-- Trigger agar otomatis update saat comment ditambah/dihapus
CREATE OR REPLACE FUNCTION sync_post_comment_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.parent_id IS NULL THEN
    UPDATE posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' AND OLD.parent_id IS NULL THEN
    UPDATE posts SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER trg_sync_comment_count
AFTER INSERT OR DELETE ON comments
FOR EACH ROW EXECUTE FUNCTION sync_post_comment_count();
