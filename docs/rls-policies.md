# Reddit-like Community Discussion Platform - Row Level Security (RLS) Policies

## Overview

Project menggunakan:

* Supabase Auth
* Row Level Security (RLS)
* Role Based Access Control (RBAC)
* Community Level Access Control

Roles:

```text
Global:  member, moderator, admin
Community: member, moderator
```

---

# Authorization Matrix

| Action                      | Guest | Member | Mod (community) | Admin |
| --------------------------- | ----- | ------ | --------------- | ----- |
| View Posts                  | ✅     | ✅      | ✅               | ✅     |
| Create Post                 | ❌     | ✅      | ✅               | ✅     |
| Edit Own Post               | ❌     | ✅      | ✅               | ✅     |
| Delete Own Post             | ❌     | ✅      | ✅               | ✅     |
| Vote on Posts               | ❌     | ✅      | ✅               | ✅     |
| Vote on Comments            | ❌     | ✅      | ✅               | ✅     |
| Comment                     | ❌     | ✅      | ✅               | ✅     |
| Save Post                   | ❌     | ✅      | ✅               | ✅     |
| Create Community            | ❌     | ✅      | ✅               | ✅     |
| Join Community              | ❌     | ✅      | ✅               | ✅     |
| Leave Community             | ❌     | ✅      | ✅               | ✅     |
| View Notifications          | ❌     | Own    | Own             | Own   |
| Pin Post (own community)    | ❌     | ❌      | ✅               | ✅     |
| Lock Post (own community)   | ❌     | ❌      | ✅               | ✅     |
| Remove Post (community)     | ❌     | ❌      | ✅               | ✅     |
| Remove Comment (community)  | ❌     | ❌      | ✅               | ✅     |
| Manage Community Rules      | ❌     | ❌      | ✅               | ✅     |
| Manage Community Flairs     | ❌     | ❌      | ✅               | ✅     |
| Manage Community Members    | ❌     | ❌      | ✅               | ✅     |
| Review Reports (community)  | ❌     | ❌      | ✅               | ✅     |
| Manage All Communities      | ❌     | ❌      | ❌               | ✅     |
| Manage Users                | ❌     | ❌      | ❌               | ✅     |
| Delete Any Community        | ❌     | ❌      | ❌               | ✅     |
| Manage All Reports          | ❌     | ❌      | ❌               | ✅     |

---

# Helper Functions

## Current User Role

```sql
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS app_role
LANGUAGE sql
STABLE
AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;
```

## Is Community Member

```sql
CREATE OR REPLACE FUNCTION is_community_member(p_community_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM community_members
    WHERE community_id = p_community_id
    AND user_id = auth.uid()
  );
$$;
```

## Is Community Moderator

```sql
CREATE OR REPLACE FUNCTION is_community_moderator(p_community_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM community_members
    WHERE community_id = p_community_id
    AND user_id = auth.uid()
    AND role = 'moderator'
  );
$$;
```

## Is Community Creator

```sql
CREATE OR REPLACE FUNCTION is_community_creator(p_community_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM communities
    WHERE id = p_community_id
    AND creator_id = auth.uid()
  );
$$;
```

## Can Moderate Community

```sql
CREATE OR REPLACE FUNCTION can_moderate_community(p_community_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT
    get_user_role() = 'admin'
    OR is_community_moderator(p_community_id)
    OR is_community_creator(p_community_id);
$$;
```

---

# Profiles Policies

## Enable RLS

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

## Read Profiles

Semua pengguna dapat melihat profil.

```sql
CREATE POLICY "profiles_select"
ON profiles
FOR SELECT
USING (true);
```

## Insert Profile

Hanya user sendiri saat registrasi.

```sql
CREATE POLICY "profiles_insert"
ON profiles
FOR INSERT
WITH CHECK (auth.uid() = id);
```

## Update Own Profile

```sql
CREATE POLICY "profiles_update_own"
ON profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
```

## Admin Update Any Profile

```sql
CREATE POLICY "profiles_admin_update"
ON profiles
FOR UPDATE
USING (get_user_role() = 'admin');
```

---

# Communities Policies

## Enable RLS

