# Status Progres Forum Online

## 🟢 Yang Sudah Selesai

### Struktur & Database
- Struktur database community ✅
- Join/Leave dengan optimistic update ✅
- Struktur database post ✅

### Tampilan & Layout
- Dark theme konsisten ✅
- Font Inter sudah diterapkan ✅
- ServerRail dengan community icons ✅
- Channel sidebar per community ✅
- Auth pages sudah Discord-style (login, register, forgot-password) ✅
- Sidebar tunggal 260px dengan ikon + teks menu terintegrasi ✅ *(gabung dari 2 navigasi)*
- Font sidebar diperbesar (menu 15-16px, section heading 12-13px semibold) ✅
- Halaman Categories sudah diperbarui ✅
- Top Bar / Header dirapikan: pencarian global di tengah, notif & profil di kanan ✅
- Max-width pada feed postingan (700-800px, center-aligned) ✅

### Fitur
- Edit Profil fungsional (nama, bio, avatar) ✅
- Ubah Tema (toggle dark/light) fungsional ✅
- Upload Foto & Video di postingan ✅
  - Tombol sisipkan media di PostForm
  - Upload ke Supabase Storage (bucket `post-images`)
  - Render gambar & video di PostDetail (style glassmorphism)
  - Strip markdown di PostCard agar feed tetap bersih

---

## 🔴 Fungsionalitas Kritis (Belum Ada)

1. **Real-time Chat / Messaging**
   Discord tanpa chat bukan Discord. Sekarang halaman community hanya menampilkan "Belum ada post" — tidak ada input untuk kirim pesan sama sekali.

2. **Post Detail Page yang fungsional**
   Halaman `/post/[id]` perlu dicek — apakah komentar, like, dan reply sudah benar-benar berjalan di tampilan Discord-style yang baru?

3. **Create Post dari dalam Community**
   User masuk ke community #general tapi tidak bisa post apapun. Tidak ada message input bar di bawah layar (seperti Discord).

4. **Post ↔ Community belum terhubung**
   Setiap post belum punya relasi ke community. Post di `/post` masih terpisah dari community. Ini yang paling besar secara arsitektur.

---

## 🟡 UX yang Masih Lemah

5. **Tidak ada Loading / Skeleton states yang konsisten**
   Beberapa halaman punya skeleton, beberapa tidak. Saat data loading, layout bisa tampak kosong atau berantakan.

6. **Empty states yang membosankan**
   CommunityDetailClient hanya tampilkan "Belum ada post" tanpa call-to-action yang jelas.

7. **Join Button tidak ada feedback visual**
   Setelah join, tidak ada konfirmasi yang dramatis — misalnya animasi, atau sidebar langsung update.

8. **Search belum fungsional**
   Search bar global di Top Bar sudah dipindahkan ke tengah, tapi belum terhubung ke fungsionalitas apapun.

9. **Server Rail tidak update real-time**
   Kalau user buat community baru, server rail tidak langsung muncul community baru tanpa reload.

---

## 🟠 Struktur yang Belum Selesai

10. **Tidak ada Sidebar "My Communities"**
    User yang sudah join beberapa community tidak punya tampilan khusus untuk daftar community yang diikuti.

11. **Mobile experience belum optimal**
    MobileDiscordNav ada, tapi layout Discord 4-panel tidak bisa digunakan di mobile secara wajar. Butuh pendekatan berbeda untuk layar kecil.

12. **Admin panel belum Discord-style**
    Halaman `/admin` masih tampilan lama.

---

## 📋 Prioritas Selanjutnya

1. Message input bar di bawah (Discord feel paling penting)
2. Post ↔ Community integration
3. My Communities di sidebar
4. Search fungsional
5. Admin panel ikut Discord theme