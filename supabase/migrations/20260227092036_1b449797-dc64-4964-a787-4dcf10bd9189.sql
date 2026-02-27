INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'vishal291137@gmail.com'
ON CONFLICT DO NOTHING;