

# Make Blog Public with Guest-Friendly Read-Only Access

## Overview
Currently, all pages (`/posts`, `/posts/:id`) redirect unauthenticated users to `/auth`. This plan removes that gate so guests can browse posts freely, while keeping admin/user actions behind authentication.

## Changes

### 1. Posts Dashboard (`src/pages/Posts.tsx`)
- Remove the redirect to `/auth` when no session exists
- Fetch posts regardless of auth state
- Conditionally show/hide based on login status:
  - **Hide for guests**: "New Post" button, "Sign Out" button, Admin badge, edit/delete icons on cards
  - **Show for guests**: A "Login to interact" link/button in the header
- `canManagePost` returns `false` when user is null

### 2. Post Detail Page (`src/pages/PostDetail.tsx`)
- Remove the redirect to `/auth` when no session exists
- Load post data regardless of auth state
- **Hide for guests**: Status change dropdown (admin), Chat input box
- **Show for guests**: Read tab (full access), Understand tab (AI summary), Chat tab (read-only view of messages with a "Login to chat" prompt instead of the input)
- Pass `null` user info to PostChat when not logged in

### 3. PostChat Component (`src/components/blog/PostChat.tsx`)
- Make `userId` and `userEmail` optional (allow `null`)
- When user is not logged in:
  - Still fetch and display existing messages (read-only)
  - Replace the input area with a "Login to join the conversation" message
  - Hide delete buttons on all messages
- Keep real-time subscription active for guests (view-only)

### 4. PostCard Component (`src/components/blog/PostCard.tsx`)
- No structural changes needed; already controlled by `canManage` prop

### 5. CreatePost & EditPost Pages
- Keep existing auth redirects (these are admin-only actions, correctly gated)

### 6. Backend Protection
- Already in place: RLS policies require `auth.uid()` for INSERT, UPDATE, DELETE on both `posts` and `post_chat_messages` tables
- SELECT policies allow authenticated users (posts has `true` for SELECT which works for anon too since the anon key is used)
- **Note**: The posts SELECT RLS policy uses `RESTRICTIVE` with `true` -- need to verify this works for anonymous access. If not, a migration will update it to a `PERMISSIVE` policy.

## Technical Details

### Auth State Pattern
Replace hard redirects with optional auth:
```typescript
// Before
if (!session) { navigate("/auth"); return; }

// After  
if (session) {
  setUser(session.user);
  // fetch roles...
}
// Always fetch posts
fetchPosts();
```

### Guest UI Indicators
- Header shows "Login" button instead of "Sign Out" when not authenticated
- Chat area shows a subtle prompt: "Log in to join the conversation"
- No admin controls visible to guests

### Files Modified (4)
- `src/pages/Posts.tsx` -- Remove auth gate, conditional UI
- `src/pages/PostDetail.tsx` -- Remove auth gate, conditional admin/chat controls
- `src/components/blog/PostChat.tsx` -- Optional auth, read-only mode for guests
- Possible migration if SELECT RLS policy blocks anonymous reads

