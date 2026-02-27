
-- 1. Create post_status enum
CREATE TYPE public.post_status AS ENUM ('open', 'in_progress', 'completed');

-- 2. Add status column to posts
ALTER TABLE public.posts ADD COLUMN status public.post_status NOT NULL DEFAULT 'open';

-- 3. Create chat messages table
CREATE TABLE public.post_chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  is_deleted boolean NOT NULL DEFAULT false
);

-- 4. Enable RLS
ALTER TABLE public.post_chat_messages ENABLE ROW LEVEL SECURITY;

-- 5. RLS policies for chat messages
CREATE POLICY "Authenticated users can read chat messages"
  ON public.post_chat_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert own messages"
  ON public.post_chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own messages or admin"
  ON public.post_chat_messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete own messages or admin"
  ON public.post_chat_messages FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- 6. Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.post_chat_messages;
