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
| **Tujuan** | Platform forum diskusi dengan posts, comments, replies |

---

## Folder Structure

```
online-forum/
├── app/
│   ├── (auth)/           # Auth pages (login, register, forgot/reset password)
│   ├── (main)/           # Main app pages (posts, categories, profile, etc.)
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
│   ├── category/         # Category components
│   ├── comment/          # Comment & reply components
│   ├── layout/           # Layout components (Header, Sidebar, etc.)
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

---

## Database

### Tables

| Table | Status | Notes |
|-------|--------|-------|
| `profiles` | ✅ Active | User profiles, FK to auth.users |
| `categories` | ✅ Active | Forum categories |
| `posts` | ✅ Active | Forum posts with views |
| `comments` | ✅ Active | Comments + replies (parent_id) |
| `bookmarks` | ⏳ Planned | Sprint 7 |
| `likes` | ⏳ Planned | Sprint 7 |
| `notifications` | ⏳ Planned | Future sprint |

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
- ✅ Profile stats (placeholder)

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
| `/bookmarks` | My bookmarks (placeholder) |
| `/notifications` | Notifications (placeholder) |
| `/settings` | Settings (placeholder) |
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

---

## Repository Layer

| Repository | File | Functions |
|------------|------|-----------|
| Post | `repositories/post.repository.ts` | `createPost`, `updatePost`, `deletePost`, `getPostById`, `getPosts`, `incrementPostViews` |
| Category | `repositories/category.repository.ts` | `getCategories` |
| Comment | `repositories/comment.repository.ts` | `createComment`, `updateComment`, `deleteComment`, `getCommentsByPostId`, `getReplies`, `createReply` |

---

## Service Layer

| Service | File | Functions |
|---------|------|-----------|
| Post | `services/post.service.ts` | `fetchPosts`, `fetchPost`, `addPost`, `editPost`, `removePost`, `increasePostViews` |
| Category | `services/category.service.ts` | `fetchCategories` |
| Comment | `services/comment.service.ts` | `fetchComments`, `addComment`, `editComment`, `removeComment`, `fetchReplies`, `addReply` |

---

## Components

### Auth
- `LoginForm.tsx` - Login form
- `RegisterForm.tsx` - Register form
- `ForgotPasswordForm.tsx` - Forgot password form
- `ResetPasswordForm.tsx` - Reset password form

### Layout
- `AppHeader.tsx` - Top navigation
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
- `PostCard.tsx` - Post list card
- `PostList.tsx` - Post list container
- `PostDetail.tsx` - Post detail view
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

### UI/UX
- **Debounced Search**: 500ms delay to reduce requests
- **Skeleton Loading**: Better perceived performance
- **Toast Notifications**: Sonner for feedback
- **Responsive Design**: Mobile-first approach

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
| Loading states | Medium | Some routes missing loading.tsx |
| Error boundaries | Medium | Some routes missing error.tsx |
| Admin role check | Low | UI-only check, needs server validation |
| Comments pagination | Low | No pagination for comments yet |

---

## Known Issues

| Issue | Severity | Notes |
|-------|----------|-------|
| React Hook Form `watch()` warning | Low | Library compatibility with React Compiler |
| Middleware deprecation | Low | Next.js 16 recommends "proxy" convention |
| Base-UI Select | Low | Custom implementation due to missing component |

---

## Next Sprint - Sprint 7: Bookmarks & Likes

### 7.1 Database & RLS
- Create bookmarks table
- Create likes table
- Add RLS policies
- Add indexes

### 7.2 Bookmark CRUD
- Toggle bookmark on posts
- Remove bookmark
- Bookmarks list page

### 7.3 Likes CRUD
- Toggle like on posts
- Remove like
- Like count display

### 7.4 Counts & UI
- Like count on post card/detail
- Bookmark count on profile
- Visual indicators (filled/unfilled icons)

### 7.5 My Bookmarks Page Enhancement
- Full bookmarks page with posts
- Pagination for bookmarks

---

## Next Action

Ketika project dibuka kembali:

1. **Verify environment**: Pastikan `.env.local` sudah terisi dengan benar
2. **Install dependencies**: `npm install`
3. **Run migrations**: Execute SQL files di Supabase Dashboard
   - `sql/posts-indexes.sql`
   - `sql/posts-rls.sql`
   - `sql/comments-table.sql`
   - `sql/comments-indexes.sql`
   - `sql/comments-rls.sql`
4. **Start dev server**: `npm run dev`
5. **Continue Sprint 7**: Mulai dari 7.1 Database & RLS untuk bookmarks dan likes

---

## Quick Reference

### Key Files
- **Types**: `types/post.ts`, `types/comment.ts`, `types/index.ts`
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

*Document generated: Sprint 6.6 Complete*
*Last updated: July 2026*
