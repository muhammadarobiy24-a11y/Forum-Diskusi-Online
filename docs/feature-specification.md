# Reddit-like Community Discussion Platform - Final Feature Specification

## Project Information

| Item | Value |
|------|-------|
| Project Name | Reddit-like Community Discussion Platform |
| Architecture | Next.js + Supabase |
| Version | MVP 2.0 |
| Last Updated | July 2026 |

---

# User Roles

| Role | Description |
|------|-------------|
| Guest | Visitor yang belum login |
| Member | User terdaftar |
| Community Moderator | Moderator di komunitas tertentu |
| Admin | Administrator global |

---

# Feature Classification

| Kategori | Jumlah | Keterangan |
|----------|--------|------------|
| **Core Features** | 10 | Wajib ada agar aplikasi terasa seperti Reddit |
| **Secondary Features** | 9 | Penting untuk enhancement, bisa ditambah setelah core |
| **Future Features** | 12 | Terlalu kompleks untuk UAS, ditunda ke versi mendatang |

---

# Permissions Matrix

| Feature | Guest | Member | Mod | Admin |
|---------|-------|--------|-----|-------|
| View Home Feed | ✅ | ✅ | ✅ | ✅ |
| View Community | ✅ | ✅ | ✅ | ✅ |
| View Posts | ✅ | ✅ | ✅ | ✅ |
| Create Post | ❌ | ✅ | ✅ | ✅ |
| Edit Own Post | ❌ | ✅ | ✅ | ✅ |
| Delete Own Post | ❌ | ✅ | ✅ | ✅ |
| Vote on Posts | ❌ | ✅ | ✅ | ✅ |
| Vote on Comments | ❌ | ✅ | ✅ | ✅ |
| Comment | ❌ | ✅ | ✅ | ✅ |
| Save Post | ❌ | ✅ | ✅ | ✅ |
| Create Community | ❌ | ✅ | ✅ | ✅ |
| Join Community | ❌ | ✅ | ✅ | ✅ |
| Leave Community | ❌ | ✅ | ✅ | ✅ |
| Pin Post (own community) | ❌ | ❌ | ✅ | ✅ |
| Lock Post (own community) | ❌ | ❌ | ✅ | ✅ |
| Remove Post (community) | ❌ | ❌ | ✅ | ✅ |
| Manage Community Rules | ❌ | ❌ | ✅ | ✅ |
| Manage Community Flairs | ❌ | ❌ | ✅ | ✅ |
| Review Reports (community) | ❌ | ❌ | ✅ | ✅ |
| Manage All Communities | ❌ | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ❌ | ✅ |

---

# Validation Rules

| Entity | Field | Rule |
|--------|-------|------|
| Register | email | required, valid email |
| Register | username | required, min 3, max 20, alphanumeric + underscore |
| Register | password | required, min 8 characters |
| Post | title | required, max 300 characters |
| Post | content | required untuk text post, max 10000 characters |
| Post | community | required |
| Post | link_url | required jika content_type = 'link', valid URL |
| Comment | content | required, max 10000 characters |
| Community | name | required, min 3, max 50, unique |
| Community | slug | required, unique, auto-generated |
| Community | description | optional, max 500 characters |
| Report | reason | required (enum) |
| Report | description | optional, max 500 characters |
| Flair | name | required, max 30 characters |
| Flair | color | required, valid hex color |

---
