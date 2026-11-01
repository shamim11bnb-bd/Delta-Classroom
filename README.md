# SA Delta Classroom — Backend

Node.js + Express API for the SA Delta Classroom React/Vite frontend. Uses Supabase Auth to verify access tokens and Supabase PostgreSQL for application data.

## Project layout

```text
server/
  src/
    config/       environment, Supabase client, CORS
    controllers/  HTTP controllers
    middleware/   Auth, roles, errors
    routes/       API routes
    services/     Supabase data access
    validators/   Input validation schemas
    utils/        Shared helpers
  package.json
  .env.example
database/
  setup.sql       Starter schema for a NEW Supabase project
docs/
  API.md
```

## 1. Prepare Supabase

1. Open the correct Supabase project.
2. For a brand-new database, review `database/setup.sql` and run it in **SQL Editor**.
3. If you already have tables/data, do not blindly run the setup script; compare it with your existing schema first and take a backup.
4. In Project Settings → API, copy the Project URL and the server-side `service_role`/secret key. Keep the secret private.

The SQL creates the profile trigger, core learning tables, indexes and a restricted profile policy. New registrations are assigned `student` by the trigger. Promote the first administrator manually in SQL Editor, for example:

```sql
update public.profiles
set role = 'admin'
where email = 'YOUR_ADMIN_EMAIL';
```

Do not create a public admin-signup endpoint.

## 2. Run locally

```bash
cd server
npm install
cp .env.example .env
```

Fill `.env`:

```env
NODE_ENV=development
PORT=10000
CLIENT_URL=http://localhost:5173
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SECRET
```

Then run:

```bash
npm run dev
```

Health check: `http://localhost:10000/health`
API root: `http://localhost:10000/`

## 3. Deploy to Render

Create a **Web Service** connected to the GitHub repository:

- Root Directory: `server`
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Node version: 20 or newer

Set these Environment Variables in Render:

- `NODE_ENV=production`
- `SUPABASE_URL` = Supabase Project URL
- `SUPABASE_SERVICE_ROLE_KEY` = Supabase service-role/secret key (server only)
- `CLIENT_URL` = deployed frontend origin, e.g. `https://your-frontend.onrender.com`
- `ALLOWED_ORIGINS` = optional comma-separated extra origins
- `PORT` is provided by Render; do not hardcode it there.

Frontend environment variable:

```env
VITE_API_URL=https://YOUR-BACKEND.onrender.com/api
```

The supplied frontend sends the Supabase access token as `Authorization: Bearer <token>` automatically.

## 4. API routes

All application routes are under `/api` and require a valid Supabase access token, except `/`, `/health`.

- `GET /api/auth/me`
- `GET /api/auth/session`
- `GET /api/users/me`
- `PATCH /api/users/me`
- `GET|POST /api/courses`
- `GET|POST /api/assignments`
- `GET|POST /api/quizzes`
- `GET|POST /api/attendance`
- `GET|POST /api/notices`
- `GET|POST /api/lessons`
- `GET|POST /api/exams`
- `GET|POST /api/submissions`
- `GET|POST /api/enrollments`
- `GET|POST /api/payments` (admin only)
- `GET|POST /api/categories`
- `GET|POST /api/results`
- `GET|POST /api/reports` (admin only)
- `GET|POST /api/settings` (admin only)
- `GET|POST /api/notifications`

Resource routes also support `PATCH /:id`, `PUT /:id`, and `DELETE /:id` (delete is admin-only). List responses use `{ success, data, pagination }`.

## Security notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in Vite variables, browser code, GitHub, or chat.
- The service-role key bypasses Supabase RLS. This API therefore verifies the Supabase JWT and checks the user's database role before accessing protected resources.
- New accounts are students. Only an existing admin should promote teachers/admins.
- Payment routes here are record-management endpoints, not a payment gateway integration. Do not mark a payment paid based only on a browser request; add provider webhook verification before accepting real payments.
- File upload/storage policies and advanced quiz auto-grading should be added with the matching product workflow before production use.

## Compatibility note

This backend is aligned to the frontend API client in the companion `SA-Delta-Classroom-Frontend.zip` (`VITE_API_URL` points to this service and the client attaches the Supabase access token). The UI currently includes placeholder/workspace screens for several advanced modules; the presence of an API route does not mean every advanced workflow (live exam engine, payment gateway, video streaming, etc.) is implemented end-to-end yet.
