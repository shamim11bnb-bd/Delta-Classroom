# Delta Classroom

Delta Classroom is a full-featured Learning Management System (LMS), Online Examination Platform, and Question Bank Management Application built with Next.js 15, TypeScript, Supabase, and Tailwind CSS.

## Features
- **Authentication**: JWT & Supabase Auth, OTP Verification, Password Reset.
- **Student Dashboard**: Course Enrollment, Lesson Watch, Live Exam Taking, Real-time Timer, Instant Results & PDF Certificate Download.
- **Question Bank Module**: Subject Stats, Question Creation, Filtering, Paper Building, Bulk CSV Import/Export.
- **Admin Control Center**: User Management, Course & Exam Creation, Payment Verification, Notice & Banner Management, Result Export.

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Copy `.env.example` to `.env.local` and add your Supabase credentials.

3. **Run Database Migrations:**
   Apply the SQL files in `supabase/migrations/` to your Supabase PostgreSQL database.

4. **Start Development Server:**
   ```bash
   npm run dev
   ```
