# Project Checkpoint - Forum Diskusi Online

> Handover document untuk melanjutkan project di session baru.

---

## Project Overview

| Item | Detail |
|------|--------|
| **Nama** | Online Forum (Forum Diskusi Online) |
| **Versi** | 0.1.0 |
| **Framework** | Next.js 16.2.10 (App Router) |
| **Bahasa** | TypeScript 5.x |
| **Database** | Supabase (PostgreSQL) |
| **Styling** | Tailwind CSS 4.x |
| **UI Library** | Shadcn UI (base-ui/react) |
| **State Management** | React Query (TanStack Query) |
| **Form** | React Hook Form + Zod |
| **Auth** | Supabase Auth + SSR |
| **Tujuan** | Platform forum diskusi dengan posts, comments, replies, bookmarks, likes, notifications |

---

## Folder Structure

```
online-forum/
├── app/
│   ├── (auth)/           # Auth pages (login, register, forgot/reset password)
│   ├── (main)/           # Main app pages (posts, categories, profile, bookmarks, notifications)
│   ├── admin/            # Admin dashboard
│   ├── actions/          # Server actions (auth)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── loading.tsx       # Global loading
│   ├── error.tsx         # Global error
│   └── not-found.tsx     # 404 page
│
├── components/
│   ├── auth/             # Auth forms (LoginForm, RegisterForm, etc.)
│   ├── bookmark/         # Bookmark components
│   ├── category/         # Category components
│   ├── comment/          # Comment & reply components
│   ├── layout/           # Layout components (Header, Sidebar, etc.)
│   ├── like/             # Like components
│   ├── notification/     # Notification components
│   ├── post/             # Post components
│   ├── profile/          # Profile components
│   ├── providers/        # Context providers (Query, Session, Theme)
│   └── ui/               # Shadcn UI components
│
├── hooks/                # React Query hooks
├── repositories/         # Database queries (Supabase)
├── services/             # Business logic layer
├── schemas/              # Zod validation schemas
├── types/                # TypeScript type definitions
├── lib/
│   ├── constants/        # App constants (routes, query-keys, roles, storage)
│   ├── supabase/         # Supabase client, server, middleware
│   └── utils/            # Utility functions (date, slug, pagination)
├── sql/                  # SQL migration files
├── docs/                 # Documentation
└── tests/                # Test files (empty)
```

---

## Sprint Progress

### Sprint 0 - Project Setup ✅
- Created folder structure
- Set up Supabase SSR (client, server, middleware)
- Created providers (QueryProvider, SessionProvider, ThemeProvider)
- Created `.env.example`
- Created placeholder pages

### Sprint 1 - Authentication ✅
- Login, Register, Logout
- Forgot Password, Reset Password
- Auth forms with React Hook Form + Zod
- Session management
- Protected routes via middleware
- Login redirect callback

### Sprint 2 - User Profile & Layout ✅
- Layout: AppHeader, AppSidebar, MobileNav, UserMenu, MainLayout
- Profile: ProfileCard, EditProfileForm, AvatarUpload, ProfileStats
- Profile viewing and editing
- Avatar upload with Supabase Storage

### Sprint 3 - Categories ✅
- CategoryCard, CategoryList, CategoryFilter, CategoryForm
- Category listing with search
- Admin CRUD for categories
- Admin layout with navigation

### Sprint 4 - Posts ✅
- 4.1: Constants & Utilities Foundation
- 4.2: Database Preparation & Posts RLS
- 4.3: Posts List with pagination, category filter
- 4.4: Post Detail with view counter
- 4.5: Create Post
- 4.6: Edit Post
- 4.7: Delete Post

### Sprint 5 - Comments ✅
- 5.1: Comments Database & RLS
- 5.2: Comments List
- 5.3: Create Comment
- 5.4: Edit Comment
- 5.5: Delete Comment
- 5.6: Replies (Nested Comments - 1 level)
- 5.7: Comment Count

