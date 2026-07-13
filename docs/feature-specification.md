# Forum Diskusi Online - Feature Specification

## Project Information

* Project Name: Forum Diskusi Online
* Architecture: Next.js + Supabase
* Version: MVP 1.0

---

# User Roles

## Guest

* Melihat daftar postingan.
* Melihat detail postingan.
* Melihat komentar.
* Mencari postingan.

## Member

Semua fitur Guest ditambah:

* Register dan Login.
* Membuat postingan.
* Mengedit postingan sendiri.
* Menghapus postingan sendiri.
* Memberikan komentar.
* Membalas komentar.
* Like postingan.
* Bookmark postingan.
* Mengelola profil.
* Melaporkan postingan atau komentar.

## Moderator

Semua fitur Member ditambah:

* Mengelola laporan.
* Menghapus postingan yang melanggar.
* Menghapus komentar yang melanggar.

## Admin

Semua fitur Moderator ditambah:

* Mengelola kategori.
* Mengelola pengguna.
* Mengubah role pengguna.
* Mengakses dashboard admin.

---

# Module 1 – Authentication

## Features

### Register

* Email
* Username
* Password
* Confirm Password

### Login

* Email
* Password

### Logout

### Email Verification

### Forgot Password

### Reset Password

---

# Module 2 – User Profile

## Features

### View Profile

Menampilkan:

* Avatar
* Username
* Full Name
* Bio
* Jumlah postingan
* Jumlah komentar

### Edit Profile

User dapat mengubah:

* Avatar
* Full Name
* Username
* Bio

---

# Module 3 – Categories

## Features

### Category List

Menampilkan:

* Nama kategori
* Deskripsi
* Jumlah postingan

### Category Detail

Menampilkan:

* Daftar postingan berdasarkan kategori.

### Category Management (Admin)

* Create Category
* Edit Category
* Delete Category

---

# Module 4 – Posts

## Features

### Create Post

Field:

* Title
* Category
* Content

### Edit Post

### Delete Post

### View Post Detail

Menampilkan:

* Judul
* Isi
* Author
* Kategori
* Jumlah View
* Jumlah Like
* Jumlah Komentar
* Tanggal dibuat

### Post Status

* Published
* Draft
* Archived

---

# Module 5 – Comments

## Features

### Create Comment

### Delete Comment

### Reply Comment

### Nested Comments

* Parent Comment
* Child Comment

---

# Module 6 – Search & Filter

## Features

### Search Post

Pencarian berdasarkan:

* Judul
* Isi
* Kategori
* Username

### Filter

* Category
* Latest
* Popular

---

# Module 7 – Likes

## Features

### Like Post

### Unlike Post

### Like Counter

---

# Module 8 – Bookmarks

## Features

### Bookmark Post

### Remove Bookmark

### Bookmark List

---

# Module 9 – Notifications

## Features

### Notification Center

Jenis notifikasi:

* Like
* Comment
* Reply
* Mention
* System

### Mark as Read

### Realtime Notification

---

# Module 10 – Reports

## Features

### Report Post

### Report Comment

### Report Reason

Contoh:

* Spam
* Harassment
* Inappropriate Content
* Other

---

# Module 11 – Moderation

## Features

### Review Reports

### Delete Post

### Delete Comment

### Resolve Report

---

# Module 12 – Admin Dashboard

## User Management

* View Users
* Search Users
* Change User Role
* Suspend User (future)

## Category Management

* Create Category
* Update Category
* Delete Category

## Reports Management

* Review Reports
* Resolve Reports

---

# Notification Triggers

## Create Notification When:

* Someone likes a post.
* Someone comments on a post.
* Someone replies to a comment.
* Someone mentions a user.

---

# Validation Rules

## Register

* Email required.
* Username required.
* Password minimum 8 characters.

## Post

* Title required.
* Title max 200 characters.
* Content required.

## Comment

* Content required.
* Content max 1000 characters.

## Category

* Name required.
* Slug unique.

---

# Permissions Matrix

| Feature           | Guest | Member | Moderator | Admin |
| ----------------- | ----- | ------ | --------- | ----- |
| View Posts        | ✅     | ✅      | ✅         | ✅     |
| Create Post       | ❌     | ✅      | ✅         | ✅     |
| Edit Own Post     | ❌     | ✅      | ✅         | ✅     |
| Delete Any Post   | ❌     | ❌      | ✅         | ✅     |
| Comment           | ❌     | ✅      | ✅         | ✅     |
| Bookmark          | ❌     | ✅      | ✅         | ✅     |
| Manage Categories | ❌     | ❌      | ❌         | ✅     |
| Manage Users      | ❌     | ❌      | ❌         | ✅     |

---

# MVP Scope (Version 1)

## Included

* Authentication
* Profile
* Categories
* Posts CRUD
* Comments & Replies
* Search & Filter
* Likes
* Bookmarks
* Notifications
* Reports
* Admin Dashboard

---

# Future Scope (Version 2)

* Tags
* Follow User
* Direct Message
* Post Images
* Trending Posts
* Pinned Posts
* User Reputation
* Badges
* Dark Mode
* Activity Logs
* Analytics Dashboard
* AI Content Moderation

---

# Non-Functional Requirements

## Performance

* Page load < 3 seconds.
* Search response < 1 second.

## Security

* Supabase Auth.
* RLS Policies.
* Input Validation.

## Compatibility

* Desktop.
* Tablet.
* Mobile.

## Accessibility

* Keyboard Navigation.
* Proper Labels.
* Responsive Design.
