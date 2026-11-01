# SA Delta Classroom API

```bash
cd server
npm install
cp .env.example .env
# Fill in Supabase URL, anon key, service-role key and allowed frontend origin
npm run dev
```

Health: `GET /api/health`. Production build: `npm run build`; start: `npm start`.

Render root: `server`; build command: `npm install && npm run build`; start command: `npm start`.

Required variables: `PORT`, `NODE_ENV`, `CLIENT_ORIGIN`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. Optional `PASSWORD_RESET_REDIRECT_URL`.

**Security:** service-role key is backend-only. Public registration always creates a student. Promote the first administrator manually in Supabase SQL Editor. Never accept a role from a public request.
