# Delta Classroom

React (Vite) + Node.js (Express) + Supabase দিয়ে তৈরি বাংলা এডটেক প্ল্যাটফর্ম। Vercel-এ দুটি আলাদা প্রজেক্ট হিসেবে ডিপ্লয় হয়।

```
client/     React frontend
server/     Express API (Vercel serverless-compatible)
supabase/   SQL migration + RLS
```

## কীভাবে কাজ করে
- **পড়া** (কোর্স, পাঠ, নোটিশ ইত্যাদি): client সরাসরি Supabase থেকে, RLS দিয়ে সুরক্ষিত।
- **লেখা** (কোর্স তৈরি, অ্যাসাইনমেন্ট জমা, কুইজ গ্রেডিং, উপস্থিতি, role বদল): client → Express API → Supabase (`service_role`)।
- কুইজের সঠিক উত্তর `quiz_answers` টেবিলে থাকে, যেখানে কোনো RLS policy নেই। তাই browser থেকে উত্তর দেখা যায় না।

## ১. Supabase সেটআপ
1. supabase.com-এ নতুন প্রজেক্ট খুলুন।
2. **SQL Editor**-এ `supabase/migrations/0001_init.sql` পুরোটা paste করে Run করুন
   (অথবা Supabase CLI দিয়ে `supabase db push`)।
3. **Project Settings → API** থেকে `Project URL`, `anon key`, `service_role key` নিন।
4. (ঐচ্ছিক, টেস্টের সময়) **Authentication → Providers → Email**-এ "Confirm email" বন্ধ রাখলে সাইনআপের পরই লগইন হবে।
5. প্রথম admin: সাইনআপ করে SQL Editor-এ চালান:
   ```sql
   update public.profiles set role = 'admin'
   where id = (select id from auth.users where email = 'you@example.com');
   ```

## ২. লোকালি চালানো
```bash
# Server
cd server
cp .env.example .env      # মান বসান
npm install
npm run dev               # http://localhost:5000

# Client (নতুন টার্মিনালে)
cd client
cp .env.example .env      # মান বসান
npm install
npm run dev               # http://localhost:5173
```

## ৩. Vercel-এ ডিপ্লয়
একই GitHub repo থেকে দুটি প্রজেক্ট বানান।

**Server প্রজেক্ট**: Root Directory = `server`
- Environment variables: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `CLIENT_URL` (client-এর Vercel URL; একাধিক হলে কমা দিয়ে)

**Client প্রজেক্ট**: Root Directory = `client`, Framework = Vite
- Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL` (যেমন `https://your-server.vercel.app/api`)

ডিপ্লয়ের পর Supabase **Authentication → URL Configuration**-এ client-এর URL যোগ করুন।

## নিরাপত্তা
- `service_role` key শুধু server-এ, কখনো client বা Git-এ নয়।
- সব টেবিলে RLS চালু। সাইনআপ থেকে কেউ `admin` হতে পারে না।

## পরবর্তী ধাপ (প্রস্তাব)
পেমেন্ট (bKash/SSLCommerz), ফাইল আপলোড (Supabase Storage), লাইভ ক্লাস (Jitsi/Meet লিংক), সার্টিফিকেট, নোটিফিকেশন (Supabase Realtime)।
