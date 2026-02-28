

# Enable Full Authentication with Role-Based Access

## Overview
Re-enable user signup, enforce admin-only post management, and ensure proper role separation between admin, normal users, and guests.

## Current Issues
- Signup is disabled (login-only page)
- Any logged-in user can create posts (should be admin-only)
- Any post owner can edit/delete their posts (should be admin-only)
- RLS policies allow any authenticated user to INSERT posts

## Changes

### 1. Auth Page (`src/pages/Auth.tsx`)
- Add login/signup toggle back
- Signup uses `supabase.auth.signUp()` with email confirmation
- After signup, show message: "Check your email to verify your account"
- Login remains as-is with `signInWithPassword`

### 2. Database Migration -- Restrict Post Management to Admin
Update RLS policies on `posts` table:
- **INSERT**: Change from `auth.uid() = user_id` to `has_role(auth.uid(), 'admin')`
- **UPDATE**: Change from `(auth.uid() = user_id) OR has_role(...)` to `has_role(auth.uid(), 'admin')`
- **DELETE**: Change from `(auth.uid() = user_id) OR has_role(...)` to `has_role(auth.uid(), 'admin')`
- **SELECT**: Keep as-is (public read)

### 3. Posts Dashboard (`src/pages/Posts.tsx`)
- Show "New Post" button only for admin (currently shows for all logged-in users)
- Change `canManagePost` to only return true for admin users
- Show "Sign Out" for all logged-in users (admin and normal)
- Keep "Login to interact" for guests

### 4. CreatePost Page (`src/pages/CreatePost.tsx`)
- Add admin role check after session check
- If user is not admin, redirect to `/posts` with an error toast

### 5. EditPost Page (`src/pages/EditPost.tsx`)
- Simplify authorization: only admin can edit (remove owner check)
- Redirect non-admin users to `/posts`

### 6. PostDetail Page (`src/pages/PostDetail.tsx`)
- Already correct: status dropdown is admin-only
- Chat input shows for any logged-in user (correct behavior)
- No changes needed

### 7. PostChat Component (`src/components/blog/PostChat.tsx`)
- Already correct: shows input for logged-in users, "Log in" prompt for guests
- No changes needed

## Summary of Permission Matrix

```text
+---------------------+-------+-------------+-------+
| Action              | Admin | Normal User | Guest |
+---------------------+-------+-------------+-------+
| View posts          |  Yes  |     Yes     |  Yes  |
| Read post detail    |  Yes  |     Yes     |  Yes  |
| AI summary          |  Yes  |     Yes     |  Yes  |
| Chat (send message) |  Yes  |     Yes     |  No   |
| Create post         |  Yes  |     No      |  No   |
| Edit/Delete post    |  Yes  |     No      |  No   |
| Change post status  |  Yes  |     No      |  No   |
| Moderate chat       |  Yes  |     No      |  No   |
| Sign up             |  --   |     Yes     |  --   |
+---------------------+-------+-------------+-------+
```

## Files Modified
- `src/pages/Auth.tsx` -- Add signup flow
- `src/pages/Posts.tsx` -- Admin-only "New Post" button
- `src/pages/CreatePost.tsx` -- Admin guard
- `src/pages/EditPost.tsx` -- Admin-only guard
- Database migration -- Restrict posts INSERT/UPDATE/DELETE to admin role

