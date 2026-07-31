-- ============================================================
-- FIX: Notifications RLS INSERT Policy
--
-- Masalah sebelumnya:
--   Policy INSERT mengharuskan user_id = auth.uid()
--   Ini memblokir notifikasi cross-user (A like post B → notif ke B)
--   karena yang melakukan INSERT adalah A, tapi user_id di row adalah B
--
-- Solusi:
--   Izinkan INSERT selama actor_id = auth.uid() (si pelaku aksi)
--   user_id (penerima) boleh siapa saja
-- ============================================================

-- Hapus policy lama yang salah
DROP POLICY IF EXISTS "Users can create notifications" ON notifications;

-- Buat policy baru yang benar
-- actor_id harus = user yang sedang login (mencegah spam notifikasi)
CREATE POLICY "Authenticated users can create notifications"
ON notifications
FOR INSERT
TO authenticated
WITH CHECK (
  actor_id = auth.uid()
);
