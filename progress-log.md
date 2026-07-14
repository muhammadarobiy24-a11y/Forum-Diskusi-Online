# Progress Log

## Sprint 0 - Project Setup
- Created missing folders (hooks, repositories, services, schemas, types, tests)
- Created app structure with placeholder pages
- Set up Supabase SSR (client, server, middleware)
- Created providers (QueryProvider, SessionProvider, ThemeProvider)
- Created .env.example

## Sprint 1 - Authentication
- Implemented login, register, logout
- Implemented forgot password, reset password
- Created auth forms with React Hook Form + Zod
- Added session management
- Protected routes via middleware

## Sprint 2 - User Profile & Layout
- Created layout components (AppHeader, AppSidebar, MobileNav, UserMenu, MainLayout)
- Created profile components (ProfileCard, EditProfileForm, AvatarUpload, ProfileStats)
- Implemented profile viewing and editing
- Implemented avatar upload with Supabase Storage

## Sprint 3 - Categories
- Created category components (CategoryCard, CategoryList, CategoryFilter, CategoryForm, CategoryEmptyState)
- Implemented category listing with search
- Implemented admin CRUD for categories
- Added admin layout with navigation

## Sprint 4 Subtask 4.1 - Constants & Utilities Foundation
- Created lib/constants/ (routes, query-keys, storage, roles)
- Created lib/utils/ (slug, date, pagination)
- Refactored CategoryForm to use slugify utility
- Refactored ProfileCard to use formatDate utility

## Sprint 4 Subtask 4.2 - Database Preparation & Posts RLS
- Prepared Posts RLS SQL (sql/posts-rls.sql)
- Prepared Posts indexes SQL (sql/posts-indexes.sql)
- Verified posts foreign keys
- Verified database relationship
- Created security verification table

## Sprint 5 Subtask 5.1 - Comments Database & RLS
- Prepared comments table SQL (sql/comments-table.sql)
- Prepared comments indexes SQL (sql/comments-indexes.sql)
- Prepared comments RLS SQL (sql/comments-rls.sql)
- Verified relationships (posts, profiles, self-referencing)

## Sprint 7 Subtask 7.1 - Bookmarks & Likes Database & RLS
- Prepared bookmarks table SQL (sql/bookmarks-table.sql)
- Prepared bookmarks indexes SQL (sql/bookmarks-indexes.sql)
- Prepared bookmarks RLS SQL (sql/bookmarks-rls.sql)
- Prepared likes table SQL (sql/likes-table.sql)
- Prepared likes indexes SQL (sql/likes-indexes.sql)
- Prepared likes RLS SQL (sql/likes-rls.sql)
- Verified relationships (profiles → bookmarks/likes ← posts)

## Sprint 7 Subtask 7.2 - Bookmark CRUD
- Created bookmark types (types/bookmark.ts)
- Created bookmark repository (repositories/bookmark.repository.ts)
- Created bookmark service (services/bookmark.service.ts)
- Created useBookmarks hook (hooks/useBookmarks.ts)
- Created useToggleBookmark hook (hooks/useToggleBookmark.ts)
- Created BookmarkButton component (components/bookmark/BookmarkButton.tsx)
- Created BookmarkCard component (components/bookmark/BookmarkCard.tsx)
- Created BookmarkList component (components/bookmark/BookmarkList.tsx)
- Created BookmarkSkeleton component (components/bookmark/BookmarkSkeleton.tsx)
- Created BookmarkEmptyState component (components/bookmark/BookmarkEmptyState.tsx)
- Created Bookmarks page (app/(main)/bookmarks/page.tsx)
- Created Bookmarks loading (app/(main)/bookmarks/loading.tsx)
- Created Bookmarks error (app/(main)/bookmarks/error.tsx)
- Updated query-keys.ts with bookmarks and bookmark keys

## Sprint 7 Subtask 7.3 - Likes CRUD
- Created like types (types/like.ts)
- Created like repository (repositories/like.repository.ts)
- Created like service (services/like.service.ts)
- Created useLikeCount hook (hooks/useLikes.ts)
- Created useToggleLike hook (hooks/useToggleLike.ts)
- Created LikeButton component (components/like/LikeButton.tsx)
- Updated query-keys.ts with likes and like keys
- Updated post.ts with like_count field
- Updated post.repository.ts with likes(count) relation
- Updated PostCard with like count display

## Sprint 7 Subtask 7.4 - Counts & UI Enhancement
- Created useBookmarkStatus hook (hooks/useBookmarkStatus.ts)
- Created useLikeStatus hook (hooks/useLikeStatus.ts)
- Updated BookmarkButton with aria-label and prevent event propagation
- Updated LikeButton with aria-label and prevent event propagation
- Updated PostCard with LikeButton and BookmarkButton
- Updated PostDetail with LikeButton and BookmarkButton action section
- Updated BookmarkCard with LikeButton and BookmarkButton
- Added optimistic updates to useToggleLike hook
- Added optimistic updates to useToggleBookmark hook

