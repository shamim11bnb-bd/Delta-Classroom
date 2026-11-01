-- SA Delta Classroom starter schema for Supabase PostgreSQL.
-- Run once in Supabase SQL Editor on a NEW project. Review before applying to an existing database.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'student' check (role in ('student','teacher','admin')),
  avatar_url text,
  status text not null default 'active' check (status in ('active','suspended','blocked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(), name text not null unique,
  description text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(), title text not null, description text,
  category text, category_id uuid references public.categories(id) on delete set null,
  teacher_id uuid references public.profiles(id) on delete set null,
  thumbnail_url text, price numeric(12,2) not null default 0,
  is_published boolean not null default false, status text not null default 'draft',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(), course_id uuid not null references public.courses(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'active', enrolled_at timestamptz not null default now(),
  created_at timestamptz not null default now(), unique(course_id, student_id)
);
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(), course_id uuid not null references public.courses(id) on delete cascade,
  teacher_id uuid references public.profiles(id) on delete set null, title text not null,
  content text, video_url text, attachment_url text, sort_order integer not null default 0,
  is_published boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(), course_id uuid references public.courses(id) on delete cascade,
  teacher_id uuid references public.profiles(id) on delete set null, title text not null,
  description text, due_date timestamptz, attachment_url text, status text default 'published',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(), assignment_id uuid references public.assignments(id) on delete cascade,
  student_id uuid references public.profiles(id) on delete cascade, answer_text text, file_url text,
  status text not null default 'submitted', marks numeric(8,2), feedback text,
  submitted_at timestamptz not null default now(), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(), course_id uuid references public.courses(id) on delete cascade,
  teacher_id uuid references public.profiles(id) on delete set null, title text not null, description text,
  duration_minutes integer default 30, total_marks numeric(8,2) default 0,
  is_published boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(), quiz_id uuid not null references public.quizzes(id) on delete cascade,
  question text not null, question_type text not null default 'mcq', options jsonb not null default '[]'::jsonb,
  correct_answer jsonb, marks numeric(8,2) not null default 1, sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.quiz_answers (
  id uuid primary key default gen_random_uuid(), question_id uuid not null references public.quiz_questions(id) on delete cascade,
  attempt_id uuid, answer jsonb, is_correct boolean, marks_awarded numeric(8,2) default 0,
  created_at timestamptz not null default now()
);
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(), quiz_id uuid references public.quizzes(id) on delete cascade,
  student_id uuid references public.profiles(id) on delete cascade, score numeric(8,2), total_marks numeric(8,2),
  status text not null default 'submitted', started_at timestamptz default now(), submitted_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.quiz_answers drop constraint if exists quiz_answers_attempt_id_fkey;
alter table public.quiz_answers add constraint quiz_answers_attempt_id_fkey foreign key (attempt_id) references public.quiz_attempts(id) on delete cascade;

create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(), course_id uuid references public.courses(id) on delete cascade,
  teacher_id uuid references public.profiles(id) on delete set null, title text not null, description text,
  start_at timestamptz, end_at timestamptz, total_marks numeric(8,2) default 100,
  status text default 'scheduled', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(), course_id uuid references public.courses(id) on delete cascade,
  student_id uuid references public.profiles(id) on delete cascade, teacher_id uuid references public.profiles(id) on delete set null,
  attendance_date date not null default current_date, status text not null default 'present', notes text,
  created_at timestamptz not null default now(), unique(course_id, student_id, attendance_date)
);
create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(), title text not null, description text, body text,
  created_by uuid references public.profiles(id) on delete set null, audience text default 'all',
  is_published boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(), student_id uuid references public.profiles(id) on delete set null,
  course_id uuid references public.courses(id) on delete set null, amount numeric(12,2) not null default 0,
  currency text not null default 'BDT', status text not null default 'pending', transaction_id text,
  provider text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(), user_id uuid references public.profiles(id) on delete cascade,
  title text not null, message text, is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(), title text not null, description text,
  report_type text, data jsonb not null default '{}'::jsonb, created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);
create table if not exists public.platform_settings (
  id uuid primary key default gen_random_uuid(), key text not null unique, value jsonb,
  updated_by uuid references public.profiles(id) on delete set null, updated_at timestamptz not null default now()
);

create index if not exists idx_courses_published on public.courses(is_published, created_at desc);
create index if not exists idx_courses_teacher on public.courses(teacher_id);
create index if not exists idx_enrollments_student on public.enrollments(student_id);
create index if not exists idx_assignments_course on public.assignments(course_id);
create index if not exists idx_submissions_student on public.submissions(student_id);
create index if not exists idx_attendance_student_date on public.attendance(student_id, attendance_date desc);
create index if not exists idx_notifications_user on public.notifications(user_id, created_at desc);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), new.email, 'student')
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Backfill existing Auth users.
insert into public.profiles (id, full_name, email, role)
select id, coalesce(raw_user_meta_data->>'full_name',''), email, 'student' from auth.users
on conflict (id) do nothing;

-- Direct client access is limited. The backend uses service role and enforces roles itself.
alter table public.profiles enable row level security;
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles for select to authenticated using (auth.uid() = id);
create or replace function public.current_user_role()
returns text language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid() limit 1;
$$;
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id and role = public.current_user_role());
