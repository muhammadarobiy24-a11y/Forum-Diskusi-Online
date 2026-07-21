# Reddit-like Community Discussion Platform - System Architecture

## Project Information

| Item               | Value                                     |
| ------------------ | ----------------------------------------- |
| Project Name       | Reddit-like Community Discussion Platform |
| Architecture Style | Clean Architecture + Layered Architecture |
| Frontend           | Next.js 16 (App Router)                   |
| Backend            | Next.js Server Actions                    |
| Database           | Supabase PostgreSQL                       |
| Authentication     | Supabase Auth                             |
| Realtime           | Supabase Realtime                         |
| Storage            | Supabase Storage                          |
| Deployment         | Vercel                                    |

---

# System Overview

```text
Browser
   ↓
Next.js App Router
   ↓
Server Actions / React Query
   ↓
Service Layer
   ↓
Repository Layer
   ↓
Supabase
   ├── PostgreSQL
   ├── Auth
   ├── Storage
   └── Realtime
```

---

# High-Level Architecture

```text
┌─────────────────┐
│     Browser     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Next.js Frontend│
│ App Router      │
│ React Query     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Server Actions  │
│ Service Layer   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Repository Layer│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Supabase     │
└─────────────────┘
```

---

# Frontend Architecture

```text
Pages (App Router)
 ↓
Layouts (MainLayout, AuthLayout)
 ↓
Components
 ├── Community
 ├── Post
 ├── Comment
 ├── Vote
 ├── Feed
 ├── Sidebar
 ├── Moderation
 ├── Markdown
 └── UI (Shadcn)
 ↓
Hooks (React Query)
 ↓
Services
 ↓
Repositories
 ↓
Supabase Client
```

---

# Backend Architecture

```text
Server Actions
 ↓
Services
 ↓
Repositories
 ↓
Supabase Database
```

---

# Directory Layer Architecture

```text
app/
 ↓
components/
 ↓
hooks/
 ↓
services/
 ↓
repositories/
 ↓
lib/supabase/
```

---

# Authentication Architecture

## Login Flow

```text
Login Page
 ↓
Server Action
 ↓
Supabase Auth
 ↓
Session Created
 ↓
Middleware Validation
 ↓
Redirect to Home Feed
```

---

## Register Flow

```text
Register
 ↓
Supabase Auth Signup
 ↓
Create Profile (with karma=0, cake_day=current_date)
 ↓
Email Verification
 ↓
Login
```

---

# Authorization Architecture (RBAC)

```text
Member
 ├── Create Post (in joined communities)
 ├── Vote (upvote/downvote)
 ├── Comment
 ├── Save Post
 ├── Create Community
 └── Join/Leave Community

Community Moderator (per community)
 ├── Pin/Unpin Post
 ├── Lock/Unlock Post
 ├── Remove Post/Comment (in own community)
 ├── Manage Community Rules
 ├── Manage Community Flairs
 ├── Manage Community Members
 └── Review Reports (in own community)

Admin
 ├── Manage All Communities
 ├── Manage All Users
 ├── Change User Role
 └── Full Access
```

---

# Community Architecture

```text
Community
 ├── Creator (auto-moderator)
 ├── Members
 ├── Rules
 ├── Flairs
 ├── Posts
 └── Moderators
```

## Community Membership Flow

```text
User
 ↓
Browse Communities
 ↓
Click Join
 ↓
community_members INSERT
 ↓
Update member_count
 ↓
UI Update
```

---

# Feed Architecture

## Home Feed

```text
Logged In?
 ├── YES → Fetch posts from joined communities
 │         Sort by (Hot/Top/New/Rising)
 └── NO  → Fetch global popular posts
           Sort by Hot
```

## Community Feed

```text
Community Slug
 ↓
Fetch community posts
 ↓
Sort by (Hot/Top/New/Rising)
 ↓
Render Feed
```

## Sort Algorithms

### Hot

```text
hot_score = log10(max(|vote_score|, 1)) * sign(vote_score) + hours_since_post / 12
```

### Top

```text
Sort by vote_score DESC
Filter: today / this week / this month / this year / all time
```

### New

```text
Sort by created_at DESC
```

### Rising

```text
Sort by (vote_score / hours_since_post) DESC
Only posts < 24 hours old
```

---

# Voting Architecture

```text
Vote Button
 ↓
Optimistic UI Update
 ↓
Server Action
 ↓
Upsert vote
 ↓
Recalculate vote_score (post/comment)
 ↓
Recalculate hot_score (post)
 ↓
Update karma (voter + author)
 ↓
Notification (if upvote)
```

## Karma Calculation

```text
user karma = SUM(post vote_scores) + SUM(comment vote_scores)
```

---

# Post Architecture

## Create Post Flow

```text
Post Form
 ↓
Select Community
 ↓
Select Flair (optional)
 ↓
Choose Type (Text/Link/Image)
 ↓
Write Content
 ↓
Zod Validation
 ↓
Server Action
 ↓
Insert Post
 ↓
Update post_count (community)
 ↓
Redirect to Post Detail
```

