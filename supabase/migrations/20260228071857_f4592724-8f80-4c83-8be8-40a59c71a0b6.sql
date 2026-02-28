
-- Drop restrictive SELECT policies and recreate as permissive
DROP POLICY IF EXISTS "Anyone can view posts" ON public.posts;
CREATE POLICY "Anyone can view posts"
ON public.posts
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Authenticated users can read chat messages" ON public.post_chat_messages;
CREATE POLICY "Anyone can read chat messages"
ON public.post_chat_messages
FOR SELECT
USING (true);
