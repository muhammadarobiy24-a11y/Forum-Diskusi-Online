# Forum Diskusi Online - System Architecture

## Project Information

| Item               | Value                                     |
| ------------------ | ----------------------------------------- |
| Project Name       | Forum Diskusi Online                      |
| Architecture Style | Clean Architecture + Layered Architecture |
| Frontend           | Next.js 15 (App Router)                   |
| Backend            | Next.js Server Actions                    |
| Database           | Supabase PostgreSQL                       |
| Authentication     | Supabase Auth                             |
| Realtime           | Supabase Realtime                         |
| Storage            | Supabase Storage                          |
| Deployment         | Vercel                                    |

---

# System Overview

```text id="s5h8d2"
Browser
   ↓
Next.js App Router
   ↓
Server Actions
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

```text id="p7f4k9"
┌─────────────────┐
│     Browser     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Next.js Frontend│
│ App Router      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Server Actions  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
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

```text id="f2m8x1"
Pages
 ↓
Layouts
 ↓
Components
 ↓
Hooks
 ↓
Server Actions
```

---

# Backend Architecture

```text id="v8k2c5"
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

```text id="n4q7w3"
app/
 ↓
components/
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

```text id="d6k9m1"
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
Redirect to Home
```

---

## Register Flow

```text id="r5j8p2"
Register
 ↓
Supabase Auth Signup
 ↓
Create Profile
 ↓
Email Verification
 ↓
Login
```

---

# Authorization Architecture (RBAC)

```text id="c3n6v8"
Member
 ├── Create Post
 ├── Comment
 └── Bookmark

Moderator
 ├── Delete Reported Content
 └── Manage Reports

Admin
 ├── Manage Users
 ├── Manage Categories
 └── Full Access
```

---

# Post Management Flow

## Create Post

```text id="q1z4l7"
Post Form
 ↓
Zod Validation
 ↓
Server Action
 ↓
Service Layer
 ↓
Repository Layer
 ↓
Supabase Database
 ↓
Revalidate Path
```

---

## Edit Post

```text id="e7r2f5"
Edit Form
 ↓
Validation
 ↓
Update Database
 ↓
Refresh Cache
```

---

## Delete Post

```text id="t8m3k1"
Delete Button
 ↓
Permission Check
 ↓
Delete Database
 ↓
Revalidate Feed
```

---

# Comment Architecture

## Create Comment

```text id="y2p6n4"
Comment Form
 ↓
Validation
 ↓
Insert Comment
 ↓
Create Notification
 ↓
Realtime Update
```

---

## Reply Comment

```text id="g4w8c9"
Comment
 ↓
parent_id
 ↓
Nested Comment
```

---

# Search Architecture

```text id="a9x5m2"
Search Input
 ↓
Debounce
 ↓
Server Action
 ↓
Supabase Query
 ↓
Result
```

---

# Category Architecture

```text id="h7q3f1"
Category Click
 ↓
Filter Posts
 ↓
Query Database
 ↓
Render Feed
```

---

# Notification Architecture

```text id="u5k1d8"
New Comment
New Reply
New Like
 ↓
Insert Notification
 ↓
Supabase Realtime
 ↓
Client Subscription
 ↓
Notification UI Update
```

---

# Bookmark Architecture

```text id="b6n9p3"
Bookmark Button
 ↓
Toggle Bookmark
 ↓
Update Database
 ↓
Refresh UI
```

---

# Like Architecture

```text id="m8r2x6"
Like Button
 ↓
Toggle Like
 ↓
Update Counter
 ↓
Refresh UI
```

---

# Avatar Upload Architecture

```text id="z3f7k4"
Upload Image
 ↓
Supabase Storage
 ↓
Public URL
 ↓
Save URL to Database
```

---

# Moderation Architecture

```text id="w1m5q8"
Report Content
 ↓
Create Report
 ↓
Moderator Review
 ↓
Action
 ├── Ignore
 ├── Delete Comment
 └── Delete Post
```

---

# Error Handling Architecture

```text id="l4t8y1"
Try Catch
 ↓
Service Error
 ↓
Custom Error Message
 ↓
Toast Notification
```

---

# Caching Strategy

```text id="k7n2v9"
Server Components
 ↓
React Cache
 ↓
Revalidate Path
 ↓
Fresh Data
```

---

# Security Architecture

## Authentication

```text id="d9m6p4"
Supabase Auth
Session Management
Middleware Protection
```

---

## Authorization

```text id="u3q8k5"
Role Based Access Control
Row Level Security
Protected Routes
```

---

## Validation

```text id="x5r1n7"
Zod Validation
Server Validation
Input Sanitization
```

---

# Performance Strategy

```text id="j8p4m2"
Server Components
Dynamic Import
Pagination
Infinite Scroll
Image Optimization
Database Indexing
Caching
```

---

# Deployment Architecture

```text id="c2v7f9"
Vercel
 ↓
Next.js Application
 ↓
Supabase Cloud
 ├── PostgreSQL
 ├── Auth
 ├── Storage
 └── Realtime
```

---

# Complete System Flow

```text id="s6k3p1"
User
 ↓
Browser
 ↓
Next.js App Router
 ↓
Server Actions
 ↓
Service Layer
 ↓
Repository Layer
 ↓
Supabase
 ↓
Response
 ↓
UI Update
```

---

# Architecture Principles

### Clean Architecture

* Separation of Concerns
* Single Responsibility Principle
* Modular Design

### Scalability

* Feature-based structure
* Reusable components
* Extensible database design

### Security

* Authentication
* Authorization
* RLS Policies
* Validation

### Maintainability

* Type Safety
* Consistent folder structure
* Documentation Driven Development

---

# Final Architecture Stack

```text id="r4n8w2"
Presentation Layer
↓
Application Layer
↓
Business Layer
↓
Data Access Layer
↓
Supabase Infrastructure Layer
```


