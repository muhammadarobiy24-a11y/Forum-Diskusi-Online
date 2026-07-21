# Sprint Planning - Reddit-like Community Discussion Platform

> Sprint 0-10 sudah selesai (Forum Diskusi Online).
> Sprint 11+ adalah evolusi ke Reddit-like Community Discussion Platform.

---

# Sprint Timeline

| Sprint    | Fokus                                        | Estimasi |
| --------- | -------------------------------------------- | -------- |
| Sprint 0-10 | Forum Diskusi Online (DONE)                | -        |
| Sprint 11 | Database Migration: Communities & Votes      | 2-3 hari |
| Sprint 12 | Communities: CRUD & Membership               | 3 hari   |
| Sprint 13 | Voting System (Upvote & Downvote)            | 2-3 hari |
| Sprint 14 | Feed System (Hot, Top, New, Rising)          | 3 hari   |
| Sprint 15 | Community Page & Sidebar                     | 2-3 hari |
| Sprint 16 | Flair System & Markdown Editor               | 2-3 hari |
| Sprint 17 | Saved Posts & Search Enhancement             | 2 hari   |
| Sprint 18 | Moderation Tools & Reports Enhancement       | 3 hari   |
| Sprint 19 | Trending, Popular, User Karma                | 2-3 hari |
| Sprint 20 | QA, Polish & Production Readiness            | 2-3 hari |

---

# Sprint 11 – Database Migration: Communities & Votes

## Goal

Migrate database dari forum model ke Reddit-like community model.

## Features

### Database Changes

* Rename `categories` → `communities` (add new columns: creator_id, banner_url, is_private, member_count, post_count)
* Create `community_members` table
* Create `community_rules` table
* Create `community_flairs` table
* Create `votes` table (replacing likes)
* Create `saved_posts` table (replacing bookmarks)
* Add `karma`, `cake_day` to profiles
* Add `community_id`, `flair_id`, `vote_score`, `hot_score`, `content_type`, `is_pinned` to posts
* Add `vote_score` to comments
* Update `reports` table (add community_id, reason enum)
* Update notification_type enum

### Enums

* Create `community_role` enum
* Create `vote_type` enum
* Create `content_type` enum
* Create `report_reason` enum
* Update `post_status` (add 'removed')
* Update `notification_type` (add 'upvote', 'downvote', 'moderation', 'community_invite')

### Triggers

* vote-score-trigger.sql
* hot-score-trigger.sql
* community-counts-trigger.sql
* karma-trigger.sql

## Acceptance Criteria

* ✅ Semua tabel baru sudah dibuat.
* ✅ Semua enum sudah diupdate.
* ✅ Triggers bekerja dengan benar.
* ✅ Data existing (likes → votes, bookmarks → saved_posts, categories → communities) sudah di-migrate.
* ✅ RLS policies baru sudah diterapkan.

---

# Sprint 12 – Communities: CRUD & Membership

## Goal

Implementasi komunitas sebagai unit konten utama.

## Features

### Community CRUD

* Community list page (popular communities)
* Community detail page
* Create community form
* Edit community (creator only)
* Community search

### Community Membership

* Join community button
* Leave community button
* Community members list
* Member count display

### Community Rules

* Community rules display
* Community rules management (moderator)

### Community Flairs

* Community flairs display
* Community flairs management (moderator)

## Files to Create/Update

### Types

* types/community.ts
* types/community-member.ts
* types/community-rule.ts
* types/community-flair.ts

### Repositories

* repositories/community.repository.ts
* repositories/community-membership.repository.ts
* repositories/community-rules.repository.ts
* repositories/community-flairs.repository.ts

### Services

* services/community.service.ts
* services/community-membership.service.ts
* services/community-rules.service.ts
* services/community-flairs.service.ts

### Hooks

* hooks/useCommunities.ts
* hooks/useCommunity.ts
* hooks/useCreateCommunity.ts
* hooks/useJoinCommunity.ts
* hooks/useLeaveCommunity.ts
* hooks/useCommunityMembers.ts
* hooks/useCommunityRules.ts
* hooks/useCommunityFlairs.ts

### Components

