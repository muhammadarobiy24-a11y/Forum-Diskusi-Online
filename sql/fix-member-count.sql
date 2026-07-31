-- ============================================================
-- Function: increment_community_member_count
--
-- Digunakan oleh join/leave community untuk update member_count
-- di tabel communities secara atomic.
--
-- delta = 1  → join (tambah 1)
-- delta = -1 → leave (kurang 1, tidak boleh < 0)
-- ============================================================

CREATE OR REPLACE FUNCTION increment_community_member_count(
  community_id UUID,
  delta INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE communities
  SET member_count = GREATEST(0, member_count + delta)
  WHERE id = community_id;
END;
$$;

-- Berikan akses ke authenticated users
GRANT EXECUTE ON FUNCTION increment_community_member_count(UUID, INTEGER)
  TO authenticated;
