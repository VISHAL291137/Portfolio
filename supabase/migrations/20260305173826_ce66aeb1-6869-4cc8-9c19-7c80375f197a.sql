-- Drop existing INSERT/UPDATE/DELETE policies on posts
DROP POLICY IF EXISTS "Authenticated users can create posts" ON public.posts;
DROP POLICY IF EXISTS "Users can update own posts or admin can update any" ON public.posts;
DROP POLICY IF EXISTS "Users can delete own posts or admin can delete any" ON public.posts;

-- Recreate with admin-only access
CREATE POLICY "Only admins can create posts"
ON public.posts FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update posts"
ON public.posts FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete posts"
ON public.posts FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));