* components/community/CommunityCard.tsx
* components/community/CommunityList.tsx
* components/community/CommunityHeader.tsx
* components/community/CommunitySidebar.tsx
* components/community/CommunityRules.tsx
* components/community/CommunityFlairList.tsx
* components/community/CommunityMembers.tsx
* components/community/JoinLeaveButton.tsx
* components/community/CreateCommunityForm.tsx
* components/community/CommunitySearch.tsx
* components/community/PopularCommunities.tsx
* components/community/CommunitySkeleton.tsx
* components/community/CommunityEmptyState.tsx

### Pages

* app/(main)/communities/page.tsx
* app/(main)/communities/[slug]/page.tsx
* app/(main)/communities/[slug]/rules/page.tsx
* app/(main)/communities/[slug]/loading.tsx

### Schemas

* schemas/community.schema.ts
* schemas/community-rules.schema.ts
* schemas/community-flairs.schema.ts

### Constants

* Update lib/constants/routes.ts
* Update lib/constants/query-keys.ts

## Acceptance Criteria

* ✅ User dapat melihat daftar komunitas.
* ✅ User dapat membuat komunitas baru.
* ✅ User dapat join/leave komunitas.
* ✅ Moderator dapat mengelola rules dan flairs.
* ✅ Community detail menampilkan info, rules, dan posts.

---

# Sprint 13 – Voting System

## Goal

Menggantikan Like dengan Upvote & Downvote.

## Features

### Post Voting

* Upvote post
* Downvote post
* Vote score display (net: upvote - downvote)
* Vote status (apakah user sudah vote)
* Optimistic update

### Comment Voting

* Upvote comment
* Downvote comment
* Vote score display

### Karma System

* Post karma calculation
* Comment karma calculation
* Total karma display

## Files to Create/Update

### Types

* types/vote.ts (replacing like.ts)

### Repositories

* repositories/vote.repository.ts (replacing like.repository.ts)

### Services

* services/vote.service.ts (replacing like.service.ts)

### Hooks

* hooks/useVote.ts (replacing useToggleLike.ts)
* hooks/useCommentVote.ts
* hooks/useVoteStatus.ts (replacing useLikeStatus.ts)

### Components

* components/like/VoteButton.tsx (renamed, redesigned: up + score + down)
* components/like/CommentVoteButton.tsx

### Utils

* lib/utils/karma.ts
* lib/utils/hot-score.ts

## Acceptance Criteria

* ✅ User dapat upvote dan downvote post.
* ✅ User dapat upvote dan downvote komentar.
* ✅ Vote score ditampilkan dengan benar.
* ✅ Karma user dihitung dan ditampilkan.
* ✅ Optimistic update bekerja.

---

# Sprint 14 – Feed System

## Goal

Membangun sistem feed ala Reddit.

## Features

### Home Feed

* Logged-in: posts dari komunitas yang diikuti.
* Guest: posts populer global.
* Sort: Hot, Top, New, Rising.

### Community Feed

* Posts dari satu komunitas.
* Sort: Hot, Top, New, Rising, Most Commented.

### Sort Algorithms

* Hot: vote_score + time decay.
* Top: vote_score DESC + time filter.
* New: created_at DESC.
* Rising: vote velocity (votes/hour).

### Feed Components

* HomeFeed.tsx
* CommunityFeed.tsx
* FeedSort.tsx (tabs: Hot/Top/New/Rising)

## Files to Create/Update

### Repositories

* repositories/feed.repository.ts

### Services

* services/feed.service.ts

### Hooks

* hooks/useHomeFeed.ts
* hooks/useCommunityFeed.ts

### Components

* components/feed/HomeFeed.tsx
* components/feed/CommunityFeed.tsx
* components/feed/FeedSort.tsx

### Pages

* app/(main)/page.tsx (Home Feed)
* app/(main)/communities/[slug]/page.tsx (Community Feed)

## Acceptance Criteria

* ✅ Home feed menampilkan posts yang relevan.
* ✅ Community feed menampilkan posts dari komunitas.
* ✅ Sorting bekerja (Hot, Top, New, Rising).
* ✅ Hot algorithm menghasilkan ranking yang wajar.
* ✅ Top filter per waktu bekerja.

---

# Sprint 15 – Community Page & Sidebar

## Goal

Membangun community page dan Reddit-like sidebar.

## Features

### Community Page

* Community header (banner, icon, name, description)
* Community feed
* Join/Leave button
* Member count, post count

### Sidebar

