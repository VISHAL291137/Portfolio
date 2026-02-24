

## Set Up Admin User

### Steps

1. **Create the user account** -- Sign up via the Auth page (`/auth`) with:
   - Email: `vishal291137@gmail.com`
   - Password: `VISHAL@20112002`

2. **Assign admin role** -- Run a database migration to insert the admin role into the `user_roles` table for the newly created user. The SQL will look up the user by email from `auth.users` and insert a row with role `'admin'`.

### Technical Details

**Database migration SQL:**
```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'vishal291137@gmail.com';
```

This approach:
- First signs up the user through the app's existing Auth page (so the account is created properly via Supabase Auth)
- Then assigns the `admin` role via a migration, leveraging the existing `user_roles` table and RBAC system already in place

**Note:** Since email auto-confirm may not be enabled, the signup flow might require email verification first. If that blocks login, I will enable auto-confirm temporarily or handle it during implementation.