### Sprint 6 - Search & Filter ✅
- 6.1: Search Posts (title, content)
- 6.2: Search Categories (name, description)
- 6.3: Sorting Posts (newest, oldest, most_viewed, most_commented)
- 6.4: Pagination Enhancement (Previous/Next, page info)
- 6.5: URL Query Params as Single Source of Truth
- 6.6: Debounced Search (500ms)

### Sprint 7 - Bookmarks & Likes ✅
- 7.1: Database & RLS (bookmarks, likes tables)
- 7.2: Bookmark CRUD (toggle, list, status)
- 7.3: Likes CRUD (toggle, count, status)
- 7.4: Counts & UI Enhancement (LikeButton, BookmarkButton, optimistic updates)
- 7.5: My Bookmarks Page Enhancement (search, sort, pagination)

### Sprint 8 - Notifications ✅
- 8.1: Notifications Database (MVP)
- 8.2: Notification Repository, Service & React Query
- 8.3: Notifications Page (MVP)
- 8.4: Mark Notification as Read
- 8.5: Notification Badge on Header

### Sprint 9 - QA & Polish ✅
- 9.1: UI & UX Audit & Polishing
- 9.2: Responsive Layout Audit
- 9.3: Loading, Empty State & Error State Audit
- 9.4: Security & Authorization Audit
- 9.5: Final QA, Code Cleanup & Production Readiness

---

## Database

### Tables

| Table | Status | Notes |
|-------|--------|-------|
| `profiles` | ✅ Active | User profiles, FK to auth.users |
| `categories` | ✅ Active | Forum categories |
| `posts` | ✅ Active | Forum posts with views, comment_count |
| `comments` | ✅ Active | Comments + replies (parent_id) |
| `bookmarks` | ✅ Active | User bookmarks (user_id, post_id) |
| `likes` | ✅ Active | User likes (user_id, post_id) |
| `notifications` | ✅ Active | User notifications (type: like, comment, reply, bookmark) |

### Enums

| Enum | Values |
|------|--------|
| `app_role` | member, moderator, admin |
| `post_status` | published, draft, archived |

### Storage Buckets

| Bucket | Purpose |
|--------|---------|
| `avatars` | User profile pictures |

### SQL Files

| File | Purpose |
|------|---------|
| `sql/posts-indexes.sql` | Post table indexes |
| `sql/posts-rls.sql` | Post RLS policies |
| `sql/comments-table.sql` | Comments table DDL |
| `sql/comments-indexes.sql` | Comment indexes |
| `sql/comments-rls.sql` | Comment RLS policies |
| `sql/bookmarks-table.sql` | Bookmarks table DDL |
| `sql/bookmarks-indexes.sql` | Bookmark indexes |
| `sql/bookmarks-rls.sql` | Bookmark RLS policies |
| `sql/likes-table.sql` | Likes table DDL |
| `sql/likes-indexes.sql` | Like indexes |
| `sql/likes-rls.sql` | Like RLS policies |
| `sql/notifications-table.sql` | Notifications table DDL |
| `sql/notifications-indexes.sql` | Notification indexes |
| `sql/notifications-rls.sql` | Notification RLS policies |
| `sql/increment-post-views.sql` | RPC function for view counter |
| `sql/comment-count-trigger.sql` | Comment count column + trigger |

---

## Features Completed

### Authentication
- ✅ Login with email/password
- ✅ Register with email/username
- ✅ Logout
- ✅ Forgot password (email reset)
- ✅ Reset password
- ✅ Session management
- ✅ Protected routes

### User Profile
- ✅ View profile
- ✅ Edit profile (username, full_name, bio)
- ✅ Avatar upload (Supabase Storage)
- ✅ Profile stats

### Categories
- ✅ List categories
- ✅ Search categories
- ✅ Category detail page
- ✅ Admin CRUD

### Posts
- ✅ List posts with pagination
- ✅ Search posts (title, content)
- ✅ Sort posts (newest, oldest, most viewed, most commented)
- ✅ Filter by category
- ✅ Post detail with view counter
- ✅ Create post
- ✅ Edit post (author only)
- ✅ Delete post (author only)
- ✅ Comment count display
- ✅ Like count display

