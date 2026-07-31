-- =====================================================
-- ROW LEVEL SECURITY: Communities
-- =====================================================

-- Hapus policy lama (opsional, untuk mencegah error saat dijalankan ulang)
DROP POLICY IF EXISTS "Communities are viewable by everyone" ON public.communities;
DROP POLICY IF EXISTS "Authenticated users can create communities" ON public.communities;
DROP POLICY IF EXISTS "Owners can update their communities" ON public.communities;
DROP POLICY IF EXISTS "Owners can delete their communities" ON public.communities;

-- SELECT: Semua orang bisa melihat komunitas
CREATE POLICY "Communities are viewable by everyone"
ON public.communities FOR SELECT
USING (true);

-- INSERT: User yang login bisa membuat komunitas (mereka harus menjadi owner_id)
CREATE POLICY "Authenticated users can create communities"
ON public.communities FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

-- UPDATE: Hanya owner yang bisa mengubah data komunitas
CREATE POLICY "Owners can update their communities"
ON public.communities FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id);

-- DELETE: Hanya owner yang bisa menghapus komunitas
CREATE POLICY "Owners can delete their communities"
ON public.communities FOR DELETE
TO authenticated
USING (auth.uid() = owner_id);

-- =====================================================
-- ROW LEVEL SECURITY: Community Members
-- =====================================================

DROP POLICY IF EXISTS "Community members are viewable by everyone" ON public.community_members;
DROP POLICY IF EXISTS "Users can insert themselves" ON public.community_members;
DROP POLICY IF EXISTS "Users can update their own membership" ON public.community_members;
DROP POLICY IF EXISTS "Users can leave" ON public.community_members;

-- SELECT: Semua orang bisa melihat daftar member
CREATE POLICY "Community members are viewable by everyone"
ON public.community_members FOR SELECT
USING (true);

-- INSERT: User yang login bisa bergabung (hanya bisa insert dirinya sendiri)
CREATE POLICY "Users can insert themselves"
ON public.community_members FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- UPDATE: User bisa mengubah data membership-nya sendiri (opsional)
CREATE POLICY "Users can update their own membership"
ON public.community_members FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- DELETE: User bisa keluar (menghapus dirinya sendiri)
CREATE POLICY "Users can leave"
ON public.community_members FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
