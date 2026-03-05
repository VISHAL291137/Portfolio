-- Fix user_roles policies to target authenticated role only
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;

CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update roles"
ON public.user_roles FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix posts anonymous access warnings - restrict write policies to authenticated
DROP POLICY IF EXISTS "Anyone can view posts" ON public.posts;
DROP POLICY IF EXISTS "Only admins can create posts" ON public.posts;
DROP POLICY IF EXISTS "Only admins can update posts" ON public.posts;
DROP POLICY IF EXISTS "Only admins can delete posts" ON public.posts;

CREATE POLICY "Anyone can view posts"
ON public.posts FOR SELECT
TO anon, authenticated
USING (true);

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

-- Fix post_chat_messages anonymous access warnings
DROP POLICY IF EXISTS "Anyone can read chat messages" ON public.post_chat_messages;
DROP POLICY IF EXISTS "Authenticated users can insert own messages" ON public.post_chat_messages;
DROP POLICY IF EXISTS "Users can delete own messages or admin" ON public.post_chat_messages;
DROP POLICY IF EXISTS "Users can update own messages or admin" ON public.post_chat_messages;

CREATE POLICY "Anyone can read chat messages"
ON public.post_chat_messages FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Authenticated users can insert own messages"
ON public.post_chat_messages FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own messages or admin"
ON public.post_chat_messages FOR DELETE
TO authenticated
USING ((auth.uid() = user_id) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can update own messages or admin"
ON public.post_chat_messages FOR UPDATE
TO authenticated
USING ((auth.uid() = user_id) OR has_role(auth.uid(), 'admin'::app_role));