* Home sidebar (trending, popular)
* Community sidebar (about, rules, mods, join button)
* Post detail sidebar (community info, rules)
* Context-aware sidebar

## Files to Create/Update

### Components

* components/sidebar/HomeSidebar.tsx
* components/sidebar/CommunityInfoSidebar.tsx
* components/sidebar/PostSidebar.tsx
* components/sidebar/SidebarSkeleton.tsx
* components/layout/RedditSidebar.tsx

### Pages

* Update app/(main)/communities/[slug]/page.tsx
* Update app/(main)/post/[id]/page.tsx

## Acceptance Criteria

* ✅ Community page menampilkan header dan feed.
* ✅ Sidebar konteks-aware (beda di home, community, post detail).
* ✅ Community sidebar menampilkan info, rules, moderators.
* ✅ Responsive (sidebar hidden on mobile, toggle via menu).

---

# Sprint 16 – Flair System & Markdown Editor

## Goal

Implementasi flair untuk post dan markdown editor.

## Features

### Flair System

* Community moderator membuat flair (nama + warna)
* User memilih flair saat create post
* Flair badge ditampilkan di post
* Filter post by flair

### Markdown Editor

* Rich text toolbar (Bold, Italic, Headers, Links, Code, Lists, Quotes, Images)
* Live preview
* Safe HTML rendering

## Files to Create/Update

### Components

* components/flair/FlairBadge.tsx
* components/flair/FlairPicker.tsx
* components/flair/FlairManager.tsx
* components/flair/FlairFilter.tsx
* components/markdown/MarkdownEditor.tsx
* components/markdown/MarkdownPreview.tsx
* components/markdown/MarkdownToolbar.tsx

### Utils

* lib/utils/markdown.ts

## Acceptance Criteria

* ✅ Moderator dapat membuat dan mengelola flair.
* ✅ User dapat memilih flair saat create post.
* ✅ Flair badge ditampilkan di post.
* ✅ Markdown editor bekerja dengan toolbar dan preview.
* ✅ Content aman dari XSS.

---

# Sprint 17 – Saved Posts & Search Enhancement

## Goal

Menggantikan bookmarks dan enhance search.

## Features

### Saved Posts (replacing Bookmarks)

* Save post to folder
* Unsave post
* Saved posts list with folders
* Folder management

### Search Enhancement

* Search scope: Posts, Communities, Users
* Search community by name
* Search user by username
* Unified search page

## Files to Create/Update

### Types

* types/saved-post.ts
* types/search.ts

### Repositories

* repositories/saved-post.repository.ts
* repositories/search.repository.ts

### Services

* services/saved-post.service.ts
* services/search.service.ts

### Hooks

* hooks/useSavePost.ts
* hooks/useSaveStatus.ts
* hooks/useSavedPosts.ts
* hooks/useSearch.ts
* hooks/useSearchCommunity.ts
* hooks/useSearchUser.ts

### Components

* components/bookmark/SaveButton.tsx
* components/bookmark/SavedPostCard.tsx
* components/bookmark/SavedPostList.tsx
* components/bookmark/FolderManager.tsx
* components/bookmark/SavedPostSkeleton.tsx
* components/bookmark/SavedPostEmptyState.tsx
* components/community/CommunitySearch.tsx
* components/profile/UserSearch.tsx

### Pages

* app/(main)/bookmarks/page.tsx (updated: folders)

## Acceptance Criteria

* ✅ User dapat save post ke folder.
* ✅ User dapat mengelola folder saved posts.
* ✅ Search dapat mencari posts, communities, dan users.
* ✅ Search debounce bekerja.

---

# Sprint 18 – Moderation Tools & Reports Enhancement

## Goal

Membangun moderation tools level komunitas dan enhance reports.

## Features

### Community Moderator Tools

* Pin/Unpin post
* Lock/Unlock post
* Remove post (soft delete)
* Remove comment
* Manage community members (approve/remove)
* Review reports di komunitas

### Reports Enhancement

* Report reasons (spam, harassment, hate speech, etc.)
* Report description
* Community-scoped reports
* Moderator resolution

## Files to Create/Update

### Types

* types/report.ts

### Repositories

* repositories/report.repository.ts

### Services

* services/report.service.ts

### Hooks

* hooks/usePinPost.ts
* hooks/useLockPost.ts
* hooks/useRemovePost.ts
* hooks/useReports.ts
* hooks/useCreateReport.ts

