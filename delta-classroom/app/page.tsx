
import Link from "next/link";
import Header from "@/clients/components/layout/Header";
import Footer from "@/clients/components/layout/Footer";

const stats = [
  { value: "10K+", label: "Active Students" },
  { value: "50+", label: "Expert Courses" },
  { value: "100+", label: "Online Exams" },
  { value: "95%", label: "Student Satisfaction" },
];

const courses = [
  {
    category: "Admission",
    title: "University Admission Preparation",
    description: "Prepare for university admission with structured lessons and practice tests.",
    lessons: "120+ Lessons",
    level: "Beginner to Advanced",
    color: "bg-teal-50 text-teal-700",
    icon: "🎓",
  },
  {
    category: "Academic",
    title: "HSC Complete Preparation",
    description: "Complete academic preparation with notes, lectures and chapter-wise exams.",
    lessons: "85+ Lessons",
    level: "All Levels",
    color: "bg-blue-50 text-blue-700",
    icon: "📚",
  },
  {
    category: "Practice",
    title: "English & General Knowledge",
    description: "Improve your skills through interactive lessons and regular assessments.",
    lessons: "60+ Lessons",
    level: "All Levels",
    color: "bg-purple-50 text-purple-700",
    icon: "✍️",
  },
];

const features = [
  {
    icon: "🎥",
    title: "Interactive Classes",
    description: "Learn through organized lessons, recorded lectures and educational resources.",
    color: "bg-teal-50",
  },
  {
    icon: "📝",
    title: "Smart Examination",
    description: "Participate in timed MCQ exams with automated evaluation and instant results.",
    color: "bg-blue-50",
  },
  {
    icon: "📖",
    title: "Question Bank",
    description: "Practice topic-wise, subject-wise and chapter-wise questions.",
    color: "bg-purple-50",
  },
  {
    icon: "📊",
    title: "Performance Reports",
    description: "Track your progress, identify weak areas and improve your performance.",
    color: "bg-orange-50",
  },
  {
    icon: "🏆",
    title: "Achievements",
    description: "Track your learning milestones and celebrate your academic achievements.",
    color: "bg-yellow-50",
  },
  {
    icon: "📱",
    title: "Learn Anywhere",
    description: "Access your learning resources from mobile, tablet and desktop devices.",
    color: "bg-pink-50",
  },
];

