Berikut adalah **`database-schema.md` production-ready** yang saya rekomendasikan untuk project **Forum Diskusi Online** berbasis **Next.js + Supabase**. Desain ini sudah mempertimbangkan:

* Authentication dengan Supabase Auth
* Nested Comments (reply komentar)
* Like & Bookmark
* Notification Realtime
* Role Based Access Control (RBAC)
* Moderation System
* Scalability untuk pengembangan fitur ke depan

---

# Database Overview

```text id="a5zv4x"
auth.users (Supabase)
        │
        ▼
profiles
├── posts
├── comments
├── likes
├── bookmarks
├── notifications
└── reports

categories
└── posts

posts
├── comments
├── likes
├── bookmarks
└── reports

comments
└── reports
```

---

# Entity Relationship Diagram (ERD)

```text id="du1fg8"
profiles
   │
   ├────────── posts ────────── categories
   │               │
   │               ├──── comments
   │               ├──── likes
   │               ├──── bookmarks
   │               └──── reports
   │
   ├────────── comments
   ├────────── notifications
   └────────── reports
```

---

# Table: profiles

Menyimpan data tambahan dari `auth.users`.

| Column     | Type        | Constraint             |
| ---------- | ----------- | ---------------------- |
| id         | uuid        | PK, FK → auth.users.id |
| username   | text        | UNIQUE                 |
| full_name  | text        |                        |
| avatar_url | text        | nullable               |
| bio        | text        | nullable               |
| role       | app_role    | default 'member'       |
| created_at | timestamptz | default now()          |
| updated_at | timestamptz | default now()          |

---

# Table: categories

| Column      | Type        | Constraint    |
| ----------- | ----------- | ------------- |
| id          | uuid        | PK            |
| name        | text        | UNIQUE        |
| slug        | text        | UNIQUE        |
| description | text        | nullable      |
| icon        | text        | nullable      |
| created_at  | timestamptz | default now() |

---

# Table: posts

| Column      | Type        | Constraint          |
| ----------- | ----------- | ------------------- |
| id          | uuid        | PK                  |
| user_id     | uuid        | FK → profiles.id    |
| category_id | uuid        | FK → categories.id  |
| title       | text        | NOT NULL            |
| slug        | text        | UNIQUE              |
| content     | text        | NOT NULL            |
| status      | post_status | default 'published' |
| views       | integer     | default 0           |
| is_locked   | boolean     | default false       |
| created_at  | timestamptz | default now()       |
| updated_at  | timestamptz | default now()       |

---

# Table: comments

Mendukung nested comment.

| Column     | Type        | Constraint                 |
| ---------- | ----------- | -------------------------- |
| id         | uuid        | PK                         |
| post_id    | uuid        | FK → posts.id              |
| user_id    | uuid        | FK → profiles.id           |
| parent_id  | uuid        | nullable, FK → comments.id |
| content    | text        | NOT NULL                   |
| created_at | timestamptz | default now()              |
| updated_at | timestamptz | default now()              |

---

# Table: likes

| Column     | Type        | Constraint       |
| ---------- | ----------- | ---------------- |
| id         | uuid        | PK               |
| user_id    | uuid        | FK → profiles.id |
| post_id    | uuid        | FK → posts.id    |
| created_at | timestamptz | default now()    |

### Unique Constraint

```sql id="mhl4y3"
UNIQUE(user_id, post_id)
```

---

# Table: bookmarks

| Column     | Type        | Constraint       |
| ---------- | ----------- | ---------------- |
| id         | uuid        | PK               |
| user_id    | uuid        | FK → profiles.id |
| post_id    | uuid        | FK → posts.id    |
| created_at | timestamptz | default now()    |

### Unique Constraint

```sql id="h6h6nb"
UNIQUE(user_id, post_id)
```

---

# Table: notifications

| Column       | Type              | Constraint       |
| ------------ | ----------------- | ---------------- |
| id           | uuid              | PK               |
| user_id      | uuid              | FK → profiles.id |
| actor_id     | uuid              | FK → profiles.id |
| type         | notification_type |                  |
| reference_id | uuid              | nullable         |
| message      | text              |                  |
| is_read      | boolean           | default false    |
| created_at   | timestamptz       | default now()    |

---

# Table: reports

Digunakan untuk moderasi.

| Column      | Type          | Constraint                 |
| ----------- | ------------- | -------------------------- |
| id          | uuid          | PK                         |
| reporter_id | uuid          | FK → profiles.id           |
| post_id     | uuid          | nullable, FK → posts.id    |
| comment_id  | uuid          | nullable, FK → comments.id |
| reason      | text          |                            |
| status      | report_status | default 'pending'          |
| reviewed_by | uuid          | nullable, FK → profiles.id |
| created_at  | timestamptz   | default now()              |
| reviewed_at | timestamptz   | nullable                   |

---

# Enum Types

## app_role

```sql id="lyxyod"
CREATE TYPE app_role AS ENUM (
  'member',
  'moderator',
  'admin'
);
```

---

## post_status

```sql id="93wuk7"
CREATE TYPE post_status AS ENUM (
  'published',
  'draft',
  'archived'
);
```

---

## notification_type

```sql id="p3fztg"
CREATE TYPE notification_type AS ENUM (
  'like',
  'comment',
  'reply',
  'mention',
  'system'
);
```

---

## report_status

```sql id="g3v4j5"
CREATE TYPE report_status AS ENUM (
  'pending',
  'reviewed',
  'resolved'
);
```

---

# Recommended Indexes

```sql id="mmtv8c"
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_category_id ON posts(category_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

CREATE INDEX idx_reports_status ON reports(status);
```

---

# Recommended Triggers

## Create Profile After Signup

```text id="l4k1q7"
auth.users
↓
create_profile()
↓
profiles
```

---

## Update Timestamp

```text id="zv2xq8"
BEFORE UPDATE
↓
set updated_at = now()
```

---

## Create Notification

```text id="9n3x1u"
new comment
new reply
new like
↓
insert notification
```

---

# Supabase Storage Buckets

```text id="dzd0sn"
avatars
post-images
```

---

# Migration Order

```text id="j0rk4n"
1. Enum Types
2. profiles
3. categories
4. posts
5. comments
6. likes
7. bookmarks
8. notifications
9. reports
10. Indexes
11. Triggers
12. RLS Policies
```

---

# Future Tables (Optional)

Jika nanti ingin menambah fitur:

```text id="p2kclg"
tags
post_tags
follows
direct_messages
attachments
activity_logs
```

---

## Struktur Final Database

```text id="ljt5gx"
auth.users
profiles
categories
posts
comments
likes
bookmarks
notifications
reports
```
