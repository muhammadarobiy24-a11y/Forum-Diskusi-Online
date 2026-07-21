# Reddit-like Community Discussion Platform - Database Schema

## Project Information

* Project Name: Reddit-like Community Discussion Platform
* Architecture: Next.js + Supabase
* Version: MVP 2.0

---

# Database Overview

```text
auth.users (Supabase)
        │
        ▼
profiles
├── community_members
├── posts
├── comments
├── votes
├── saved_posts
├── notifications
├── reports
└── post_flairs

communities
├── community_members
├── community_rules
├── community_flairs
└── posts

posts
├── comments
├── votes
├── saved_posts
├── post_flairs
└── reports

comments
├── votes
└── reports
```

---

# Entity Relationship Diagram (ERD)

```text
profiles
   │
   ├──────── community_members ──────── communities
   │                                    ├── community_rules
   │                                    ├── community_flairs
   │                                    └── posts
   │
   ├──────── posts
   │          ├── comments
   │          ├── votes
   │          ├── saved_posts
   │          ├── post_flairs
   │          └── reports
   │
   ├──────── comments
   │          └── votes
   │
   ├──────── notifications
   └──────── reports
```

---

# Table: profiles

Menyimpan data tambahan dari `auth.users`. Diperkaya dengan karma dan cake day.

| Column      | Type        | Constraint               |
| ----------- | ----------- | ------------------------ |
| id          | uuid        | PK, FK → auth.users.id   |
| username    | text        | UNIQUE                   |
| full_name   | text        |                          |
| avatar_url  | text        | nullable                 |
| bio         | text        | nullable                 |
| role        | app_role    | default 'member'         |
| karma       | integer     | default 0                |
| cake_day    | date        | default current_date     |
| created_at  | timestamptz | default now()            |
| updated_at  | timestamptz | default now()            |

### Catatan

* `karma` dihitung dari total net votes (upvote - downvote) di semua post dan komentar milik user.
* `cake_day` adalah tanggal user pertama kali mendaftar (mirip Reddit "cake day").

---

# Table: communities

Menggantikan `categories`. Setiap komunitas memiliki rules, moderators, dan members sendiri.

| Column      | Type        | Constraint            |
| ----------- | ----------- | --------------------- |
| id          | uuid        | PK                    |
| name        | text        | UNIQUE                |
| slug        | text        | UNIQUE                |
| description | text        | nullable              |
| icon        | text        | nullable              |
| banner_url  | text        | nullable              |
| creator_id  | uuid        | FK → profiles.id      |
| is_private  | boolean     | default false         |
| member_count| integer     | default 0             |
| post_count  | integer     | default 0             |
| created_at  | timestamptz | default now()         |
| updated_at  | timestamptz | default now()         |

---

# Table: community_members

Menyimpan keanggotaan user di komunitas. Mendukung peran moderator per komunitas.

| Column      | Type        | Constraint                 |
| ----------- | ----------- | -------------------------- |
| id          | uuid        | PK                         |
| community_id| uuid        | FK → communities.id        |
| user_id     | uuid        | FK → profiles.id           |
| role        | community_role | default 'member'         |
| joined_at   | timestamptz | default now()              |

### Unique Constraint

```sql
UNIQUE(community_id, user_id)
```

### Catatan

* `role` bisa berisi: `member`, `moderator`.
* Creator komunitas otomatis menjadi moderator.
* Untuk komunitas private, membership harus di-approve.

---

# Table: community_rules

Aturan yang berlaku di setiap komunitas.

| Column      | Type        | Constraint                 |
| ----------- | ----------- | -------------------------- |
| id          | uuid        | PK                         |
| community_id| uuid        | FK → communities.id        |
| title       | text        | NOT NULL                   |
| description | text        | nullable                   |
| sort_order  | integer     | default 0                  |
| created_at  | timestamptz | default now()              |

---

# Table: community_flairs

Flair yang tersedia di komunitas. User dapat memilih flair saat membuat post.

| Column      | Type        | Constraint                 |
| ----------- | ----------- | -------------------------- |
| id          | uuid        | PK                         |
| community_id| uuid        | FK → communities.id        |
| name        | text        | NOT NULL                   |
| color       | text        | default '#6366f1'         |
| created_at  | timestamptz | default now()              |

### Unique Constraint

```sql
UNIQUE(community_id, name)
```

---