```sql
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
```

## Read Communities

Semua orang dapat melihat komunitas.

```sql
CREATE POLICY "communities_select"
ON communities
FOR SELECT
USING (true);
```

## Create Community

User terdaftar dapat membuat komunitas.

```sql
CREATE POLICY "communities_insert"
ON communities
FOR INSERT
WITH CHECK (auth.uid() = creator_id);
```

## Update Community

Creator atau moderator komunitas.

```sql
CREATE POLICY "communities_update"
ON communities
FOR UPDATE
USING (
  can_moderate_community(id)
);
```

## Delete Community

Creator atau admin.

```sql
CREATE POLICY "communities_delete"
ON communities
FOR DELETE
USING (
  creator_id = auth.uid()
  OR get_user_role() = 'admin'
);
```

---

# Community Members Policies

## Enable RLS

```sql
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;
```

## Read Members

Semua orang dapat melihat anggota komunitas.

```sql
CREATE POLICY "community_members_select"
ON community_members
FOR SELECT
USING (true);
```

## Join Community (Insert)

User sendiri.

```sql
CREATE POLICY "community_members_insert"
ON community_members
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

## Leave Community (Delete)

User sendiri.

```sql
CREATE POLICY "community_members_delete"
ON community_members
FOR DELETE
USING (auth.uid() = user_id);
```

## Moderate Members (Remove/Update Role)

Moderator atau admin komunitas.

```sql
CREATE POLICY "community_members_moderate"
ON community_members
FOR UPDATE
USING (
  can_moderate_community(community_id)
);

CREATE POLICY "community_members_moderate_delete"
ON community_members
FOR DELETE
USING (
  can_moderate_community(community_id)
);
```

---

# Community Rules Policies

## Enable RLS

```sql
ALTER TABLE community_rules ENABLE ROW LEVEL SECURITY;
```

## Read Rules

Semua orang dapat melihat rules.

```sql
CREATE POLICY "community_rules_select"
ON community_rules
FOR SELECT
USING (true);
```

## Manage Rules

Moderator atau admin komunitas.

```sql
CREATE POLICY "community_rules_manage"
ON community_rules
FOR ALL
USING (
  can_moderate_community(community_id)
);
```

---

# Community Flairs Policies

## Enable RLS

```sql
ALTER TABLE community_flairs ENABLE ROW LEVEL SECURITY;
```

## Read Flairs

Semua orang dapat melihat flairs.

```sql
CREATE POLICY "community_flairs_select"
ON community_flairs
FOR SELECT
USING (true);
```

## Manage Flairs

Moderator atau admin komunitas.

```sql
CREATE POLICY "community_flairs_manage"
ON community_flairs
FOR ALL
USING (
  can_moderate_community(community_id)
);
```

---

# Posts Policies

## Enable RLS

```sql
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
```

## Read Posts

Published posts atau removed.

```sql
CREATE POLICY "posts_select"
ON posts
FOR SELECT
USING (
  status = 'published'
  OR status = 'removed'
);
```

## Create Post

User terdaftar.

```sql
CREATE POLICY "posts_insert"
ON posts
FOR INSERT
WITH CHECK (auth.uid() = author_id);
```

## Update Own Post

```sql
CREATE POLICY "posts_update_own"
ON posts
FOR UPDATE
USING (auth.uid() = author_id);
```

## Delete Own Post

```sql
CREATE POLICY "posts_delete_own"
ON posts
FOR DELETE
USING (auth.uid() = author_id);
```

## Moderator Pin/Lock/Remove (Community)

```sql
CREATE POLICY "posts_community_moderator"
ON posts
FOR UPDATE
USING (
  can_moderate_community(community_id)
);
```

## Moderator/Admin Delete Any Post

```sql
CREATE POLICY "posts_moderator_delete"
ON posts
FOR DELETE
USING (
  get_user_role() = 'admin'
);
```

---

# Comments Policies

## Enable RLS

```sql
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
```

## Read Comments

```sql
CREATE POLICY "comments_select"
ON comments
FOR SELECT
USING (true);
```

## Create Comment

```sql
CREATE POLICY "comments_insert"
ON comments
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

