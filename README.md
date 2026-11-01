# SA Delta Classroom — Render + Supabase

প্রজেক্টটি তিনটি অংশে বিভক্ত:

- `client/` — React + Vite frontend
- `server/` — Node.js + Express API backend
- `supabase/` — Database schema, RLS policies এবং seed data

Render-এ **দুটি আলাদা Web Service** তৈরি করতে হবে। Frontend ও Backend একই সার্ভিসে চালাবেন না।

## 1. Supabase সেটআপ

1. Supabase Dashboard-এ আপনার Project খুলুন।
2. নতুন/খালি ডাটাবেস হলে SQL Editor → New query-তে `supabase/migrations/0001_init.sql`-এর সম্পূর্ণ SQL একবার চালান।
3. `Project Settings → API` থেকে Project URL এবং publishable/anon key নিন।
4. Backend-এর জন্য একই পেজ থেকে `service_role`/secret key নিন। এটি কেবল Backend Environment-এ থাকবে।
5. Authentication → URL Configuration-এ Frontend-এর Render URL-কে Site URL দিন। Redirect URLs-এ `https://YOUR-FRONTEND.onrender.com/**` যোগ করুন।
6. Email confirmation চালু থাকলে সাইনআপের পর ইমেইল verify করতে হবে। টেস্টের জন্য চাইলে Supabase Auth-এর Email provider-এ confirmation সাময়িক বন্ধ করা যায়।

**সতর্কতা:** আগে থেকেই টেবিল/ডেটা থাকা Supabase প্রজেক্টে `0001_init.sql` আবার চালাবেন না। এটি initial schema; পুনরায় চালালে existing objects-এর কারণে error হতে পারে। `seed.sql` ঐচ্ছিক sample data; প্রয়োজন না হলে চালানোর দরকার নেই।

প্রথম Admin তৈরি: আগে স্বাভাবিকভাবে একটি account signup করুন, তারপর SQL Editor-এ নিজের account email বসিয়ে চালান:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'YOUR_EMAIL@example.com');
```

## 2. Render — Backend Web Service

Render Dashboard → New → Web Service → GitHub repository `Delta-Classroom` নির্বাচন করুন।

| Setting | Value |
|---|---|
| Name | `sa-delta-classroom-api` (যেকোনো নাম হতে পারে) |
| Root Directory | `server` |
| Runtime | `Node` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Health Check Path | `/health` |

Backend Service → Environment-এ যোগ করুন:

| Key | Value |
|---|---|
| `SUPABASE_URL` | Supabase Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role/secret key |
| `CLIENT_URL` | Frontend-এর Render URL, যেমন `https://YOUR-FRONTEND.onrender.com` |

Deploy সফল হলে Backend URL খুলুন। JSON-এ `status: ok` দেখা উচিত। Health endpoint: `https://YOUR-BACKEND.onrender.com/health`।

## 3. Render — Frontend Web Service

Render Dashboard → New → Web Service → একই GitHub repository নির্বাচন করুন।

| Setting | Value |
|---|---|
| Name | `sa-delta-classroom-client` (যেকোনো নাম হতে পারে) |
| Root Directory | `client` |
| Runtime | `Node` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |

Frontend Service → Environment-এ যোগ করুন:

| Key | Value |
|---|---|
| `VITE_SUPABASE_URL` | Supabase Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable/anon key |
| `VITE_API_URL` | Backend URL-এর শেষে `/api`, যেমন `https://YOUR-BACKEND.onrender.com/api` |

`VITE_` দিয়ে শুরু হওয়া variable frontend build-এর সময় browser bundle-এ অন্তর্ভুক্ত হয়। তাই এখানে কেবল Supabase publishable/anon key ব্যবহার করবেন; `service_role` key কখনো Client Service-এ দেবেন না। Environment Variable যোগ বা পরিবর্তনের পর frontend-এ নতুন deploy/rebuild করুন।

## 4. Deploy-এর পর যাচাই

1. `https://YOUR-BACKEND.onrender.com/health` খুলুন — `{"status":"ok"}` আসবে।
2. Frontend Render URL খুলুন — Home page দেখা উচিত।
3. `/signup` দিয়ে account তৈরি করে Supabase Authentication → Users-এ account আছে কি না দেখুন।
4. Signup-এর পর `profiles` table-এ profile তৈরি হয়েছে কি না দেখুন।
5. Login করে Dashboard পরীক্ষা করুন।

## 5. গুরুত্বপূর্ণ নিরাপত্তা

- `SUPABASE_SERVICE_ROLE_KEY` কেবল Backend Render Service-এ রাখুন। GitHub, Frontend Environment বা browser code-এ নয়।
- `VITE_SUPABASE_ANON_KEY` browser-এ ব্যবহারযোগ্য public key; ডেটা নিরাপত্তা RLS policies-এর উপর নির্ভর করে।
- `.env` ফাইল GitHub-এ upload করবেন না। `.env.example` শুধু নমুনা।
- SQL migration দ্বিতীয়বার চালাবেন না যদি schema ইতিমধ্যে তৈরি থাকে।

## 6. Local development

Backend:

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Frontend (অন্য terminal):

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Local frontend URL `http://localhost:5173`; local backend URL `http://localhost:5000`।