## Sprint 7 Subtask 7.5 - My Bookmarks Page Enhancement
- Updated bookmark types with search and sort params (types/bookmark.ts)
- Updated bookmark repository with search and sort support (repositories/bookmark.repository.ts)
- Updated useBookmarks hook with search, sort, and placeholderData (hooks/useBookmarks.ts)
- Updated bookmarks page with search, sort, pagination (app/(main)/bookmarks/page.tsx)
- Updated BookmarkCard to show like count from database
- Updated query-keys.ts with bookmarks params support

## Sprint 8 Subtask 8.1 - Notifications Database (MVP)
- Prepared notifications table SQL (sql/notifications-table.sql)
- Prepared notifications indexes SQL (sql/notifications-indexes.sql)
- Prepared notifications RLS SQL (sql/notifications-rls.sql)
- Verified relationships (profiles → notifications, posts → notifications, comments → notifications)

## Sprint 8 Subtask 8.2 - Notification Repository, Service & React Query
- Created notification types (types/notification.ts)
- Created notification repository (repositories/notification.repository.ts)
- Created notification service (services/notification.service.ts)
- Created useNotifications hook (hooks/useNotifications.ts)
- Created useUnreadNotifications hook (hooks/useUnreadNotifications.ts)
- Updated query-keys.ts with notifications and unreadNotifications keys

## Sprint 8 Subtask 8.3 - Notifications Page (MVP)
- Created NotificationCard component (components/notification/NotificationCard.tsx)
- Created NotificationList component (components/notification/NotificationList.tsx)
- Created NotificationSkeleton component (components/notification/NotificationSkeleton.tsx)
- Created NotificationEmptyState component (components/notification/NotificationEmptyState.tsx)
- Created Notifications page (app/(main)/notifications/page.tsx)
- Created Notifications loading (app/(main)/notifications/loading.tsx)
- Created Notifications error (app/(main)/notifications/error.tsx)

## Sprint 8 Subtask 8.4 - Mark Notification as Read
- Created useMarkNotificationRead hook (hooks/useMarkNotificationRead.ts)
- Updated NotificationCard with click handler to mark as read
- Updated NotificationList with onMarkAsRead prop
- Updated Notifications page with "Mark All as Read" button

## Sprint 8 Subtask 8.5 - Notification Badge on Header
- Updated AppHeader with unread notification badge
- Added useUnreadNotifications hook integration
- Added badge with count (99+ max)
- Added Link to /notifications
- Added aria-label for accessibility

## Sprint 9 Subtask 9.1 - UI & UX Audit & Polishing
- Fixed CategoryEmptyState language inconsistency (English → Indonesian)
- Fixed admin/page.tsx role check (user_metadata → app_metadata)
- Fixed Profile page width (max-w-2xl → max-w-4xl) and added header
- Fixed PostDetail "Back to posts" text (English → Indonesian)
- Added page header to Profile page for consistency

## Sprint 9 Subtask 9.2 - Responsive Layout Audit
- Updated PostCard with responsive flex layout (flex-col sm:flex-row)
- Updated BookmarkCard with responsive flex layout (flex-col sm:flex-row)
- Updated PostDetail with responsive title and author info layout
- Updated Pagination with hidden text on mobile (hidden sm:inline)
- Updated admin/categories page with responsive header and list layout
- Fixed admin/categories role check (user_metadata → app_metadata)

## Sprint 9 Subtask 9.3 - Loading, Empty State & Error State Audit
- Updated NotificationList spacing (space-y-3 → space-y-4) for consistency
- Updated NotificationSkeleton spacing (space-y-3 → space-y-4) for consistency
- Updated BookmarkSkeleton default count (3 → 5) for consistency with PostSkeleton

## Sprint 9 Subtask 9.4 - Security & Authorization Audit
- Fixed admin/categories/create/page.tsx role check (user_metadata → app_metadata)
- Fixed admin/categories/[id]/edit/page.tsx role check (user_metadata → app_metadata)
- Verified all repositories use ownership checks
- Verified RLS policies match application implementation

## Sprint 9 Subtask 9.5 - Final QA, Code Cleanup & Production Readiness
- Removed unused hooks/index.ts file
- Verified no console.log or TODO/FIXME in codebase
- Verified all TypeScript types are correct
- Verified production build passes

## Bug Fixes
- BUG-04: Fixed admin role check — changed user_metadata to app_metadata (app/admin/layout.tsx)
- BUG-02: Fixed race condition on view counter — replaced select+update with RPC (repositories/post.repository.ts, sql/increment-post-views.sql)
- BUG-01: Fixed most_commented sort — added comment_count column + trigger, removed post-processing (repositories/post.repository.ts, sql/comment-count-trigger.sql)
