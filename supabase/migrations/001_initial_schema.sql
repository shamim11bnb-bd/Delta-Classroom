-- SA Delta Classroom: initial Supabase schema
-- Run in Supabase SQL Editor. Supabase Auth owns credentials; never store plaintext passwords.
create extension if not exists pgcrypto;

do $$ begin
  create type public.user_role as enum ('student','admin');
exception when duplicate_object then null; end $$;
do $$ begin
  create type public.enrollment_status as enum ('active','completed','cancelled');
exception when duplicate_object then null; end $$;
do $$ begin
  create type public.exam_status as enum ('draft','published','closed');
exception when duplicate_object then null; end $$;
do $$ begin
  create type public.attempt_status as enum ('in_progress','submitted','graded','expired');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text,
  phone text,
  avatar_url text,
  role public.user_role not null default 'student',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''),
          new.email, new.raw_user_meta_data->>'phone')
  on conflict (id) do update set email = excluded.email;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null default '',
  thumbnail_url text,
  price numeric(10,2) not null default 0 check (price >= 0),
  level text not null default 'beginner',
  published boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text not null default '',
  video_url text,
  duration_seconds integer not null default 0 check (duration_seconds >= 0),
  position integer not null default 0,
  is_preview boolean not null default false,
  created_at timestamptz not null default now(),
  unique(course_id, position)
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  status public.enrollment_status not null default 'active',
  progress_percent numeric(5,2) not null default 0 check (progress_percent between 0 and 100),
  enrolled_at timestamptz not null default now(),
  unique(student_id, course_id)
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  completed boolean not null default false,
  watched_seconds integer not null default 0 check (watched_seconds >= 0),
  updated_at timestamptz not null default now(),
  unique(student_id, lesson_id)
);

create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  course_id uuid references public.courses(id) on delete set null,
  duration_minutes integer not null default 30 check (duration_minutes > 0),
  total_marks numeric(8,2) not null default 0 check (total_marks >= 0),
  pass_marks numeric(8,2) not null default 0 check (pass_marks >= 0),
  starts_at timestamptz,
  ends_at timestamptz,
  status public.exam_status not null default 'draft',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.exam_questions (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams(id) on delete cascade,
  question_text text not null,
  question_type text not null default 'mcq' check (question_type in ('mcq','short')),
  options jsonb not null default '[]'::jsonb,
  correct_answer text,
  marks numeric(8,2) not null default 1 check (marks > 0),
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exams(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status public.attempt_status not null default 'in_progress',
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  score numeric(8,2),
  is_passed boolean,
  unique(exam_id, student_id, started_at)
);

create table if not exists public.exam_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.exam_attempts(id) on delete cascade,
  question_id uuid not null references public.exam_questions(id) on delete cascade,
  answer_text text,
  is_correct boolean,
  marks_awarded numeric(8,2) not null default 0,
  unique(attempt_id, question_id)
);

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  type text not null default 'general',
  is_published boolean not null default false,
  published_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid references public.courses(id) on delete set null,
  amount numeric(10,2) not null check (amount >= 0),
  currency text not null default 'BDT',
  provider text,
  transaction_id text,
  status text not null default 'pending' check (status in ('pending','paid','failed','refunded')),
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.password_reset_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  email text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected','completed')),
  requested_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid references public.profiles(id) on delete set null
);

create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  target_url text,
  is_active boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.question_bank (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  chapter text,
  question_text text not null,
  question_type text not null default 'mcq' check (question_type in ('mcq','short')),
  options jsonb not null default '[]'::jsonb,
  correct_answer text,
  explanation text,
  marks numeric(8,2) not null default 1 check (marks > 0),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_courses_published on public.courses(published, created_at desc);
create index if not exists idx_lessons_course_position on public.lessons(course_id, position);
create index if not exists idx_enrollments_student on public.enrollments(student_id);
create index if not exists idx_exams_status on public.exams(status, starts_at);
create index if not exists idx_attempts_student on public.exam_attempts(student_id);
create index if not exists idx_notices_published on public.notices(is_published, published_at desc);

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
drop trigger if exists courses_updated_at on public.courses;
create trigger courses_updated_at before update on public.courses for each row execute procedure public.set_updated_at();
drop trigger if exists lesson_progress_updated_at on public.lesson_progress;
create trigger lesson_progress_updated_at before update on public.lesson_progress for each row execute procedure public.set_updated_at();

-- RLS is enabled on every application table. API service role bypasses RLS; still verify JWT + role in API.
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.exams enable row level security;
alter table public.exam_questions enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.exam_answers enable row level security;
alter table public.notices enable row level security;
alter table public.payments enable row level security;
alter table public.password_reset_requests enable row level security;
alter table public.banners enable row level security;
alter table public.question_bank enable row level security;

-- Helper avoids recursive profile policy lookups.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin' and p.is_active = true);
$$;

drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles_update_self_or_admin" on public.profiles;
create policy "profiles_update_self_or_admin" on public.profiles for update to authenticated using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());

-- A row-level UPDATE policy cannot restrict individual columns. This trigger prevents
-- a normal user from promoting themselves or reactivating a disabled account.
create or replace function public.guard_profile_privileges()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and auth.uid() = old.id and not public.is_admin() then
    if new.role is distinct from old.role or new.is_active is distinct from old.is_active then
      raise exception 'Users cannot change their own role or active status';
    end if;
  end if;
  return new;