### Components

* components/moderation/ModTools.tsx
* components/moderation/ModMenu.tsx
* components/moderation/ReportDialog.tsx
* components/moderation/ReportList.tsx
* components/moderation/ManageRules.tsx
* components/moderation/ManageFlairs.tsx
* components/post/PinnedBadge.tsx
* components/post/LockedBadge.tsx

### Pages

* app/admin/users/page.tsx

## Acceptance Criteria

* ✅ Moderator dapat pin/lock/remove post.
* ✅ Report dengan reason dan description.
* ✅ Moderator dapat review reports di komunitasnya.
* ✅ Admin dapat manage semua users.

---

# Sprint 19 – Trending, Popular & User Karma

## Goal

Membangun trending, popular, dan enhance karma display.

## Features

### Trending

* Trending communities (pertumbuhan anggota)
* Trending posts (vote velocity)
* Trending page

### Popular

* Popular posts (global)
* Popular communities
* Display di sidebar

### User Karma

* Post karma breakdown
* Comment karma breakdown
* Total karma
* Karma badge di profil dan sebelah username

## Files to Create/Update

### Repositories

* repositories/trending.repository.ts

### Services

* services/trending.service.ts

### Hooks

* hooks/useTrending.ts
* hooks/usePopularPosts.ts
* hooks/usePopularCommunities.ts

### Components

* components/feed/TrendingPosts.tsx
* components/feed/PopularPosts.tsx
* components/community/PopularCommunities.tsx
* components/profile/KarmaBadge.tsx
* components/sidebar/HomeSidebar.tsx (trending section)
* components/post/PostCard.tsx (show karma next to username)

### Utils

* lib/utils/karma.ts

## Acceptance Criteria

* ✅ Trending communities dan posts ditampilkan.
* ✅ Popular posts dan communities ditampilkan.
* ✅ Karma user ditampilkan di profil dan di sebelah username.
* ✅ Sidebar menampilkan trending dan popular.

---

# Sprint 20 – QA, Polish & Production Readiness

## Goal

Quality assurance dan deployment.

## Features

### Testing

* Unit Testing
* Integration Testing
* Manual Testing
* Security Testing
* RLS Testing

### Performance

* Image Optimization
* Caching (React Query config)
* Code Splitting
* Database query optimization

### Deployment

* Deploy Vercel
* Production Environment
* Domain Setup

### Documentation

* Update README
* Update Progress Log
* Update project-checkpoint.md

## Acceptance Criteria

* ✅ Build berhasil.
* ✅ Tidak ada Type Error.
* ✅ Tidak ada ESLint Error.
* ✅ Semua fitur berjalan.
* ✅ Deployment berhasil.

---

# Definition of Done (DoD)

Setiap sprint dianggap selesai jika:

```text
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

# Migration Strategy (from Sprint 0-10 to Sprint 11+)

```text
1. Backup database
2. Run migration scripts (new tables + alter existing)
3. Migrate data:
   - categories → communities (add creator_id, member_count, post_count)
   - likes → votes (map: like → upvote)
   - bookmarks → saved_posts (add folder column)
4. Add new columns to existing tables:
   - profiles: karma, cake_day
   - posts: community_id, flair_id, vote_score, hot_score, content_type, is_pinned
   - comments: vote_score
   - reports: community_id, reason
5. Deploy new code
6. Verify all features
7. Remove old tables (categories, likes, bookmarks) after verification
```

---

# Development Workflow

```text
Documentation Review
 ↓
Sprint Planning
 ↓
Implementation (Repository → Service → Hook → Component)
 ↓
Validation (TypeScript + ESLint + Build)
 ↓
Manual Testing
 ↓
Code Review
 ↓
Merge
 ↓
Sprint berikutnya
```

---

# Urutan Pengerjaan

```text
Sprint 11 (Database Migration)
 ↓
Sprint 12 (Communities)
 ↓
Sprint 13 (Voting)
 ↓
Sprint 14 (Feed System)
 ↓
Sprint 15 (Community Page & Sidebar)
 ↓
Sprint 16 (Flair & Markdown)
 ↓
Sprint 17 (Saved Posts & Search)
 ↓
Sprint 18 (Moderation & Reports)
 ↓
Sprint 19 (Trending & Karma)
 ↓
Sprint 20 (QA & Go-Live)
```