## Delete Own Comment

```sql
CREATE POLICY "comments_delete_own"
ON comments
FOR DELETE
USING (auth.uid() = user_id);
```

## Moderator/Admin Delete Any Comment

```sql
CREATE POLICY "comments_moderator_delete"
ON comments
FOR DELETE
USING (
  get_user_role() = 'admin'
  OR (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = comments.post_id
      AND can_moderate_community(posts.community_id)
    )
  )
);
```

---

# Votes Policies

## Enable RLS

```sql
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
```

## Read Votes

```sql
CREATE POLICY "votes_select"
ON votes
FOR SELECT
USING (true);
```

## Insert Vote

```sql
CREATE POLICY "votes_insert"
ON votes
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

## Update Vote (Change upvote ↔ downvote)

```sql
CREATE POLICY "votes_update"
ON votes
FOR UPDATE
USING (auth.uid() = user_id);
```

## Remove Vote

```sql
CREATE POLICY "votes_delete"
ON votes
FOR DELETE
USING (auth.uid() = user_id);
```

---

# Saved Posts Policies

## Enable RLS

```sql
ALTER TABLE saved_posts ENABLE ROW LEVEL SECURITY;
```

## View Own Saved Posts

```sql
CREATE POLICY "saved_posts_select"
ON saved_posts
FOR SELECT
USING (auth.uid() = user_id);
```

## Save Post

```sql
CREATE POLICY "saved_posts_insert"
ON saved_posts
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

## Unsave Post

```sql
CREATE POLICY "saved_posts_delete"
ON saved_posts
FOR DELETE
USING (auth.uid() = user_id);
```

---

# Notifications Policies

## Enable RLS

```sql
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
```

## View Own Notifications

```sql
CREATE POLICY "notifications_select"
ON notifications
FOR SELECT
USING (auth.uid() = user_id);
```

## Update Own Notifications

```sql
CREATE POLICY "notifications_update"
ON notifications
FOR UPDATE
USING (auth.uid() = user_id);
```

---

# Reports Policies

## Enable RLS

```sql
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
```

## Create Report

```sql
CREATE POLICY "reports_insert"
ON reports
FOR INSERT
WITH CHECK (auth.uid() = reporter_id);
```

## View Own Reports

```sql
CREATE POLICY "reports_select_own"
ON reports
FOR SELECT
USING (auth.uid() = reporter_id);
```

## Moderator/Admin View All Reports (Community)

```sql
CREATE POLICY "reports_moderator_select"
ON reports
FOR SELECT
USING (
  can_moderate_community(community_id)
);
```

## Moderator/Admin Manage Reports

```sql
CREATE POLICY "reports_moderator_all"
ON reports
FOR ALL
USING (
  can_moderate_community(community_id)
  OR get_user_role() = 'admin'
);
```

---

# Storage Policies

## avatars bucket

* Public Read
* Owner Upload
* Owner Update
* Owner Delete

## post-images bucket

* Public Read
* Authenticated Upload
* Owner Delete

## community-banners bucket (NEW)

* Public Read
* Community Creator/Moderator Upload
* Community Creator/Moderator Update
* Community Creator/Moderator Delete

---

# Security Principles

```text
1. Least Privilege Principle
2. Owner-Based Access
3. Role-Based Access (Global)
4. Community-Level Access Control
5. Database-Level Security (RLS)
6. Defense in Depth
```

---

# RLS Deployment Order

```text
1. Create enum types
2. Create helper functions
3. Create/update tables
4. Enable RLS
5. Create policies
6. Test policies
```

---

# RLS Testing Checklist

```text
✓ Guest cannot create post
✓ Guest can view published posts
✓ Member can create post in joined community
✓ Member cannot create post in non-joined community (if private)
✓ Member can upvote/downvote
✓ Member cannot vote twice on same post
✓ Member can save/unsave post
✓ Community moderator can pin/lock/remove post
✓ Community moderator cannot moderate other communities
✓ Admin can moderate all communities
✓ User can only edit own profile
✓ User can only delete own posts/comments
✓ Reports are visible to moderators of the community
✓ Notifications are only visible to owner
```
