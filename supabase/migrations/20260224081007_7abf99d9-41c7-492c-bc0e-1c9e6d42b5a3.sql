
-- Enforce HTTP/HTTPS-only image URLs
ALTER TABLE public.posts
ADD CONSTRAINT image_url_protocol_check
CHECK (image_url IS NULL OR image_url ~* '^https?://');
