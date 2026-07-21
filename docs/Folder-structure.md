📦 online-forum
┣ 📂 app
┃ ┣ 📂 (auth)
┃ ┃ ┣ 📂 forgot-password
┃ ┃ ┣ 📂 login
┃ ┃ ┣ 📂 register
┃ ┃ ┗ 📂 reset-password
┃ ┣ 📂 (main)
┃ ┃ ┣ 📜 page.tsx                       # Home Feed (Reddit-like)
┃ ┃ ┣ 📂 bookmarks                      # Saved Posts
┃ ┃ ┃ ┣ 📜 page.tsx
┃ ┃ ┃ ┣ 📜 loading.tsx
┃ ┃ ┃ ┗ 📜 error.tsx
┃ ┃ ┣ 📂 communities                    # Community List (populer)
┃ ┃ ┃ ┣ 📜 page.tsx
┃ ┃ ┃ ┣ 📜 loading.tsx
┃ ┃ ┃ ┗ 📂 [slug]
┃ ┃ ┃    ┣ 📜 page.tsx                  # Community Detail + Feed
┃ ┃ ┃    ┣ 📜 loading.tsx
┃ ┃ ┃    ┗ 📂 rules                     # Community Rules page
┃ ┃ ┣ 📂 notifications
┃ ┃ ┃ ┣ 📜 page.tsx
┃ ┃ ┃ ┣ 📜 loading.tsx
┃ ┃ ┃ ┗ 📜 error.tsx
┃ ┃ ┣ 📂 post
┃ ┃ ┃ ┣ 📂 create
┃ ┃ ┃ ┃ ┗ 📜 page.tsx                  # Create Post (pilih komunitas)
┃ ┃ ┃ ┣ 📂 [id]
┃ ┃ ┃ ┃ ┣ 📜 page.tsx                  # Post Detail
┃ ┃ ┃ ┃ ┗ 📂 edit
┃ ┃ ┃ ┃   ┗ 📜 page.tsx
┃ ┃ ┃ ┣ 📜 page.tsx                    # All Posts
┃ ┃ ┃ ┣ 📜 loading.tsx
┃ ┃ ┃ ┗ 📜 error.tsx
┃ ┃ ┣ 📂 profile
┃ ┃ ┃ ┣ 📜 page.tsx                    # User Profile (karma, cake day)
┃ ┃ ┃ ┗ 📂 edit
┃ ┃ ┃   ┗ 📜 page.tsx
┃ ┃ ┗ 📂 settings
┃ ┣ 📂 admin
┃ ┃ ┣ 📜 layout.tsx
┃ ┃ ┣ 📜 page.tsx                      # Admin Dashboard
┃ ┃ ┣ 📂 communities
┃ ┃ ┃ ┣ 📜 page.tsx                    # Manage Communities
┃ ┃ ┃ ┣ 📂 create
┃ ┃ ┃ ┗ 📂 [slug]
┃ ┃ ┃   ┗ 📂 edit
┃ ┃ ┗ 📂 users
┃ ┃    ┗ 📜 page.tsx                    # Manage Users
┃ ┣ 📂 actions
┃ ┃ ┗ 📂 auth
┃ ┃    ┣ 📜 login.ts
┃ ┃    ┣ 📜 register.ts
┃ ┃    ┣ 📜 logout.ts
┃ ┃    ┣ 📜 forgot-password.ts
┃ ┃    ┗ 📜 reset-password.ts
┃ ┣ 📜 layout.tsx
┃ ┣ 📜 loading.tsx
┃ ┣ 📜 error.tsx
┃ ┗ 📜 not-found.tsx
┣ 📂 components
┃ ┣ 📂 auth
┃ ┃ ┣ 📜 LoginForm.tsx
┃ ┃ ┣ 📜 RegisterForm.tsx
┃ ┃ ┣ 📜 ForgotPasswordForm.tsx
┃ ┃ ┗ 📜 ResetPasswordForm.tsx
┃ ┣ 📂 bookmark                        # Saved Posts components
┃ ┃ ┣ 📜 SaveButton.tsx                # (renamed from BookmarkButton)
┃ ┃ ┣ 📜 SavedPostCard.tsx
┃ ┃ ┣ 📜 SavedPostList.tsx
┃ ┃ ┣ 📜 SavedPostSkeleton.tsx
┃ ┃ ┣ 📜 SavedPostEmptyState.tsx
┃ ┃ ┗ 📜 FolderManager.tsx             # Folder management
┃ ┣ 📂 community                       # Community components (NEW)
┃ ┃ ┣ 📜 CommunityCard.tsx
┃ ┃ ┣ 📜 CommunityList.tsx
┃ ┃ ┣ 📜 CommunityHeader.tsx           # Banner + icon + name
┃ ┃ ┣ 📜 CommunitySidebar.tsx          # About, rules, moderators
┃ ┃ ┣ 📜 CommunityRules.tsx
┃ ┃ ┣ 📜 CommunityFlairList.tsx
┃ ┃ ┣ 📜 CommunityMembers.tsx
┃ ┃ ┣ 📜 JoinLeaveButton.tsx
┃ ┃ ┣ 📜 CreateCommunityForm.tsx
┃ ┃ ┣ 📜 CommunitySearch.tsx
┃ ┃ ┣ 📜 PopularCommunities.tsx
┃ ┃ ┣ 📜 CommunitySkeleton.tsx
┃ ┃ ┗ 📜 CommunityEmptyState.tsx
┃ ┣ 📂 comment
┃ ┃ ┣ 📜 CommentCard.tsx
┃ ┃ ┣ 📜 CommentList.tsx
┃ ┃ ┣ 📜 CommentForm.tsx
┃ ┃ ┣ 📜 EditCommentForm.tsx
┃ ┃ ┣ 📜 DeleteCommentButton.tsx
┃ ┃ ┣ 📜 CommentEmptyState.tsx
┃ ┃ ┣ 📜 CommentSkeleton.tsx
┃ ┃ ┣ 📜 ReplyCard.tsx
┃ ┃ ┣ 📜 ReplyList.tsx
┃ ┃ ┗ 📜 ReplyForm.tsx
┃ ┣ 📂 flair                           # Flair components (NEW)
┃ ┃ ┣ 📜 FlairBadge.tsx                # Display flair badge
┃ ┃ ┣ 📜 FlairPicker.tsx               # Select flair when creating post
┃ ┃ ┣ 📜 FlairManager.tsx              # Manage community flairs
┃ ┃ ┗ 📜 FlairFilter.tsx               # Filter by flair
┃ ┣ 📂 feed                            # Feed components (NEW)
┃ ┃ ┣ 📜 HomeFeed.tsx                  # Main feed (logged in / guest)
┃ ┃ ┣ 📜 CommunityFeed.tsx             # Feed per komunitas
┃ ┃ ┣ 📜 FeedSort.tsx                  # Hot/Top/New/Rising tabs
┃ ┃ ┣ 📜 TrendingPosts.tsx
┃ ┃ ┗ 📜 PopularPosts.tsx
┃ ┣ 📂 layout
┃ ┃ ┣ 📜 AppHeader.tsx
┃ ┃ ┣ 📜 AppSidebar.tsx
┃ ┃ ┣ 📜 RedditSidebar.tsx             # Context-aware sidebar (NEW)
┃ ┃ ┣ 📜 MobileNav.tsx
┃ ┃ ┣ 📜 UserMenu.tsx
┃ ┃ ┗ 📜 MainLayout.tsx
┃ ┣ 📂 like                            # Voting components (RENAMED)
┃ ┃ ┣ 📜 VoteButton.tsx                # Upvote + Downvote + score (NEW)
┃ ┃ ┗ 📜 CommentVoteButton.tsx         # Vote on comments (NEW)
┃ ┣ 📂 markdown                        # Markdown editor (NEW)
┃ ┃ ┣ 📜 MarkdownEditor.tsx
┃ ┃ ┣ 📜 MarkdownPreview.tsx
┃ ┃ ┗ 📜 MarkdownToolbar.tsx
┃ ┣ 📂 moderation                      # Moderator tools (NEW)
┃ ┃ ┣ 📜 ModTools.tsx                  # Pin/Lock/Remove actions
┃ ┃ ┣ 📜 ModMenu.tsx                   # Mod dropdown menu
┃ ┃ ┣ 📜 ReportDialog.tsx              # Enhanced report dialog
┃ ┃ ┣ 📜 ReportList.tsx                # Report queue
┃ ┃ ┣ 📜 ManageRules.tsx               # Community rules manager
┃ ┃ ┗ 📜 ManageFlairs.tsx              # Community flair manager
┃ ┣ 📂 notification
┃ ┃ ┣ 📜 NotificationCard.tsx
┃ ┃ ┣ 📜 NotificationList.tsx
┃ ┃ ┣ 📜 NotificationSkeleton.tsx
┃ ┃ ┗ 📜 NotificationEmptyState.tsx
┃ ┣ 📂 post
┃ ┃ ┣ 📜 PostCard.tsx                  # Updated: show community, flair, votes
┃ ┃ ┣ 📜 PostList.tsx
┃ ┃ ┣ 📜 PostDetail.tsx                # Updated: votes, community sidebar
┃ ┃ ┣ 📜 PostForm.tsx                  # Updated: community picker, flair, type
┃ ┃ ┣ 📜 PostSearch.tsx
┃ ┃ ┣ 📜 PostSort.tsx
┃ ┃ ┣ 📜 PostEmptyState.tsx
┃ ┃ ┣ 📜 PostSkeleton.tsx
┃ ┃ ┣ 📜 PostDetailSkeleton.tsx
┃ ┃ ┣ 📜 DeletePostButton.tsx
┃ ┃ ┣ 📜 Pagination.tsx
┃ ┃ ┣ 📜 PinnedBadge.tsx               # (NEW) Pin indicator
┃ ┃ ┣ 📜 LockedBadge.tsx               # (NEW) Lock indicator
┃ ┃ ┗ 📜 PostTypeBadge.tsx             # (NEW) Text/Link/Image badge
┃ ┣ 📂 profile
┃ ┃ ┣ 📜 ProfileCard.tsx               # Updated: karma, cake day
┃ ┃ ┣ 📜 EditProfileForm.tsx
┃ ┃ ┣ 📜 AvatarUpload.tsx
┃ ┃ ┣ 📜 ProfileStats.tsx              # Updated: karma breakdown
┃ ┃ ┣ 📜 KarmaBadge.tsx                # (NEW) Karma display
┃ ┃ ┗ 📜 UserSearch.tsx                # (NEW) Search users
┃ ┣ 📂 providers
┃ ┃ ┣ 📜 QueryProvider.tsx
┃ ┃ ┣ 📜 SessionProvider.tsx
┃ ┃ ┗ 📜 ThemeProvider.tsx
┃ ┣ 📂 sidebar                         # Sidebar components (NEW)
┃ ┃ ┣ 📜 HomeSidebar.tsx               # Trending, popular
┃ ┃ ┣ 📜 CommunityInfoSidebar.tsx      # About, rules, mods
┃ ┃ ┣ 📜 PostSidebar.tsx               # Community info in post detail
┃ ┃ ┗ 📜 SidebarSkeleton.tsx
┃ ┗ 📂 ui
┃ ┃ ┣ 📜 avatar.tsx
┃ ┃ ┣ 📜 badge.tsx
┃ ┃ ┣ 📜 button.tsx
┃ ┃ ┣ 📜 card.tsx
┃ ┃ ┣ 📜 dialog.tsx
┃ ┃ ┣ 📜 dropdown-menu.tsx
┃ ┃ ┣ 📜 input.tsx
┃ ┃ ┣ 📜 select.tsx
┃ ┃ ┣ 📜 skeleton.tsx
┃ ┃ ┣ 📜 textarea.tsx
┃ ┃ ┣ 📜 tabs.tsx                      # (NEW) For feed sort tabs
┃ ┃ ┣ 📜 tooltip.tsx                   # (NEW) For hover info
┃ ┃ ┗ 📜 separator.tsx                 # (NEW) Visual separator
┣ 📂 hooks
┃ ┣ 📜 useBookmarks.ts
┃ ┣ 📜 useBookmarkStatus.ts
┃ ┣ 📜 useComments.ts
┃ ┣ 📜 useCreateComment.ts
┃ ┣ 📜 useCreatePost.ts
┃ ┣ 📜 useCreateReply.ts
┃ ┣ 📜 useDebounce.ts
┃ ┣ 📜 useDeleteComment.ts
┃ ┣ 📜 useDeletePost.ts
┃ ┣ 📜 useMarkNotificationRead.ts
┃ ┣ 📜 useNotifications.ts
┃ ┣ 📜 usePost.ts
┃ ┣ 📜 usePosts.ts
┃ ┣ 📜 useReplies.ts
┃ ┣ 📜 useToggleBookmark.ts
┃ ┣ 📜 useUnreadNotifications.ts
┃ ┣ 📜 useUpdateComment.ts
┃ ┣ 📜 useUpdatePost.ts
┃ ┣ 📜 useCommunities.ts               # (NEW)
┃ ┣ 📜 useCommunity.ts                 # (NEW)
┃ ┣ 📜 useCreateCommunity.ts           # (NEW)
┃ ┣ 📜 useJoinCommunity.ts             # (NEW)
┃ ┣ 📜 useLeaveCommunity.ts            # (NEW)
┃ ┣ 📜 useCommunityMembers.ts          # (NEW)
┃ ┣ 📜 useCommunityRules.ts            # (NEW)
┃ ┣ 📜 useCommunityFlairs.ts           # (NEW)
┃ ┣ 📜 useVote.ts                      # (NEW) replaces useToggleLike
┃ ┣ 📜 useCommentVote.ts               # (NEW)
┃ ┣ 📜 useVoteStatus.ts                # (NEW)
┃ ┣ 📜 useSavePost.ts                  # (NEW) replaces useToggleBookmark
┃ ┣ 📜 useSaveStatus.ts                # (NEW)
┃ ┣ 📜 useSavedPosts.ts                # (NEW)
┃ ┣ 📜 useHomeFeed.ts                  # (NEW)
┃ ┣ 📜 useCommunityFeed.ts             # (NEW)
┃ ┣ 📜 useTrending.ts                  # (NEW)
┃ ┣ 📜 usePopularPosts.ts              # (NEW)
┃ ┣ 📜 usePopularCommunities.ts        # (NEW)
┃ ┣ 📜 useSearch.ts                    # (NEW) unified search
┃ ┣ 📜 useSearchCommunity.ts           # (NEW)
┃ ┣ 📜 useSearchUser.ts                # (NEW)
┃ ┣ 📜 usePinPost.ts                   # (NEW)
┃ ┣ 📜 useLockPost.ts                  # (NEW)
┃ ┣ 📜 useRemovePost.ts                # (NEW)
┃ ┣ 📜 useReports.ts                   # (NEW)
┃ ┣ 📜 useCreateReport.ts              # (NEW)
┃ ┗ 📜 useFlairs.ts                    # (NEW)
┣ 📂 repositories
┃ ┣ 📜 bookmark.repository.ts          # Renamed: save-post.repository.ts
┃ ┣ 📜 category.repository.ts          # Renamed: community.repository.ts
┃ ┣ 📜 comment.repository.ts
┃ ┣ 📜 like.repository.ts              # Renamed: vote.repository.ts
┃ ┣ 📜 notification.repository.ts
┃ ┣ 📜 post.repository.ts              # Updated: community, flair, votes
┃ ┣ 📜 community.repository.ts         # (NEW)
┃ ┣ 📜 community-membership.repository.ts # (NEW)
┃ ┣ 📜 community-rules.repository.ts   # (NEW)
┃ ┣ 📜 community-flairs.repository.ts  # (NEW)
┃ ┣ 📜 report.repository.ts            # (NEW)
┃ ┣ 📜 saved-post.repository.ts        # (NEW)
┃ ┣ 📜 vote.repository.ts              # (NEW)
┃ ┣ 📜 feed.repository.ts              # (NEW) Feed queries
┃ ┣ 📜 search.repository.ts            # (NEW) Search queries
┃ ┗ ┣ 📜 trending.repository.ts        # (NEW)
┣ 📂 services
┃ ┣ 📜 bookmark.service.ts             # Renamed: save-post.service.ts
┃ ┣ 📜 category.service.ts             # Renamed: community.service.ts
┃ ┣ 📜 comment.service.ts
┃ ┣ 📜 like.service.ts                 # Renamed: vote.service.ts
┃ ┣ 📜 notification.service.ts
┃ ┣ 📜 post.service.ts                 # Updated
┃ ┣ 📜 community.service.ts            # (NEW)
┃ ┣ 📜 community-membership.service.ts # (NEW)
┃ ┣ 📜 community-rules.service.ts      # (NEW)
┃ ┣ 📜 community-flairs.service.ts     # (NEW)
┃ ┣ 📜 report.service.ts               # (NEW)
┃ ┣ 📜 saved-post.service.ts           # (NEW)
┃ ┣ 📜 vote.service.ts                 # (NEW)
┃ ┣ 📜 feed.service.ts                 # (NEW)
┃ ┣ 📜 search.service.ts               # (NEW)
┃ ┗ ┣ 📜 trending.service.ts           # (NEW)
┣ 📂 schemas
┃ ┣ 📜 community.schema.ts             # (NEW) replaces category.schema.ts
┃ ┣ 📜 community-rules.schema.ts       # (NEW)
┃ ┣ 📜 community-flairs.schema.ts      # (NEW)
┃ ┣ 📜 login-schema.ts
┃ ┣ 📜 post.schema.ts                  # Updated: community, flair, type
┃ ┣ 📜 register-schema.ts
┃ ┣ 📜 report.schema.ts                # (NEW)
┃ ┣ 📜 comment.schema.ts
┃ ┣ ┣ 📜 forgot-password-schema.ts
┃ ┣ ┣ 📜 reset-password-schema.ts
┃ ┗ ┣ 📜 edit-profile-schema.ts
┣ 📂 types
┃ ┣ 📜 bookmark.ts                     # Renamed: saved-post.ts
┃ ┣ 📜 comment.ts                      # Updated: vote_score
┃ ┣ 📜 index.ts                        # Updated: all types
┃ ┣ 📜 like.ts                         # Renamed: vote.ts
┃ ┣ 📜 notification.ts                 # Updated: new types
┃ ┣ 📜 post.ts                         # Updated: community, flair, votes
┃ ┣ 📜 community.ts                    # (NEW)
┃ ┣ 📜 community-member.ts             # (NEW)
┃ ┣ 📜 community-rule.ts               # (NEW)
┃ ┣ 📜 community-flair.ts              # (NEW)
┃ ┣ 📜 report.ts                       # (NEW)
┃ ┣ 📜 saved-post.ts                   # (NEW)
┃ ┣ 📜 vote.ts                         # (NEW)
┃ ┣ 📜 feed.ts                         # (NEW)
┃ ┣ ┣ 📜 search.ts                     # (NEW)
┃ ┗ ┣ 📜 trending.ts                   # (NEW)
┣ 📂 lib
┃ ┣ 📂 constants
┃ ┃ ┣ 📜 query-keys.ts                 # Updated: all query keys
┃ ┃ ┣ 📜 routes.ts                     # Updated: all routes
┃ ┃ ┣ 📜 roles.ts                      # Updated: community_role
┃ ┃ ┗ 📜 storage.ts                    # Updated: new buckets
┃ ┣ 📂 supabase
┃ ┃ ┣ 📜 client.ts
┃ ┃ ┣ 📜 server.ts
┃ ┃ ┗ 📜 middleware.ts
┃ ┗ 📂 utils
┃ ┃ ┣ 📜 date.ts
┃    ┣ 📜 pagination.ts
┃ ┃ ┣ 📜 slug.ts
┃ ┃ ┣ 📜 karma.ts                      # (NEW) Karma calculation
┃ ┃ ┣ 📜 hot-score.ts                  # (NEW) Hot score algorithm
┃ ┃ ┗ 📜 markdown.ts                   # (NEW) Markdown helpers
┣ 📂 sql
┃ ┣ 📜 communities-table.sql           # (NEW)
┃ ┣ 📜 communities-indexes.sql         # (NEW)
┃ ┣ 📜 communities-rls.sql             # (NEW)
┃ ┣ 📜 community-members-table.sql     # (NEW)
┃ ┣ 📜 community-members-indexes.sql   # (NEW)
┃ ┣ 📜 community-members-rls.sql       # (NEW)
┃ ┣ 📜 community-rules-table.sql       # (NEW)
┃ ┣ 📜 community-rules-indexes.sql     # (NEW)
┃ ┣ 📜 community-rules-rls.sql         # (NEW)
┃ ┣ 📜 community-flairs-table.sql      # (NEW)
┃ ┣ 📜 community-flairs-indexes.sql    # (NEW)
┃ ┣ 📜 community-flairs-rls.sql        # (NEW)
┃ ┣ 📜 posts-table.sql                 # Updated: add community_id, flair_id, vote_score, etc.
┃ ┣ 📜 posts-indexes.sql               # Updated
┃ ┣ 📜 posts-rls.sql                   # Updated
┃ ┣ 📜 comments-table.sql              # Updated: add vote_score
┃ ┣ 📜 comments-indexes.sql            # Updated
┃ ┣ 📜 comments-rls.sql                # Updated
┃ ┣ 📜 votes-table.sql                 # (NEW) replaces likes-table.sql
┃ ┣ 📜 votes-indexes.sql               # (NEW) replaces likes-indexes.sql
┃ ┣ 📜 votes-rls.sql                   # (NEW) replaces likes-rls.sql
┃ ┣ 📜 saved-posts-table.sql           # (NEW) replaces bookmarks-table.sql
┃ ┣ 📜 saved-posts-indexes.sql         # (NEW)
┃ ┣ 📜 saved-posts-rls.sql             # (NEW)
┃ ┣ 📜 notifications-table.sql         # Updated: new types
┃ ┣ 📜 notifications-indexes.sql
┃ ┣ 📜 notifications-rls.sql
┃ ┣ 📜 reports-table.sql               # Updated: community_id, reason
┃ ┣ 📜 reports-indexes.sql             # Updated
┃ ┣ 📜 reports-rls.sql                 # Updated
┃ ┣ 📜 increment-post-views.sql
┃ ┣ 📜 comment-count-trigger.sql
┃ ┣ 📜 vote-score-trigger.sql          # (NEW) Auto-calculate vote_score
┃ ┣ 📜 hot-score-trigger.sql           # (NEW) Auto-calculate hot_score
┃ ┣ 📜 community-counts-trigger.sql    # (NEW) member_count, post_count
┃ ┗ ┣ 📜 karma-trigger.sql             # (NEW) Auto-calculate karma
┣ 📂 docs
┃ ┣ 📜 database-schema.md
┃ ┣ 📜 feature-specification.md
┃ ┣ 📜 Folder-structure.md
┃ ┣ 📜 system-architecture.md
┃ ┣ 📜 sprint-planning.md
┃ ┗ ┣ 📜 rls-policies.md
┗ 📂 tests
   ┣ 📂 unit
   ┣ 📂 integration
   ┗ 📂 e2e
