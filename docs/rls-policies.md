# Forum Diskusi Online - Row Level Security (RLS) Policies

## Overview

Project menggunakan:

* Supabase Auth
* Row Level Security (RLS)
* Role Based Access Control (RBAC)

Role:

```text id="f3k2h9"
member
moderator
admin
```

---

# Authorization Matrix

| Action             | Guest | Member | Moderator | Admin |
| ------------------ | ----- | ------ | --------- | ----- |
| View Posts         | ✅     | ✅      | ✅         | ✅     |
| Create Post        | ❌     | ✅      | ✅         | ✅     |
| Edit Own Post      | ❌     | ✅      | ✅         | ✅     |
| Delete Own Post    | ❌     | ✅      | ✅         | ✅     |
| Delete Any Post    | ❌     | ❌      | ✅         | ✅     |
| Create Comment     | ❌     | ✅      | ✅         | ✅     |
| Delete Any Comment | ❌     | ❌      | ✅         | ✅     |
| Bookmark Post      | ❌     | ✅      | ✅         | ✅     |
| Like Post          | ❌     | ✅      | ✅         | ✅     |
| View Notifications | ❌     | Own    | Own       | Own   |
| Manage Categories  | ❌     | ❌      | ❌         | ✅     |
| Manage Users       | ❌     | ❌      | ❌         | ✅     |
| Manage Reports     | ❌     | ❌      | ✅         | ✅     |

---

# Helper Function

## Current User Role

```sql id="l7m4x2"
create or replace function get_user_role()
returns app_role
language sql
stable
as $$
  select role
  from profiles
  where id = auth.uid();
$$;
```

---

# Profiles Policies

## Enable RLS

```sql id="r2f6k8"
alter table profiles enable row level security;
```

---

## Read Profiles

Semua pengguna dapat melihat profil.

```sql id="n5p9v3"
create policy "profiles_select"
on profiles
for select
using (true);
```

---

## Insert Profile

Hanya user sendiri saat registrasi.

```sql id="w8q1d4"
create policy "profiles_insert"
on profiles
for insert
with check (auth.uid() = id);
```

---

## Update Own Profile

```sql id="c4t7m9"
create policy "profiles_update_own"
on profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);
```

---

## Admin Update Any Profile

```sql id="p6y2k5"
create policy "profiles_admin_update"
on profiles
for update
using (get_user_role() = 'admin');
```

---

# Categories Policies

## Enable RLS

```sql id="v1j5r8"
alter table categories enable row level security;
```

---

## Read Categories

```sql id="g7q3k1"
create policy "categories_select"
on categories
for select
using (true);
```

---

## Admin Manage Categories

```sql id="x2d9f6"
create policy "categories_admin_all"
on categories
for all
using (
  get_user_role() = 'admin'
);
```

---

# Posts Policies

## Enable RLS

```sql id="m4n7p2"
alter table posts enable row level security;
```

---

## Read Posts

```sql id="h5v8d1"
create policy "posts_select"
on posts
for select
using (
  status = 'published'
);
```

---

## Create Post

```sql id="t8f3q9"
create policy "posts_insert"
on posts
for insert
with check (
  auth.uid() = user_id
);
```

---

## Update Own Post

```sql id="y6k2m4"
create policy "posts_update_own"
on posts
for update
using (
  auth.uid() = user_id
);
```

---

## Delete Own Post

```sql id="u1q7x5"
create policy "posts_delete_own"
on posts
for delete
using (
  auth.uid() = user_id
);
```

---

## Moderator/Admin Delete Any Post

```sql id="b9p4f2"
create policy "posts_moderator_delete"
on posts
for delete
using (
  get_user_role() in ('moderator','admin')
);
```

---

# Comments Policies

## Enable RLS

```sql id="k3m8v7"
alter table comments enable row level security;
```

---

## Read Comments

```sql id="r5d1q8"
create policy "comments_select"
on comments
for select
using (true);
```

---

## Create Comment

```sql id="f7n2k6"
create policy "comments_insert"
on comments
for insert
with check (
  auth.uid() = user_id
);
```

---

## Delete Own Comment

```sql id="c9x5m1"
create policy "comments_delete_own"
on comments
for delete
using (
  auth.uid() = user_id
);
```

---

## Moderator/Admin Delete Any Comment

```sql id="z4q8f3"
create policy "comments_moderator_delete"
on comments
for delete
using (
  get_user_role() in ('moderator','admin')
);
```

---

# Likes Policies

## Enable RLS

```sql id="j6v2p9"
alter table likes enable row level security;
```

---

## Read Likes

```sql id="m8f4k2"
create policy "likes_select"
on likes
for select
using (true);
```

---

## Insert Like

```sql id="x1p7q6"
create policy "likes_insert"
on likes
for insert
with check (
  auth.uid() = user_id
);
```

---

## Remove Like

```sql id="d5m9v1"
create policy "likes_delete"
on likes
for delete
using (
  auth.uid() = user_id
);
```

---

# Bookmarks Policies

## Enable RLS

```sql id="q2k6f8"
alter table bookmarks enable row level security;
```

---

## View Own Bookmarks

```sql id="n4x1p7"
create policy "bookmarks_select"
on bookmarks
for select
using (
  auth.uid() = user_id
);
```

---

## Create Bookmark

```sql id="v7m3d2"
create policy "bookmarks_insert"
on bookmarks
for insert
with check (
  auth.uid() = user_id
);
```

---

## Delete Bookmark

```sql id="p5q8f1"
create policy "bookmarks_delete"
on bookmarks
for delete
using (
  auth.uid() = user_id
);
```

---

# Notifications Policies

## Enable RLS

```sql id="f2v7k9"
alter table notifications enable row level security;
```

---

## View Own Notifications

```sql id="y4m8p6"
create policy "notifications_select"
on notifications
for select
using (
  auth.uid() = user_id
);
```

---

## Update Own Notifications

```sql id="r9k2f5"
create policy "notifications_update"
on notifications
for update
using (
  auth.uid() = user_id
);
```

---

# Reports Policies

## Enable RLS

```sql id="m3v6q1"
alter table reports enable row level security;
```

---

## Create Report

```sql id="x7f2k8"
create policy "reports_insert"
on reports
for insert
with check (
  auth.uid() = reporter_id
);
```

---

## View Own Reports

```sql id="d4m9p2"
create policy "reports_select_own"
on reports
for select
using (
  auth.uid() = reporter_id
);
```

---

## Moderator/Admin Manage Reports

```sql id="p8q5v3"
create policy "reports_moderator_all"
on reports
for all
using (
  get_user_role() in ('moderator','admin')
);
```

---

# Activity Logs Policies (Jika digunakan)

```sql id="k1m7f4"
alter table activity_logs enable row level security;
```

```sql id="n6v2q9"
create policy "activity_logs_admin"
on activity_logs
for select
using (
  get_user_role() = 'admin'
);
```

---

# Storage Policies

## avatars bucket

* Public Read
* Owner Upload
* Owner Update
* Owner Delete

---

## post-images bucket

* Public Read
* Authenticated Upload
* Owner Delete

---

# Security Principles

```text id="g5k8m2"
1. Least Privilege Principle
2. Owner-Based Access
3. Role-Based Access
4. Database-Level Security
5. Defense in Depth
```

---

# RLS Deployment Order

```text id="q9f3v1"
1. Create enum
2. Create tables
3. Enable RLS
4. Create helper functions
5. Create policies
6. Test policies
```