-- Delta Classroom: প্রাথমিক স্কিমা + RLS
create extension if not exists "pgcrypto";

-- ───────── টেবিল ─────────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'student' check (role in ('student','teacher','admin')),
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text not null default '',
  category text not null default 'সাধারণ',
  level text not null default 'beginner' check (level in ('beginner','intermediate','advanced')),
  price numeric(10,2) not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (course_id, student_id)
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  content text not null default '',
  video_url text,
  material_url text,
  position int not null default 0,
  is_preview boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text not null default '',
  due_at timestamptz,
  max_marks int not null default 100,
  created_at timestamptz not null default now()
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  answer_text text not null default '',
  file_url text,
  marks int,
  feedback text,
  submitted_at timestamptz not null default now(),
  unique (assignment_id, student_id)
);

create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  duration_minutes int not null default 10,
  created_at timestamptz not null default now()
);

create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  question text not null,
  options jsonb not null,
  position int not null default 0
);

-- সঠিক উত্তর আলাদা টেবিলে: কোনো policy নেই, তাই client কখনো দেখতে পাবে না (শুধু server/service_role)
create table public.quiz_answers (
  question_id uuid primary key references public.quiz_questions(id) on delete cascade,
  correct_index int not null
);

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  score int not null,
  total int not null,
  created_at timestamptz not null default now(),
  unique (quiz_id, student_id)
);

create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  class_date date not null,
  status text not null check (status in ('present','absent','late')),
  unique (course_id, student_id, class_date)
);

create table public.notices (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null default '',
  created_at timestamptz not null default now()
);

create index on public.enrollments (student_id);
create index on public.lessons (course_id, position);
create index on public.notices (course_id, created_at desc);

-- ───────── নতুন ইউজারের জন্য profile (admin কখনো সাইনআপ থেকে হওয়া যাবে না) ─────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    case when new.raw_user_meta_data->>'role' = 'teacher' then 'teacher' else 'student' end
  );
  return new;
end $$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ───────── হেল্পার ফাংশন ─────────
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.is_course_member(cid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select
    exists (select 1 from courses where id = cid and teacher_id = auth.uid())
    or exists (select 1 from enrollments where course_id = cid and student_id = auth.uid())
    or public.is_admin();
$$;

create or replace function public.is_course_teacher(cid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from courses where id = cid and teacher_id = auth.uid()) or public.is_admin();
$$;

-- ───────── RLS ─────────
-- লেখার কাজ (insert/update/delete) server-এর service_role দিয়ে হয়, তাই এখানে শুধু select policy।
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.enrollments enable row level security;
alter table public.lessons enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_answers enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.attendance enable row level security;
alter table public.notices enable row level security;

create policy "profiles_read" on public.profiles for select to authenticated using (true);
create policy "profiles_update_own" on public.profiles for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));

create policy "courses_read" on public.courses for select
  using (is_published or teacher_id = auth.uid() or public.is_admin());

create policy "enrollments_read" on public.enrollments for select to authenticated
  using (student_id = auth.uid() or public.is_course_teacher(course_id));

create policy "lessons_read" on public.lessons for select
  using (is_preview or public.is_course_member(course_id));

create policy "assignments_read" on public.assignments for select to authenticated
  using (public.is_course_member(course_id));

create policy "submissions_read" on public.submissions for select to authenticated
  using (student_id = auth.uid() or exists (
    select 1 from assignments a where a.id = assignment_id and public.is_course_teacher(a.course_id)));

create policy "quizzes_read" on public.quizzes for select to authenticated
  using (public.is_course_member(course_id));

create policy "quiz_questions_read" on public.quiz_questions for select to authenticated
  using (exists (select 1 from quizzes q where q.id = quiz_id and public.is_course_member(q.course_id)));

-- quiz_answers: কোনো policy নেই

create policy "quiz_attempts_read" on public.quiz_attempts for select to authenticated
  using (student_id = auth.uid() or exists (
    select 1 from quizzes q where q.id = quiz_id and public.is_course_teacher(q.course_id)));

create policy "attendance_read" on public.attendance for select to authenticated
  using (student_id = auth.uid() or public.is_course_teacher(course_id));

create policy "notices_read" on public.notices for select to authenticated
  using (course_id is null or public.is_course_member(course_id));