end $$;
drop trigger if exists profiles_guard_privileges on public.profiles;
create trigger profiles_guard_privileges before update on public.profiles
for each row execute procedure public.guard_profile_privileges();

drop policy if exists "published_courses_read" on public.courses;
create policy "published_courses_read" on public.courses for select to anon, authenticated using (published = true or public.is_admin());
drop policy if exists "admin_manage_courses" on public.courses;
create policy "admin_manage_courses" on public.courses for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "published_lessons_read" on public.lessons;
create policy "published_lessons_read" on public.lessons for select to anon, authenticated using (
  exists(select 1 from public.courses c where c.id = course_id and c.published = true)
  and (is_preview = true or exists(select 1 from public.enrollments e where e.course_id = lessons.course_id and e.student_id = auth.uid() and e.status = 'active'))
  or public.is_admin()
);
drop policy if exists "admin_manage_lessons" on public.lessons;
create policy "admin_manage_lessons" on public.lessons for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "student_read_own_enrollments" on public.enrollments;
create policy "student_read_own_enrollments" on public.enrollments for select to authenticated using (student_id = auth.uid() or public.is_admin());
drop policy if exists "student_create_own_enrollment" on public.enrollments;
create policy "student_create_own_enrollment" on public.enrollments for insert to authenticated with check (student_id = auth.uid());
drop policy if exists "admin_manage_enrollments" on public.enrollments;
create policy "admin_manage_enrollments" on public.enrollments for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "student_manage_own_progress" on public.lesson_progress;
create policy "student_manage_own_progress" on public.lesson_progress for all to authenticated using (student_id = auth.uid() or public.is_admin()) with check (student_id = auth.uid() or public.is_admin());

drop policy if exists "published_exams_read" on public.exams;
create policy "published_exams_read" on public.exams for select to authenticated using (status = 'published' or public.is_admin());
drop policy if exists "admin_manage_exams" on public.exams;
create policy "admin_manage_exams" on public.exams for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Do not expose answer keys to students through direct client access; backend should return sanitized questions.
drop policy if exists "admin_manage_exam_questions" on public.exam_questions;
create policy "admin_manage_exam_questions" on public.exam_questions for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "student_read_own_attempts" on public.exam_attempts;
create policy "student_read_own_attempts" on public.exam_attempts for select to authenticated using (student_id = auth.uid() or public.is_admin());
drop policy if exists "student_create_own_attempts" on public.exam_attempts;
create policy "student_create_own_attempts" on public.exam_attempts for insert to authenticated with check (student_id = auth.uid());
drop policy if exists "student_read_own_answers" on public.exam_answers;
create policy "student_read_own_answers" on public.exam_answers for select to authenticated using (exists(select 1 from public.exam_attempts a where a.id = attempt_id and a.student_id = auth.uid()) or public.is_admin());
drop policy if exists "student_create_own_answers" on public.exam_answers;
create policy "student_create_own_answers" on public.exam_answers for insert to authenticated with check (exists(select 1 from public.exam_attempts a where a.id = attempt_id and a.student_id = auth.uid()));
drop policy if exists "admin_manage_answers" on public.exam_answers;
create policy "admin_manage_answers" on public.exam_answers for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "published_notices_read" on public.notices;
create policy "published_notices_read" on public.notices for select to anon, authenticated using (is_published = true or public.is_admin());
drop policy if exists "admin_manage_notices" on public.notices;
create policy "admin_manage_notices" on public.notices for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "student_read_own_payments" on public.payments;
create policy "student_read_own_payments" on public.payments for select to authenticated using (student_id = auth.uid() or public.is_admin());
drop policy if exists "admin_manage_payments" on public.payments;
create policy "admin_manage_payments" on public.payments for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "user_read_own_reset_requests" on public.password_reset_requests;
create policy "user_read_own_reset_requests" on public.password_reset_requests for select to authenticated using (user_id = auth.uid() or public.is_admin());
drop policy if exists "user_create_reset_request" on public.password_reset_requests;
create policy "user_create_reset_request" on public.password_reset_requests for insert to anon, authenticated with check (user_id is null or user_id = auth.uid());
drop policy if exists "admin_manage_reset_requests" on public.password_reset_requests;
create policy "admin_manage_reset_requests" on public.password_reset_requests for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "active_banners_read" on public.banners;
create policy "active_banners_read" on public.banners for select to anon, authenticated using (is_active = true or public.is_admin());
drop policy if exists "admin_manage_banners" on public.banners;
create policy "admin_manage_banners" on public.banners for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "question_bank_read_authenticated" on public.question_bank;
-- Question-bank rows contain answer keys. Only admins can read them directly;
-- student-facing question delivery must use a backend endpoint that strips answers.
drop policy if exists "question_bank_read_authenticated" on public.question_bank;
create policy "question_bank_admin_read" on public.question_bank for select to authenticated using (public.is_admin());
drop policy if exists "admin_manage_question_bank" on public.question_bank;
create policy "admin_manage_question_bank" on public.question_bank for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- IMPORTANT: After the first account is registered, promote the intended administrator manually:
-- update public.profiles set role = 'admin' where email = 'your-admin-email@example.com';
-- Never let a public registration request choose its own role.
