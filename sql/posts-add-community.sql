-- Tambahkan kolom community_id ke tabel posts (bisa null untuk backward compatibility)
ALTER TABLE public.posts
ADD COLUMN community_id UUID REFERENCES public.communities(id) ON DELETE CASCADE;

-- Buat index untuk mempercepat query post berdasarkan komunitas
CREATE INDEX IF NOT EXISTS idx_posts_community_id ON public.posts(community_id);
