

# Blog Dashboard Enhancement Plan

## Overview
Transform the existing blog system into a full-featured dashboard with read/understand modes, real-time chat, workflow status tracking, and a modern UI.

## Database Changes

### 1. Add workflow status to posts
Add a `status` column to the `posts` table using a new enum type (`post_status`: `open`, `in_progress`, `completed`), defaulting to `open`.

### 2. Create chat messages table
New `post_chat_messages` table:
- `id` (uuid, PK)
- `post_id` (uuid, FK to posts)
- `user_id` (uuid, not null)
- `user_email` (text, for display)
- `content` (text)
- `created_at` (timestamptz)
- `is_deleted` (boolean, default false) -- for moderation soft-delete

RLS policies:
- SELECT: anyone authenticated can read
- INSERT: authenticated users can insert their own messages
- UPDATE/DELETE: own messages or admin

Enable realtime on this table.

### 3. AI Summary Edge Function
Create `supabase/functions/summarize-post/index.ts` that uses Lovable AI (Gemini Flash) to generate a simplified summary of a post's content.

## New Routes and Pages

### `/posts/:id` -- Post Detail Page
A dedicated page with three tabs:
- **Read** -- Distraction-free view of the full post (no admin controls, clean typography)
- **Understand** -- AI-generated summary/simplified version (fetched on demand via edge function)
- **Chat** -- Real-time discussion thread under the post

### Updated `/posts` -- Blog Dashboard
Redesigned card grid with:
- Rounded cards, soft shadows, minimal design
- Status badge on each card (Blue=Open, Orange=In Progress, Green=Completed)
- Admin badge visible for admin users
- Date and excerpt preview
- Click card to navigate to `/posts/:id`

## Component Architecture

### New Components
- `src/components/blog/PostCard.tsx` -- Card with title, date, excerpt, status badge
- `src/components/blog/PostReader.tsx` -- Clean read-mode view
- `src/components/blog/PostSummary.tsx` -- AI summary with loading state
- `src/components/blog/PostChat.tsx` -- Real-time chat with message list and input
- `src/components/blog/StatusBadge.tsx` -- Color-coded status badge component
- `src/components/blog/ChatMessage.tsx` -- Individual chat message bubble

### Updated Pages
- `src/pages/Posts.tsx` -- Redesigned dashboard with new card components
- `src/pages/PostDetail.tsx` -- New page with Read/Understand/Chat tabs

### Updated Routing
Add `/posts/:id` route in `App.tsx`.

## Admin Features
- Status dropdown on PostDetail page (admin only) to change post workflow status
- Delete button on chat messages (admin can moderate any, users can delete own)
- All existing admin capabilities (create, edit, delete posts) preserved

## Real-time Updates
- Chat messages stream in real-time via Supabase Realtime subscriptions
- Status changes reflect immediately for all viewers

## Technical Details

### Status Badge Colors
```text
+------------+--------+
| Status     | Color  |
+------------+--------+
| Open       | Blue   |
| In Progress| Orange |
| Completed  | Green  |
+------------+--------+
```

### Edge Function: summarize-post
- Receives `{ postId, content }` in body
- Calls Lovable AI Gateway with system prompt for concise summary
- Returns `{ summary: string }`
- Config: `verify_jwt = false` (validates auth in code)

### File Changes Summary
- **New files (8):** PostCard, PostReader, PostSummary, PostChat, StatusBadge, ChatMessage components + PostDetail page + summarize-post edge function
- **Modified files (3):** App.tsx (new route), Posts.tsx (redesign), config.toml (edge function config)
- **Database migrations (2):** Add status enum/column to posts, create post_chat_messages table with RLS + realtime

## Responsive Design
- Single column on mobile, 2-column grid on desktop for blog cards
- Chat and tabs stack vertically on mobile
- All components use Tailwind responsive utilities

