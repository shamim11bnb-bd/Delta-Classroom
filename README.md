# SA Delta Classroom

Full-stack learning-platform starter built with Next.js/React, Node.js/Express, TypeScript and Supabase PostgreSQL/Auth. Bengali-first interface.

## Project layout
- `client/` — Next.js App Router frontend
- `server/` — Express REST API; Supabase service-role key is used only here
- `supabase/migrations/001_initial_schema.sql` — database schema, triggers, indexes and row-level security policies
- `uploads/` — placeholders only; production media should use Supabase Storage

## Local setup
1. Create a Supabase project.
2. Run `supabase/migrations/001_initial_schema.sql` once in Supabase SQL Editor.
3. In Supabase Auth settings, configure email confirmation and the redirect URL used by your app.
4. Copy `server/.env.example` to `server/.env` and fill in the project URL, anon key and service-role key.
5. Run the API: `cd server && npm install && npm run dev`.
6. Copy `client/.env.example` to `client/.env.local`, then run `cd client && npm install && npm run dev`.
7. Open `http://localhost:3000`; API health check: `http://localhost:5000/api/health`.

## Render deployment
Deploy two Web Services from the same repository:

**Frontend** — Root Directory `client`; Build `npm install && npm run build`; Start `npm run start`; set `NEXT_PUBLIC_API_URL=https://YOUR-API.onrender.com/api`.

**Backend** — Root Directory `server`; Build `npm install && npm run build`; Start `npm start`; set `PORT` (Render supplies it), `NODE_ENV=production`, `CLIENT_ORIGIN=https://YOUR-FRONTEND.onrender.com`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `PASSWORD_RESET_REDIRECT_URL=https://YOUR-FRONTEND.onrender.com/reset-password`.

Never put `SUPABASE_SERVICE_ROLE_KEY` in frontend variables or commit real `.env` files. Add the frontend URL to Supabase Auth's allowed redirect URLs.

## First admin account
Register normally, then run this manually in Supabase SQL Editor after confirming the email:

```sql
update public.profiles set role = 'admin' where email = 'your-admin-email@example.com';
```

The SQL trigger blocks users from changing their own role or active flag. The question-bank RLS policy also prevents ordinary users from reading answer keys directly.

## Implemented API
- `GET /api/health`
- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `POST /api/auth/forgot-password`
- `GET /api/courses`, `GET /api/courses/:id`, admin-only course create/update/delete
- `GET /api/student/courses`, `POST /api/student/courses/:courseId/enroll`
- `GET /api/notices`
- `GET /api/admin/stats`, `GET /api/admin/users`

## Important scope note
This is a deployable starter, not a finished commercial LMS. The database includes exams, attempts, answers, payments, question bank, banners and reset-request tables, but dedicated exam-taking/grading, payment gateway, upload, OTP verification, result PDF and full admin CRUD workflows are not implemented yet. Several frontend routes are currently UI scaffolds/demo screens. Configure real Supabase credentials and test in a staging project before production.