---

# Community Sidebar Architecture

```text
Route Context
 ├── Home Feed
 │   └── HomeSidebar
 │       ├── Trending Communities
 │       ├── Popular Posts
 │       └── Quick Links
 │
 ├── Community Page
 │   └── CommunityInfoSidebar
 │       ├── About Community
 │       ├── Community Rules
 │       ├── Community Moderators
 │       └── Join/Leave Button
 │
 └── Post Detail
     └── PostSidebar
         ├── Community Info
         └── Community Rules
```

---

# Search Architecture

```text
Search Input
 ↓
Select Scope (Posts/Communities/Users)
 ↓
Debounce (500ms)
 ↓
Search Query
 ↓
Repository (Supabase ilike)
 ↓
Results
 ↓
Render
```

---

# Moderation Architecture

```text
Community Moderator
 ↓
Mod Menu (Pin/Lock/Remove)
 ↓
Action Confirmation
 ↓
Update Post/Comment
 ↓
Create Notification
 ↓
UI Update
```

## Report Flow

```text
Report Button
 ↓
Select Reason
 ↓
Add Description (optional)
 ↓
Insert Report
 ↓
Notify Community Moderator
 ↓
Moderator Reviews
 ↓
Action (Resolve/Dismiss/Warn/Remove)
 ↓
Notify Reporter
```

---

# Markdown Editor Architecture

```text
MarkdownEditor
 ├── Toolbar (Bold, Italic, Headers, etc.)
 ├── Textarea
 └── Preview Toggle
     ↓
Markdown Content
 ↓
Render as HTML (safe)
```

---

# Notification Architecture

```text
Event
 ├── Upvote/Downvote
 ├── New Comment
 ├── New Reply
 ├── Mention
 ├── Moderation Action
 └── Community Invite
 ↓
Insert Notification
 ↓
Supabase Realtime
 ↓
Client Subscription
 ↓
Notification UI Update (badge + list)
```

---

# Trending Architecture

```text
Trending Calculation
 ├── Trending Communities
 │   └── member_count growth rate (last 7 days)
 │
 └── Trending Posts
     └── vote_velocity (votes in last 24 hours)
```

---

# Error Handling Architecture

```text
Try Catch
 ↓
Service Error
 ↓
Custom Error Message
 ↓
Toast Notification (Sonner)
```

---

# Caching Strategy

```text
React Query
 ├── Stale Time: 5 minutes
 ├── Cache Time: 30 minutes
 ├── Optimistic Updates (votes, saves)
 └── Placeholder Data (feed transitions)
```

---

# Security Architecture

## Authentication

```text
Supabase Auth
Session Management
Middleware Protection
```

## Authorization

```text
Role Based Access Control (Global: member/moderator/admin)
Community Level Access Control (member/moderator)
Row Level Security (per table)
Protected Routes
```

## Validation

```text
Zod Validation (Client + Server)
Server Validation (Repository Layer)
Input Sanitization
```

---

# Performance Strategy

```text
Server Components (default)
Dynamic Import (heavy components)
Pagination (10 items per page)
Optimistic Updates (votes, saves)
Debounced Search (500ms)
Database Indexing (all foreign keys + sort columns)
Hot Score Pre-calculation (trigger)
Karma Pre-calculation (trigger)
Image Optimization (Next.js Image)
Code Splitting (Route-based)
```

---

# Deployment Architecture

```text
Vercel
 ↓
Next.js Application
 ↓
Supabase Cloud
 ├── PostgreSQL
 ├── Auth
 ├── Storage (avatars, post-images, community-banners)
 └── Realtime
```

---

# Complete System Flow

```text
User
 ↓
Browser
 ↓
Next.js App Router
 ↓
Server Actions / React Query
 ↓
Service Layer
 ↓
Repository Layer
 ↓
Supabase
 ↓
Response
 ↓
UI Update (Optimistic + Refetch)
```

---

# Architecture Principles

### Clean Architecture

* Separation of Concerns
* Single Responsibility Principle
* Modular Design
* Repository Pattern

### Feature-Based Structure

* Community feature (all related files grouped)
* Post feature
* Vote feature
* Feed feature
* Moderation feature

### Scalability

* Hot Score pre-calculation
* Karma pre-calculation
* Database indexing
* Pagination
* Feed algorithms

### Production Ready

* Type Safety (TypeScript)
* Validation (Zod)
* Error Handling
* Security (RLS, RBAC)
* Performance (caching, indexing)
* Documentation

---

# Final Architecture Stack

```text
Presentation Layer (UI Components)
↓
State Management Layer (React Query)
↓
Application Layer (Server Actions + Hooks)
↓
Business Layer (Services)
↓
Data Access Layer (Repositories)
↓
Infrastructure Layer (Supabase)
```