### Comments
- ✅ List comments
- ✅ Create comment
- ✅ Edit comment (author only)
- ✅ Delete comment (author only)
- ✅ Replies (1-level nesting)
- ✅ Reply list

### Search & Filter
- ✅ Debounced search (500ms)
- ✅ URL-based state management
- ✅ Pagination with page info

### Bookmarks
- ✅ Toggle bookmark on posts
- ✅ Bookmark status detection
- ✅ My Bookmarks page with search, sort, pagination
- ✅ Bookmark count

### Likes
- ✅ Toggle like on posts
- ✅ Like status detection
- ✅ Like count display
- ✅ Optimistic updates

### Notifications
- ✅ Notifications list page
- ✅ Notification types (like, comment, reply, bookmark)
- ✅ Mark as read (single & all)
- ✅ Unread badge on header
- ✅ Notification skeleton & empty states

### UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Consistent loading states
- ✅ Consistent empty states
- ✅ Consistent error states
- ✅ Accessibility (aria-labels)

---

## Routes

### Public Routes
| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/login` | Login page |
| `/register` | Register page |
| `/forgot-password` | Forgot password page |
| `/reset-password` | Reset password page |
| `/categories` | Categories list |
| `/categories/[slug]` | Category detail |
| `/post` | Posts list |
| `/post/[id]` | Post detail |

### Protected Routes
| Route | Description |
|-------|-------------|
| `/profile` | User profile |
| `/profile/edit` | Edit profile |
| `/bookmarks` | My bookmarks |
| `/notifications` | Notifications |
| `/settings` | Settings |
| `/post/create` | Create post |
| `/post/[id]/edit` | Edit post |

### Admin Routes
| Route | Description |
|-------|-------------|
| `/admin` | Admin dashboard |
| `/admin/categories` | Manage categories |
| `/admin/categories/create` | Create category |
| `/admin/categories/[id]/edit` | Edit category |

---

## React Query Hooks

| Hook | File | Purpose |
|------|------|---------|
| `usePosts` | `hooks/usePosts.ts` | Fetch posts list |
| `usePost` | `hooks/usePost.ts` | Fetch single post |
| `useCreatePost` | `hooks/useCreatePost.ts` | Create post mutation |
| `useUpdatePost` | `hooks/useUpdatePost.ts` | Update post mutation |
| `useDeletePost` | `hooks/useDeletePost.ts` | Delete post mutation |
| `useComments` | `hooks/useComments.ts` | Fetch comments |
| `useCreateComment` | `hooks/useCreateComment.ts` | Create comment mutation |
| `useUpdateComment` | `hooks/useUpdateComment.ts` | Update comment mutation |
| `useDeleteComment` | `hooks/useDeleteComment.ts` | Delete comment mutation |
| `useReplies` | `hooks/useReplies.ts` | Fetch replies |
| `useCreateReply` | `hooks/useCreateReply.ts` | Create reply mutation |
| `useCategories` | `hooks/useCategories.ts` | Fetch categories |
| `useDebounce` | `hooks/useDebounce.ts` | Debounce value |
| `useBookmarks` | `hooks/useBookmarks.ts` | Fetch bookmarks list |
| `useToggleBookmark` | `hooks/useToggleBookmark.ts` | Toggle bookmark mutation |
| `useBookmarkStatus` | `hooks/useBookmarkStatus.ts` | Check bookmark status |
| `useLikeCount` | `hooks/useLikes.ts` | Fetch like count |
| `useToggleLike` | `hooks/useToggleLike.ts` | Toggle like mutation |
| `useLikeStatus` | `hooks/useLikeStatus.ts` | Check like status |
| `useNotifications` | `hooks/useNotifications.ts` | Fetch notifications list |
| `useUnreadNotifications` | `hooks/useUnreadNotifications.ts` | Fetch unread count |
| `useMarkNotificationRead` | `hooks/useMarkNotificationRead.ts` | Mark notifications as read |

---

## Repository Layer

| Repository | File | Functions |
|------------|------|-----------|
| Post | `repositories/post.repository.ts` | `createPost`, `updatePost`, `deletePost`, `getPostById`, `getPosts`, `incrementPostViews` |
| Category | `repositories/category.repository.ts` | `getCategories` |
| Comment | `repositories/comment.repository.ts` | `createComment`, `updateComment`, `deleteComment`, `getCommentsByPostId`, `getReplies`, `createReply` |
| Bookmark | `repositories/bookmark.repository.ts` | `getBookmarks`, `isBookmarked`, `toggleBookmark`, `removeBookmark` |
| Like | `repositories/like.repository.ts` | `getLikeCount`, `isLiked`, `toggleLike`, `getLikes` |
| Notification | `repositories/notification.repository.ts` | `getNotifications`, `getUnreadCount`, `markAsRead`, `markAllAsRead` |

---

## Service Layer

| Service | File | Functions |
|---------|------|-----------|
| Post | `services/post.service.ts` | `fetchPosts`, `fetchPost`, `addPost`, `editPost`, `removePost`, `increasePostViews` |
| Category | `services/category.service.ts` | `fetchCategories` |
| Comment | `services/comment.service.ts` | `fetchComments`, `addComment`, `editComment`, `removeComment`, `fetchReplies`, `addReply` |
| Bookmark | `services/bookmark.service.ts` | `fetchBookmarks`, `checkBookmark`, `toggleUserBookmark`, `deleteBookmark` |
| Like | `services/like.service.ts` | `fetchLikes`, `fetchLikeCount`, `checkLike`, `toggleUserLike` |
| Notification | `services/notification.service.ts` | `fetchNotifications`, `fetchUnreadCount`, `markNotificationAsRead`, `markAllNotificationsAsRead` |

---

## Components

### Auth
- `LoginForm.tsx` - Login form
- `RegisterForm.tsx` - Register form
- `ForgotPasswordForm.tsx` - Forgot password form
- `ResetPasswordForm.tsx` - Reset password form

### Layout
- `AppHeader.tsx` - Top navigation with notification badge
- `AppSidebar.tsx` - Desktop sidebar
- `MobileNav.tsx` - Mobile navigation drawer
- `UserMenu.tsx` - User dropdown menu
- `MainLayout.tsx` - Main app layout

### Profile
- `ProfileCard.tsx` - Profile display
- `EditProfileForm.tsx` - Edit profile form
- `AvatarUpload.tsx` - Avatar upload with preview
- `ProfileStats.tsx` - Profile statistics

### Post
- `PostCard.tsx` - Post list card with like/bookmark buttons
- `PostList.tsx` - Post list container
- `PostDetail.tsx` - Post detail view with like/bookmark actions
- `PostForm.tsx` - Create/edit post form
- `PostSearch.tsx` - Search input
- `PostSort.tsx` - Sort dropdown
- `PostEmptyState.tsx` - Empty state
- `PostSkeleton.tsx` - Loading skeleton
- `PostDetailSkeleton.tsx` - Detail loading skeleton
- `DeletePostButton.tsx` - Delete with confirmation
- `Pagination.tsx` - Pagination controls

### Comment
- `CommentCard.tsx` - Comment display
- `CommentList.tsx` - Comment list
- `CommentForm.tsx` - Create comment form
- `EditCommentForm.tsx` - Edit comment form
- `DeleteCommentButton.tsx` - Delete with confirmation
- `CommentEmptyState.tsx` - Empty state
- `CommentSkeleton.tsx` - Loading skeleton
- `ReplyCard.tsx` - Reply display
- `ReplyList.tsx` - Reply list
- `ReplyForm.tsx` - Reply form

### Category
- `CategoryCard.tsx` - Category card
- `CategoryList.tsx` - Category list
- `CategoryForm.tsx` - Create/edit category form
- `CategoryFilter.tsx` - Search input
- `CategoryFilterButtons.tsx` - Category filter buttons
- `CategoryEmptyState.tsx` - Empty state
- `CategoryListSkeleton.tsx` - Loading skeleton

### Bookmark
- `BookmarkButton.tsx` - Toggle bookmark button
- `BookmarkCard.tsx` - Bookmark post card
- `BookmarkList.tsx` - Bookmark list container
- `BookmarkSkeleton.tsx` - Loading skeleton
- `BookmarkEmptyState.tsx` - Empty state

### Like
- `LikeButton.tsx` - Toggle like button with count

### Notification
- `NotificationCard.tsx` - Notification display
- `NotificationList.tsx` - Notification list container
- `NotificationSkeleton.tsx` - Loading skeleton
- `NotificationEmptyState.tsx` - Empty state

### UI (Shadcn)
- `button.tsx`, `input.tsx`, `textarea.tsx`, `card.tsx`, `avatar.tsx`, `badge.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `select.tsx`, `skeleton.tsx`

