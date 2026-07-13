📦 online-forum
┣ 📂 app
┃ ┣ 📂 (auth)
┃ ┃ ┣ 📂 login
┃ ┃ ┗ 📂 register
┃ ┣ 📂 (main)
┃ ┃ ┣ 📜 page.tsx
┃ ┃ ┣ 📂 categories
┃ ┃ ┃ ┗ 📂 [slug]
┃ ┃ ┣ 📂 post
┃ ┃ ┃ ┣ 📂 create
┃ ┃ ┃ ┣ 📂 [id]
┃ ┃ ┃ ┗ 📂 edit
┃ ┃ ┣ 📂 profile
┃ ┃ ┃ ┗ 📂 [username]
┃ ┃ ┣ 📂 bookmarks
┃ ┃ ┣ 📂 notifications
┃ ┃ ┗ 📂 settings
┃ ┣ 📂 admin
┃ ┃ ┣ 📂 users
┃ ┃ ┣ 📂 posts
┃ ┃ ┣ 📂 categories
┃ ┃ ┗ 📂 reports
┃ ┣ 📂 api
┃ ┃ ┗ 📂 webhook
┃ ┣ 📂 actions
┃ ┃ ┣ auth-actions.ts
┃ ┃ ┣ post-actions.ts
┃ ┃ ┣ comment-actions.ts
┃ ┃ ┣ bookmark-actions.ts
┃ ┃ ┣ like-actions.ts
┃ ┃ ┣ notification-actions.ts
┃ ┃ ┗ profile-actions.ts
┃ ┣ 📜 layout.tsx
┃ ┣ 📜 loading.tsx
┃ ┣ 📜 error.tsx
┃ ┗ 📜 not-found.tsx
📦 components
┣ 📂 layout
┃ ┣ Header.tsx
┃ ┣ Sidebar.tsx
┃ ┣ MobileSidebar.tsx
┃ ┗ Footer.tsx
┣ 📂 forum
┃ ┣ PostCard.tsx
┃ ┣ PostForm.tsx
┃ ┣ PostDetail.tsx
┃ ┣ PostEditor.tsx
┃ ┣ CommentList.tsx
┃ ┣ CommentItem.tsx
┃ ┣ CommentForm.tsx
┃ ┣ CategoryCard.tsx
┃ ┣ BookmarkButton.tsx
┃ ┣ LikeButton.tsx
┃ ┗ SearchBar.tsx
┣ 📂 profile
┣ 📂 notifications
┣ 📂 providers
┃ ┣ ThemeProvider.tsx
┃ ┣ QueryProvider.tsx
┃ ┗ SessionProvider.tsx
┗ 📂 ui
📦 lib
┣ 📂 supabase
┃ ┣ client.ts
┃ ┣ server.ts
┃ ┗ middleware.ts
┣ constants.ts
┣ permissions.ts
┣ validations.ts
┣ utils.ts
┣ slug.ts
┗ date.ts
📦 hooks
┣ useAuth.ts
┣ useDebounce.ts
┣ useInfiniteScroll.ts
┣ usePagination.ts
┣ useNotifications.ts
┗ useRealtimePosts.ts
📦 services
┣ auth-service.ts
┣ post-service.ts
┣ comment-service.ts
┣ category-service.ts
┣ notification-service.ts
┣ bookmark-service.ts
┣ user-service.ts
┗ upload-service.ts
📦 repositories
┣ post-repository.ts
┣ comment-repository.ts
┣ category-repository.ts
┣ notification-repository.ts
┗ user-repository.ts
📦 types
┣ database.ts
┣ user.ts
┣ post.ts
┣ comment.ts
┣ category.ts
┣ notification.ts
┗ api.ts
📦 schemas
┣ auth.schema.ts
┣ post.schema.ts
┣ comment.schema.ts
┣ category.schema.ts
┗ profile.schema.ts
📦 middleware
┗ auth.ts
📦 tests
┣ unit
┣ integration
┗ e2e