# Table: posts

Diperkaya dengan `community_id`, `flair_id`, `vote_score`, dan `hot_score`.

| Column       | Type        | Constraint              |
| ------------ | ----------- | ----------------------- |
| id           | uuid        | PK                      |
| author_id    | uuid        | FK → profiles.id        |
| community_id | uuid        | FK → communities.id     |
| flair_id     | uuid        | nullable, FK → community_flairs.id |
| title        | text        | NOT NULL                |
| slug         | text        | UNIQUE                  |
| content      | text        | NOT NULL                |
| content_type | content_type | default 'text'          |
| status       | post_status | default 'published'     |
| views        | integer     | default 0               |
| comment_count| integer     | default 0               |
| vote_score   | integer     | default 0               |
| hot_score    | numeric     | default 0               |
| is_pinned    | boolean     | default false           |
| is_locked    | boolean     | default false           |
| created_at   | timestamptz | default now()           |
| updated_at   | timestamptz | default now()           |

### Catatan

* `vote_score` = total upvote - total downvote. Dihitung via trigger.
* `hot_score` = kombinasi vote_score + time decay (mirip Reddit hot ranking). Dihitung via trigger.
* `content_type`: `text` | `link` | `image`. Mendukung post tipe link dan gambar.
* `is_pinned` untuk post yang di-pin oleh moderator komunitas.

---

# Table: comments

Sama dengan sebelumnya, namun ditambahkan `vote_score`.

| Column      | Type        | Constraint                 |
| ----------- | ----------- | -------------------------- |
| id          | uuid        | PK                         |
| post_id     | uuid        | FK → posts.id              |
| user_id     | uuid        | FK → profiles.id           |
| parent_id   | uuid        | nullable, FK → comments.id |
| content     | text        | NOT NULL                   |
| vote_score  | integer     | default 0                  |
| created_at  | timestamptz | default now()              |
| updated_at  | timestamptz | default now()              |

---

# Table: votes

Menggantikan `likes`. Mendukung upvote dan downvote.

| Column      | Type        | Constraint                 |
| ----------- | ----------- | -------------------------- |
| id          | uuid        | PK                         |
| user_id     | uuid        | FK → profiles.id           |
| post_id     | uuid        | nullable, FK → posts.id    |
| comment_id  | uuid        | nullable, FK → comments.id |
| vote_type   | vote_type   | NOT NULL                   |
| created_at  | timestamptz | default now()              |

### Unique Constraints

```sql
UNIQUE(user_id, post_id)    -- hanya jika post_id NOT NULL
UNIQUE(user_id, comment_id) -- hanya jika comment_id NOT NULL
```

### Catatan

* User bisa upvote atau downvote, tapi hanya satu per post/comment.
* Mengubah vote akan update `vote_score` di post/comment dan karma user.
* Trigger akan menghitung ulang `vote_score` dan `hot_score`.

---

# Table: saved_posts

Menggantikan `bookmarks`. Lebih fleksibel dengan folder.

| Column      | Type        | Constraint       |
| ----------- | ----------- | ---------------- |
| id          | uuid        | PK               |
| user_id     | uuid        | FK → profiles.id |
| post_id     | uuid        | FK → posts.id    |
| folder      | text        | default 'default'|
| created_at  | timestamptz | default now()    |

### Unique Constraint

```sql
UNIQUE(user_id, post_id)
```

---

# Table: notifications

Diperkaya dengan tipe notifikasi baru.

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

Diperkaya dengan kategori dan reason yang lebih terstruktur.

| Column        | Type          | Constraint                 |
| ------------- | ------------- | -------------------------- |
| id            | uuid          | PK                         |
| reporter_id   | uuid          | FK → profiles.id           |
| post_id       | uuid          | nullable, FK → posts.id    |
| comment_id    | uuid          | nullable, FK → comments.id |
| community_id  | uuid          | FK → communities.id        |
| reason        | report_reason | NOT NULL                   |
| description   | text          | nullable                   |
| status        | report_status | default 'pending'          |
| reviewed_by   | uuid          | nullable, FK → profiles.id |
| resolution    | text          | nullable                   |
| created_at    | timestamptz   | default now()              |
| reviewed_at   | timestamptz   | nullable                   |

---

# Enum Types

## app_role

```sql
CREATE TYPE app_role AS ENUM (
  'member',
  'moderator',
  'admin'
);
```