const examFeatures = [
  "Live timed examinations",
  "Automatic result evaluation",
  "Subject-wise MCQ practice",
  "Detailed performance reports",
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function StudentIllustration() {
  return (
    <svg
      viewBox="0 0 600 500"
      className="w-full h-auto"
      role="img"
      aria-label="Student learning with a laptop and books"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#CCFBF1" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>
        <linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
      </defs>

      <circle cx="300" cy="245" r="210" fill="url(#heroBg)" />
      <circle cx="300" cy="245" r="170" fill="#F0FDFA" opacity=".6" />

      {/* Decorative elements */}
      <circle cx="95" cy="130" r="10" fill="#14B8A6" />
      <circle cx="480" cy="105" r="14" fill="#2DD4BF" />
      <circle cx="505" cy="340" r="9" fill="#0F766E" />
      <path d="M90 220l12-22 12 22z" fill="#F59E0B" />
      <path d="M465 200l12-22 12 22z" fill="#6366F1" />
      <path d="M120 340l8-8 8 8-8 8z" fill="#8B5CF6" />

      {/* Floating book */}
      <g transform="rotate(-12 130 180)">
        <rect x="72" y="150" width="90" height="65" rx="8" fill="#0F766E" />
        <path d="M117 153v59" stroke="#99F6E4" strokeWidth="3" />
        <path d="M85 165h22M85 175h22M85 185h22" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M128 165h22M128 175h22M128 185h22" stroke="#99F6E4" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Floating graduation cap */}
      <g transform="translate(400 65) rotate(12)">
        <path d="M0 25 55 0l55 25-55 25z" fill="#0F766E" />
        <path d="M25 37v22q30 20 60 0V37" fill="#14B8A6" />
        <path d="M108 25v30" stroke="#F59E0B" strokeWidth="4" />
        <circle cx="108" cy="58" r="5" fill="#F59E0B" />
      </g>

      {/* Desk */}
      <path d="M85 395h430l-20 20H105z" fill="#0F766E" />
      <rect x="110" y="415" width="14" height="60" rx="5" fill="#115E59" />
      <rect x="475" y="415" width="14" height="60" rx="5" fill="#115E59" />

      {/* Student body */}
      <path d="M206 386c5-85 32-137 94-137s90 52 95 137z" fill="url(#shirt)" />
      <path d="M265 250q35 50 70 0" fill="#0D9488" />

      {/* Neck */}
      <path d="M275 220h50v42q-25 25-50 0z" fill="#EAB18D" />

      {/* Head */}
      <ellipse cx="300" cy="175" rx="70" ry="79" fill="#F2BE9A" />

      {/* Hair */}
      <path
        d="M230 170c-12-78 36-107 85-91 45-8 68 30 57 88-13-14-25-33-29-49-26 28-68 36-113 33z"
        fill="#243B53"
      />
      <path d="M230 166q-12 30 1 50l12-35z" fill="#243B53" />
      <path d="M359 162q15 30 1 52l-12-37z" fill="#243B53" />

      {/* Face */}
      <ellipse cx="277" cy="181" rx="5" ry="7" fill="#243B53" />
      <ellipse cx="324" cy="181" rx="5" ry="7" fill="#243B53" />
      <path d="M285 209q15 13 30 0" stroke="#B4533C" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M263 167q12-8 24-2M313 165q12-6 24 2" stroke="#243B53" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Laptop */}
      <g>
        <rect x="190" y="310" width="220" height="125" rx="12" fill="#334155" />
        <rect x="199" y="319" width="202" height="107" rx="7" fill="#E0F2FE" />
        <rect x="214" y="333" width="172" height="77" rx="5" fill="#0F766E" />
        <circle cx="300" cy="370" r="19" fill="#CCFBF1" />
        <path d="M290 370l7 7 14-16" stroke="#0F766E" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M180 436h240l-15 12H195z" fill="#94A3B8" />
      </g>

      {/* Books on desk */}
      <g transform="translate(425 355)">
        <rect x="0" y="20" width="72" height="17" rx="3" fill="#F59E0B" />
        <rect x="5" y="3" width="72" height="17" rx="3" fill="#6366F1" />
        <rect x="0" y="-14" width="72" height="17" rx="3" fill="#14B8A6" />
        <path d="M12-8h40M12 9h40M12 26h40" stroke="white" strokeWidth="2" opacity=".8" />
      </g>

      {/* Floating learning card */}
      <g transform="translate(375 265)">
        <rect width="112" height="63" rx="12" fill="white" />
        <circle cx="22" cy="22" r="11" fill="#CCFBF1" />
        <path d="M18 22l3 3 6-7" stroke="#0F766E" strokeWidth="2" fill="none" />
        <rect x="42" y="15" width="53" height="6" rx="3" fill="#0F766E" />
        <rect x="42" y="27" width="37" height="5" rx="3" fill="#CBD5E1" />
        <rect x="14" y="43" width="84" height="7" rx="3" fill="#E2E8F0" />
        <rect x="14" y="43" width="65" height="7" rx="3" fill="#14B8A6" />
      </g>
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
          <div className="absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:py-24">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-teal-700 shadow-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal-500" />
                Smart Learning. Better Future.
              </div>

              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Learn Smarter,
                <span className="block text-teal-600">
                  Achieve Bigger.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Welcome to SA Delta Classroom. Discover quality courses,
                practice online examinations and build your future with
                smarter digital learning.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-3 rounded-xl bg-teal-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-teal-600/20 transition hover:-translate-y-1 hover:bg-teal-700"
                >
                  Start Learning <ArrowIcon />
                </Link>

                <Link
                  href="/course"
                  className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:text-teal-700"
                >
                  Explore Courses <ArrowIcon />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <div className="flex -space-x-3">
                  {["S", "A", "R", "M"].map((letter, i) => (
                    <div
                      key={letter}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${
                        ["bg-teal-600", "bg-blue-600", "bg-indigo-500", "bg-emerald-600"][i]
                      }`}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-800">
                    Learn Together, Grow Together
                  </p>
                  <p className="text-xs text-slate-500">
                    Your journey starts here
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute inset-8 rounded-full bg-teal-200/40 blur-3xl" />
              <div className="relative">
                <StudentIllustration />

                <div className="absolute left-0 top-1/3 rounded-2xl border border-white bg-white/95 p-4 shadow-xl backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-xl">
                      📚
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Smart Learning</p>
                      <p className="text-[10px] text-slate-500">Learn every day</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-10 right-0 rounded-2xl border border-white bg-white/95 p-4 shadow-xl backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-xl">
                      🏆
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Your Success</p>
                      <p className="text-[10px] text-slate-500">Starts with learning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="relative z-10 mx-auto -mt-2 max-w-7xl px-5 pb-10 sm:px-8">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/50 sm:grid-cols-4 sm:p-8">
            {stats.map((stat) => (
              <div key={stat.label} className="py-3 text-center">
                <h3 className="text-3xl font-extrabold text-teal-700 sm:text-4xl">
                  {stat.value}
                </h3>
                <p className="mt-2 text-xs font-semibold text-slate-500 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* COURSES */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-600">
                  Explore Learning
                </span>
                <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Explore Our Popular Courses
                </h2>
                <p className="mt-4 leading-7 text-slate-500">
                  Discover carefully organized courses designed to help you
                  reach your academic goals.
                </p>
              </div>

              <Link
                href="/course"
                className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900"
              >
                View All Courses <ArrowIcon />
              </Link>
            </div>

            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <article
                  key={course.title}
                  className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/10"
                >
                  <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-teal-50 to-cyan-100">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/50" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-5xl shadow-lg transition duration-300 group-hover:scale-110">
                      {course.icon}
                    </div>
                    <span className={`absolute left-5 top-5 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${course.color}`}>
                      {course.category}
                    </span>
                  </div>

                  <div className="p-7">
                    <h3 className="text-xl font-extrabold text-slate-900 transition group-hover:text-teal-700">
                      {course.title}
                    </h3>
                    <p className="mt-3 min-h-16 text-sm leading-7 text-slate-500">
                      {course.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3 border-b border-slate-100 pb-5 text-xs font-semibold text-slate-500">
                      <span>📘 {course.lessons}</span>
                      <span>🎯 {course.level}</span>
                    </div>

                    <Link
                      href="/course"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:gap-4"
                    >
                      Explore Course <ArrowIcon />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EXAM SECTION */}
        <section className="overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-400">
                Test Your Knowledge
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">
                Prepare Better with
                <span className="block text-teal-400">
                  Smart Online Exams.
                </span>
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-slate-400">
                Practice regularly, participate in online examinations and
                understand your progress with detailed performance reports.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {examFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-slate-200">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-teal-400">
                      <CheckIcon />
                    </span>
                    {feature}
                  </div>
                ))}
              </div>

              <Link
                href="/exam"
                className="mt-10 inline-flex items-center gap-3 rounded-xl bg-teal-500 px-7 py-4 text-sm font-bold text-white transition hover:bg-teal-400"
              >
                Explore Examinations <ArrowIcon />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-teal-500/10 blur-3xl" />
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur sm:p-9">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-bold text-teal-400">EXAM DASHBOARD</p>
                    <h3 className="mt-2 text-xl font-bold">Your Progress</h3>
                  </div>
                  <div className="rounded-xl bg-teal-500/15 px-3 py-2 text-xl">📊</div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/5 p-5">
                    <p className="text-xs text-slate-400">Practice Tests</p>
                    <p className="mt-3 text-3xl font-extrabold text-white">25+</p>
                    <p className="mt-1 text-xs text-teal-400">Practice regularly</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-5">
                    <p className="text-xs text-slate-400">Learning Areas</p>
                    <p className="mt-3 text-3xl font-extrabold text-white">10+</p>
                    <p className="mt-1 text-xs text-teal-400">Explore subjects</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-white/5 p-5">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold">Learning Progress</span>
                    <span className="text-teal-400">Keep improving</span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-700">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400" />
                  </div>
                  <p className="mt-3 text-xs text-slate-400">
                    Every practice session takes you one step forward.
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-4 rounded-2xl border border-teal-500/20 bg-teal-500/10 p-4">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <p className="text-sm font-bold text-teal-300">
                      Your Goal Matters
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Learn, practice and achieve more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUESTION BANK */}
        <section className="bg-teal-50/60 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl sm:p-9">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-teal-600">
                      Question Bank
                    </p>
                    <h3 className="mt-2 text-xl font-extrabold text-slate-900">
                      Practice Center
                    </h3>
                  </div>
                  <span className="text-3xl">📚</span>
                </div>

                {[
                  { name: "English", count: "Grammar & Vocabulary", icon: "🔤" },
                  { name: "General Knowledge", count: "Current Affairs", icon: "🌍" },
                  { name: "Mathematics", count: "Problem Solving", icon: "➗" },
                  { name: "Science", count: "Conceptual Questions", icon: "🔬" },
                ].map((subject) => (
                  <div
                    key={subject.name}
                    className="mt-4 flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:border-teal-200 hover:bg-teal-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-2xl">
                        {subject.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{subject.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{subject.count}</p>
                      </div>
                    </div>
                    <ArrowIcon />
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-700">
                Practice Makes Progress
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                One Question at a Time,
                <span className="block text-teal-600">
                  One Step Closer.
                </span>
              </h2>
              <p className="mt-6 leading-8 text-slate-600">
                Explore an organized question bank to strengthen your
                knowledge. Practice questions based on subjects and topics
                and prepare yourself for better results.
              </p>
              <Link
                href="/questionbank"
                className="mt-8 inline-flex items-center gap-3 rounded-xl bg-teal-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700"
              >
                Explore Question Bank <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-600">
                Why Delta Classroom
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Everything You Need to Learn Better
              </h2>
              <p className="mt-4 leading-7 text-slate-500">
                A complete learning environment designed to make your
                educational journey simple, effective and enjoyable.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-slate-100 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-teal-100 hover:shadow-xl hover:shadow-teal-900/5"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-lg font-extrabold text-slate-900 group-hover:text-teal-700">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-600">
                Student Experience
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Learning That Inspires
              </h2>
              <p className="mt-4 text-slate-500">
                A supportive learning environment helps students move forward.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
              {[
                {
                  name: "Student Review",
                  role: "SA Delta Classroom Learner",
                  text: "The organized learning resources and practice environment make studying easier and more structured.",
                  avatar: "S",
                },
                {
                  name: "Student Review",
                  role: "Online Exam Participant",
                  text: "The online examination system provides a convenient way to practice and understand my preparation.",
                  avatar: "D",
                },
              ].map((review) => (
                <div key={review.avatar} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                  <div className="text-2xl tracking-widest text-amber-400">
                    ★★★★★
                  </div>
                  <p className="mt-5 leading-8 text-slate-600">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="mt-7 flex items-center gap-4 border-t border-slate-100 pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-lg font-extrabold text-teal-700">
                      {review.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        {review.name}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 px-7 py-16 text-center text-white shadow-2xl sm:px-14">
            <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-teal-100">
                Start Your Journey Today
              </span>

              <h2 className="mt-7 text-3xl font-extrabold leading-tight sm:text-5xl">
                Your Future Starts with
                <span className="block text-teal-300">Better Learning.</span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl leading-8 text-teal-50/80">
                Join SA Delta Classroom and take your next step towards
                a smarter and more successful learning journey.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-sm font-extrabold text-teal-800 shadow-xl transition hover:-translate-y-1 hover:bg-teal-50"
                >
                  Create Free Account <ArrowIcon />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-3 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/20"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