---

## Technical Decisions

### Architecture
- **Repository Pattern**: Clean separation of Supabase queries
- **Service Layer**: Business logic between repository and hooks
- **React Query**: Server state management with caching
- **URL as State**: Search params as single source of truth

### Form Handling
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **Server Actions**: Auth operations

### Authentication
- **Supabase Auth**: JWT-based authentication
- **Middleware**: Route protection
- **Session Provider**: Client-side session state
- **app_metadata**: Admin role check (not user_metadata)

### UI/UX
- **Debounced Search**: 500ms delay to reduce requests
- **Skeleton Loading**: Better perceived performance
- **Toast Notifications**: Sonner for feedback
- **Responsive Design**: Mobile-first approach
- **Optimistic Updates**: Like & bookmark toggles

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Validation Status

| Command | Status |
|---------|--------|
| `npm run lint` | ✅ PASS (1 warning - React Hook Form compatibility) |
| `npm run typecheck` | ✅ PASS |
| `npm run build` | ✅ PASS (21 routes) |

---

## Technical Debt

| Item | Priority | Notes |
|------|----------|-------|
| Tests | High | No unit/integration tests yet |
| Comments pagination | Low | No pagination for comments yet |

---

## Known Issues

| Issue | Severity | Notes |
|-------|----------|-------|
| React Hook Form `watch()` warning | Low | Library compatibility with React Compiler |
| Middleware deprecation | Low | Next.js 16 recommends "proxy" convention |

