-- Restrict chat messages to authenticated users only to prevent email exposure
DROP POLICY IF EXISTS "Anyone can read chat messages" ON public.post_chat_messages;

CREATE POLICY "Authenticated users can read chat messages"
ON public.post_chat_messages FOR SELECT
TO authenticated
USING (true);