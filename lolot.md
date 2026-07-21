# Reddit Community Development Progress (Lanjutan)

## 21. Masalah Terakhir

Saat mulai mengimplementasikan fitur **Create Community**, terjadi error duplikasi function pada repository dan service.

### Repository

Error:

```text
Duplicate createCommunity()
```

Penyebab:

Function berikut ditambahkan lebih dari satu kali pada file:

```text
features/community/repositories/community.repository.ts
```

Function:

```ts
createCommunity()
```

---

### Service

Error:

```text
Duplicate createNewCommunity()
```

Penyebab:

Function berikut juga ditambahkan lebih dari satu kali pada file:

```text
features/community/services/community.service.ts
```

Function:

```ts
createNewCommunity()
```

---

### Solusi

Sebelum melanjutkan pengembangan fitur berikutnya:

- Cari seluruh function `createCommunity()` pada repository.
- Sisakan hanya satu implementasi.
- Cari seluruh function `createNewCommunity()` pada service.
- Sisakan hanya satu implementasi.
- Pastikan import tidak terduplikasi.

Setelah dibersihkan jalankan kembali:

```bash
npm run typecheck
```

Target:

```text
Typecheck PASS
```

---

# 22. Status Implementasi Saat Ini

## Backend

| Modul | Status |
|--------|--------|
| Community Table | ✅ Selesai |
| Community Members | ✅ Selesai |
| SQL & RLS | ✅ Selesai |
| Types | ✅ Selesai |
| Repository | ⚠ Perlu membersihkan duplicate function |
| Service | ⚠ Perlu membersihkan duplicate function |
| React Query Hooks | ✅ Selesai |

---

## Frontend

| Fitur | Status |
|--------|--------|
| Communities Page | ✅ Selesai |
| Community Card | ✅ Selesai |
| Community List | ✅ Selesai |
| Community Detail | 🚧 Placeholder |
| Create Community Page | 🚧 Placeholder |
| Community Form | 🚧 Placeholder |
| Join Community | ❌ Belum dibuat |
| Leave Community | ❌ Belum dibuat |
| Sidebar Community | ❌ Belum dibuat |
| Moderator Tools | ❌ Belum dibuat |
| Community Rules | ❌ Belum dibuat |

---

# 23. Prioritas Pengembangan Berikutnya

Setelah duplicate function dibersihkan, urutan implementasi yang akan dikerjakan adalah sebagai berikut.

## Tahap 1 — Menstabilkan Project

Pastikan seluruh project kembali hijau.

Checklist:

- [ ] Repository bebas duplicate function
- [ ] Service bebas duplicate function
- [ ] Import tidak ada yang terduplikasi
- [ ] npm run lint PASS
- [ ] npm run typecheck PASS
- [ ] npm run build PASS

---

## Tahap 2 — Create Community

Membuat form pembuatan Community yang lengkap.

Komponen yang akan dibuat:

- Community Name
- Slug (otomatis dari nama)
- Description
- Category (Dropdown)
- Visibility
  - Public
  - Restricted
  - Private
- Submit Button

Menggunakan:

- React Hook Form
- Zod
- TanStack React Query

Output:

Pengguna dapat membuat Community seperti membuat Subreddit di Reddit.

---

## Tahap 3 — Community Detail

Membuat halaman:

```text
/communities/[slug]
```

Halaman akan menampilkan:

- Banner Community
- Icon Community
- Nama Community
- Description
- Member Count
- Post Count
- Join Button
- Sidebar Community
- Daftar Post Community

---

## Tahap 4 — Join Community

Implementasi fitur:

- Join Community
- Leave Community

Database:

```text
community_members
```

Setelah berhasil join:

- Tombol berubah menjadi Leave Community
- Member Count bertambah
- Sidebar "My Communities" ikut diperbarui

---

## Tahap 5 — Integrasi Post

Mengubah struktur aplikasi sehingga setiap Post wajib berada di dalam Community.

Perubahan:

Sebelumnya:

```text
Category
    ↓
Post
```

Menjadi:

```text
Community
     ↓
Category
     ↓
Post
```

Setiap Post akan memiliki relasi langsung dengan Community.

---

## Tahap 6 — Sidebar Reddit

Membuat Sidebar seperti Reddit.

Isi Sidebar:

- Home
- Popular
- Communities
- My Communities
- Joined Communities
- Create Community

---

## Tahap 7 — Moderator

Fitur moderator Community.

Meliputi:

- Edit Community
- Hapus Community
- Kelola Member
- Kelola Moderator
- Approve Post
- Remove Post

---

## Tahap 8 — Community Rules

Menambahkan aturan Community.

Setiap Community dapat memiliki:

- Rule 1
- Rule 2
- Rule 3
- Dan seterusnya

Rules ditampilkan pada Sidebar Community.

---

## Tahap 9 — Reddit Experience

Tahap akhir untuk menghadirkan pengalaman penggunaan yang benar-benar menyerupai Reddit.

Fitur yang akan ditambahkan:

- Upvote & Downvote
- Trending Communities
- Popular Posts
- Hot Posts
- New Posts
- Top Posts
- Infinite Scroll
- Rich Community Header
- Sidebar Widget
- Online Member Indicator
- Cake Day
- Community Verification

---

# Kondisi Project Saat Ini

Secara keseluruhan, fondasi fitur Community telah berhasil dibangun.

Komponen yang sudah tersedia:

- Database Community
- Membership
- Types
- Hooks
- Community List
- Community Card
- Routing Community

Kendala utama saat ini hanya berupa duplikasi function pada Repository dan Service akibat implementasi yang sempat diulang setelah proses debugging.

Setelah masalah tersebut diselesaikan, pengembangan akan langsung berlanjut pada implementasi penuh fitur **Create Community**, kemudian **Community Detail**, **Join Community**, dan integrasi seluruh sistem Post ke dalam Community sehingga aplikasi benar-benar memiliki identitas dan alur penggunaan yang menyerupai Reddit.