## community_role

```sql
CREATE TYPE community_role AS ENUM (
  'member',
  'moderator'
);
```

## vote_type

```sql
CREATE TYPE vote_type AS ENUM (
  'upvote',
  'downvote'
);
```

## content_type

```sql
CREATE TYPE content_type AS ENUM (
  'text',
  'link',
  'image'
);
```

## post_status

```sql
CREATE TYPE post_status AS ENUM (
  'published',
  'draft',
  'archived',
  'removed'
);
```

## notification_type

```sql
CREATE TYPE notification_type AS ENUM (
  'upvote',
  'downvote',
  'comment',
  'reply',
  'mention',
  'moderation',
  'system',
  'community_invite'
);
```

## report_reason

```sql
CREATE TYPE report_reason AS ENUM (
  'spam',
  'harassment',
  'hate_speech',
  'inappropriate_content',
  'misinformation',
  'copyright_violation',
  'other'
);
```

## report_status

```sql
CREATE TYPE report_status AS ENUM (
  'pending',
  'reviewed',
  'resolved',
  'dismissed'
);
```

---

# Recommended Indexes

```sql
-- profiles
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_karma ON profiles(karma DESC);

-- communities
CREATE INDEX idx_communities_slug ON communities(slug);
CREATE INDEX idx_communities_creator ON communities(creator_id);
CREATE INDEX idx_communities_member_count ON communities(member_count DESC);

-- community_members
CREATE INDEX idx_community_members_user ON community_members(user_id);
CREATE INDEX idx_community_members_community ON community_members(community_id);

-- community_rules
CREATE INDEX idx_community_rules_community ON community_rules(community_id);

-- community_flairs
CREATE INDEX idx_community_flairs_community ON community_flairs(community_id);

-- posts
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_community_id ON posts(community_id);
CREATE INDEX idx_posts_flair_id ON posts(flair_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_vote_score ON posts(vote_score DESC);
CREATE INDEX idx_posts_hot_score ON posts(hot_score DESC);
CREATE INDEX idx_posts_status ON posts(status);

-- comments
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);

-- votes
CREATE INDEX idx_votes_post ON votes(post_id) WHERE post_id IS NOT NULL;
CREATE INDEX idx_votes_comment ON votes(comment_id) WHERE comment_id IS NOT NULL;
CREATE INDEX idx_votes_user ON votes(user_id);

-- saved_posts
CREATE INDEX idx_saved_posts_user ON saved_posts(user_id);
CREATE INDEX idx_saved_posts_folder ON saved_posts(user_id, folder);

-- notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- reports
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_community ON reports(community_id);
```

---

# Recommended Triggers

## Create Profile After Signup

```text
auth.users
↓
create_profile()
↓
profiles
```

## Update Timestamp

```text
BEFORE UPDATE
↓
set updated_at = now()
```

## Update Vote Score

```text
vote INSERT/UPDATE/DELETE
↓
recalculate vote_score on post/comment
↓
update hot_score on post
↓
update karma on profiles
```

## Update Community Counts

```text
community_member INSERT/DELETE
↓
update member_count on communities

post INSERT/DELETE
↓
update post_count on communities
```

## Create Notification

```text
new upvote/downvote
new comment
new reply
new mention
↓
insert notification
```

## Increment Post Views

```text
post view
↓
increment views counter
```

## Comment Count Trigger

```text
comment INSERT/DELETE
↓
update comment_count on posts
```

## Hot Score Calculation

```text
vote_score change OR time passed
↓
hot_score = log10(max(|vote_score|, 1)) * sign(vote_score) + created_at_offset
```

---

# Supabase Storage Buckets

```text
avatars
post-images
community-banners
```

---

# Migration Order

```text
1. Enum Types
2. profiles (add karma, cake_day)
3. communities (renamed from categories)
4. community_members
5. community_rules
6. community_flairs
7. posts (add community_id, flair_id, vote_score, hot_score, content_type, is_pinned)
8. comments (add vote_score)
9. votes (replaces likes)
10. saved_posts (replaces bookmarks)
11. notifications (add new types)
12. reports (add community_id, reason enum, resolution)
13. Indexes
14. Triggers
15. RLS Policies
```

---

## Struktur Final Database

```text
auth.users
profiles
communities
community_members
community_rules
community_flairs
posts
comments
votes
saved_posts
notifications
reports
```
