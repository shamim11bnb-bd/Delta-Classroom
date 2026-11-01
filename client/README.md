# SA Delta Classroom frontend

Next.js App Router + React + TypeScript.

```bash
cd client
npm install
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_API_URL` to the backend API base URL ending in `/api`. Render root: `client`; build `npm install && npm run build`; start `npm run start`.

The login and registration forms call the Node API. Some learning, exam and administration pages remain scaffold/demo views; consult the root README for implemented API scope. Never place the Supabase service-role key in this directory.