---

## Next Sprint - Sprint 10: Deployment

Ketika project dibuka kembali:

1. **Verify environment**: Pastikan `.env.local` sudah terisi dengan benar
2. **Install dependencies**: `npm install`
3. **Run SQL migrations**: Execute all SQL files di Supabase Dashboard
   - `sql/posts-indexes.sql`
   - `sql/posts-rls.sql`
   - `sql/comments-table.sql`
   - `sql/comments-indexes.sql`
   - `sql/comments-rls.sql`
   - `sql/bookmarks-table.sql`
   - `sql/bookmarks-indexes.sql`
   - `sql/bookmarks-rls.sql`
   - `sql/likes-table.sql`
   - `sql/likes-indexes.sql`
   - `sql/likes-rls.sql`
   - `sql/notifications-table.sql`
   - `sql/notifications-indexes.sql`
   - `sql/notifications-rls.sql`
   - `sql/increment-post-views.sql`
   - `sql/comment-count-trigger.sql`
4. **Start dev server**: `npm run dev`
5. **Continue Sprint 10**: Deployment setup

---

## Quick Reference

### Key Files
- **Types**: `types/post.ts`, `types/comment.ts`, `types/bookmark.ts`, `types/like.ts`, `types/notification.ts`, `types/index.ts`
- **Constants**: `lib/constants/query-keys.ts`, `lib/constants/routes.ts`
- **Supabase**: `lib/supabase/client.ts`, `lib/supabase/server.ts`
- **Middleware**: `lib/supabase/middleware.ts`, `middleware.ts`

### Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript check
```

---

*Document generated: Sprint 9.5 Complete*
*Last updated: July 2026*
