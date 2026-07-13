# Sprint Timeline

| Sprint    | Fokus                         | Estimasi |
| --------- | ----------------------------- | -------- |
| Sprint 0  | Project Setup & Foundation    | 2-3 hari |
| Sprint 1  | Authentication                | 2-3 hari |
| Sprint 2  | User Profile & Layout         | 2 hari   |
| Sprint 3  | Categories                    | 1-2 hari |
| Sprint 4  | Posts CRUD                    | 3 hari   |
| Sprint 5  | Comments & Replies            | 2-3 hari |
| Sprint 6  | Search & Filtering            | 2 hari   |
| Sprint 7  | Likes & Bookmarks             | 2 hari   |
| Sprint 8  | Notifications                 | 2 hari   |
| Sprint 9  | Moderation & Admin            | 3 hari   |
| Sprint 10 | Testing, Deployment & Go-Live | 2-3 hari |

---

# Sprint 0 – Project Foundation

## Goal

Mempersiapkan environment dan arsitektur project.

## User Story

Sebagai developer, saya ingin memiliki project yang siap dikembangkan.

## Task Breakdown

### Project Setup

* Create Next.js project
* Setup TypeScript
* Setup Tailwind
* Setup ESLint
* Setup Prettier
* Setup Husky
* Setup lint-staged

### Supabase Setup

* Create project
* Configure environment variables
* Configure authentication
* Configure storage bucket

### Folder Setup

* Implement folder structure
* Setup aliases
* Setup providers

### Dependency Installation

```text id="n7a2v4"
@supabase/ssr
@supabase/supabase-js
react-hook-form
zod
@hookform/resolvers
@tanstack/react-query
sonner
lucide-react
class-variance-authority
clsx
tailwind-merge
```

### Validation

```bash id="v8d5k1"
npm run lint
npm run typecheck
npm run build
```

---

# Sprint 1 – Authentication

## Goal

Implementasi login dan register.

## User Story

Sebagai pengguna, saya dapat membuat akun dan login.

## Features

* Register
* Login
* Logout
* Email Verification
* Protected Route
* Middleware Authentication

## Acceptance Criteria

✅ User dapat register.

✅ User dapat login.

✅ User dapat logout.

✅ Session tersimpan.

---

# Sprint 2 – User Profile & Layout

## Goal

Membangun UI dasar aplikasi.

## Features

* Sidebar
* Header
* Responsive Layout
* Profile Page
* Edit Profile
* Avatar Upload

## Acceptance Criteria

✅ Layout responsive.

✅ User dapat mengubah profil.

---

# Sprint 3 – Categories

## Goal

Membuat sistem kategori.

## Features

* List Categories
* Filter By Category
* Admin CRUD Category

## Acceptance Criteria

✅ User dapat melihat kategori.

✅ Admin dapat mengelola kategori.

---

# Sprint 4 – Posts CRUD

## Goal

Membuat sistem postingan.

## Features

* Create Post
* Edit Post
* Delete Post
* View Post Detail
* View Counter

## Acceptance Criteria

✅ User dapat CRUD post.

✅ Hanya owner yang dapat mengedit.

---

# Sprint 5 – Comments & Replies

## Goal

Membuat sistem diskusi.

## Features

* Create Comment
* Delete Comment
* Reply Comment
* Nested Comment

## Acceptance Criteria

✅ User dapat berkomentar.

✅ User dapat membalas komentar.

---

# Sprint 6 – Search & Filtering

## Goal

Membuat pencarian forum.

## Features

* Search Post
* Debounce Search
* Filter Category
* Sort Latest
* Sort Popular

## Acceptance Criteria

✅ Search bekerja.

✅ Filter bekerja.

---

# Sprint 7 – Likes & Bookmarks

## Goal

Meningkatkan engagement.

## Features

* Like Post
* Unlike Post
* Bookmark Post
* Bookmark List

## Acceptance Criteria

✅ Like tersimpan.

✅ Bookmark tersimpan.

---

# Sprint 8 – Notifications

## Goal

Membangun sistem notifikasi.

## Features

* Notification Center
* Mark as Read
* Realtime Notification

## Acceptance Criteria

✅ User menerima notifikasi.

✅ Realtime berjalan.

---

# Sprint 9 – Moderation & Admin

## Goal

Membangun fitur admin.

## Features

### Reports

* Report Post
* Report Comment
* Review Report

### Admin Dashboard

* Manage Users
* Manage Categories
* Moderate Posts
* Moderate Comments

### RBAC

* Member
* Moderator
* Admin

## Acceptance Criteria

✅ Moderator dapat menangani laporan.

✅ Admin dapat mengelola sistem.

---

# Sprint 10 – Testing & Go-Live

## Goal

Menyiapkan aplikasi untuk production.

## Features

### Testing

* Unit Testing
* Integration Testing
* Manual Testing
* Security Testing
* RLS Testing

### Performance

* Image Optimization
* Caching
* Code Splitting

### Deployment

* Deploy Vercel
* Production Environment
* Domain Setup

### Documentation

* Update README
* Update Progress Log

## Acceptance Criteria

✅ Build berhasil.

✅ Tidak ada Type Error.

✅ Tidak ada ESLint Error.

✅ Deployment berhasil.

---

# Definition of Done (DoD)

Setiap sprint dianggap selesai jika:

```text id="m3k8v2"
✓ Feature selesai
✓ UI responsive
✓ TypeScript pass
✓ ESLint pass
✓ Build pass
✓ Manual testing pass
✓ RLS testing pass
✓ Dokumentasi diperbarui
✓ Commit ke Git
```

---

# Development Workflow Bersama MiMo

```text id="w6p1f4"
ChatGPT
↓
Membuat task sprint
↓
MiMo
↓
Implementasi
↓
Validation
↓
Code Review
↓
Merge
↓
Sprint berikutnya
```

---

# Urutan Pengerjaan yang Saya Rekomendasikan

```text id="q4n7k1"
Sprint 0
↓
Sprint 1
↓
Sprint 2
↓
Sprint 3
↓
Sprint 4
↓
Sprint 5
↓
Sprint 6
↓
Sprint 7
↓
Sprint 8
↓
Sprint 9
↓
Sprint 10
↓
Go-Live
```