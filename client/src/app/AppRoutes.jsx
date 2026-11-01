import { Routes,Route } from 'react-router-dom';
import SiteLayout from '../components/layout/SiteLayout.jsx';
import ProtectedRoute from '../routes/ProtectedRoute.jsx';
import Home from '../pages/Home/page.jsx';
import Login from '../pages/Auth/Login/page.jsx';
import Signup from '../pages/Auth/Signup/page.jsx';
import ForgotPassword from '../pages/Auth/ForgotPassword/page.jsx';
import ResetPassword from '../pages/Auth/ResetPassword/page.jsx';
import StudentDashboard from '../pages/Student/Dashboard/page.jsx';
import TeacherDashboard from '../pages/Teacher/Dashboard/page.jsx';
import AdminDashboard from '../pages/Admin/Dashboard/page.jsx';
import Profile from '../pages/Profile/page.jsx';
import Notifications from '../pages/Notifications/page.jsx';
import NotFound from '../pages/NotFound/page.jsx';
import StudentMyCourses from '../pages/Student/MyCourses/page.jsx';
import StudentCourseDetails from '../pages/Student/CourseDetails/page.jsx';
import StudentLessons from '../pages/Student/Lessons/page.jsx';
import StudentAssignments from '../pages/Student/Assignments/page.jsx';
import StudentQuizzes from '../pages/Student/Quizzes/page.jsx';
import StudentExams from '../pages/Student/Exams/page.jsx';
import StudentResults from '../pages/Student/Results/page.jsx';
import StudentAttendance from '../pages/Student/Attendance/page.jsx';
import StudentProgress from '../pages/Student/Progress/page.jsx';
import StudentNotices from '../pages/Student/Notices/page.jsx';
import TeacherMyCourses from '../pages/Teacher/MyCourses/page.jsx';
import TeacherCreateCourse from '../pages/Teacher/CreateCourse/page.jsx';
import TeacherManageLessons from '../pages/Teacher/ManageLessons/page.jsx';
import TeacherAssignments from '../pages/Teacher/Assignments/page.jsx';
import TeacherSubmissions from '../pages/Teacher/Submissions/page.jsx';
import TeacherQuizManagement from '../pages/Teacher/QuizManagement/page.jsx';
import TeacherAttendance from '../pages/Teacher/Attendance/page.jsx';
import TeacherStudents from '../pages/Teacher/Students/page.jsx';
import AdminUsers from '../pages/Admin/Users/page.jsx';
import AdminStudents from '../pages/Admin/Students/page.jsx';
import AdminTeachers from '../pages/Admin/Teachers/page.jsx';
import AdminCourses from '../pages/Admin/Courses/page.jsx';
import AdminCategories from '../pages/Admin/Categories/page.jsx';
import AdminEnrollments from '../pages/Admin/Enrollments/page.jsx';
import AdminPayments from '../pages/Admin/Payments/page.jsx';
import AdminExams from '../pages/Admin/Exams/page.jsx';
import AdminNotices from '../pages/Admin/Notices/page.jsx';
import AdminReports from '../pages/Admin/Reports/page.jsx';
import AdminSettings from '../pages/Admin/Settings/page.jsx';
const routes=[
 ['/student/courses',StudentMyCourses],
 ['/student/course/:id',StudentCourseDetails],
 ['/student/lessons',StudentLessons],
 ['/student/assignments',StudentAssignments],
 ['/student/quizzes',StudentQuizzes],
 ['/student/exams',StudentExams],
 ['/student/results',StudentResults],
 ['/student/attendance',StudentAttendance],
 ['/student/progress',StudentProgress],
 ['/student/notices',StudentNotices],
 ['/teacher/courses',TeacherMyCourses],
 ['/teacher/create-course',TeacherCreateCourse],
 ['/teacher/lessons',TeacherManageLessons],
 ['/teacher/assignments',TeacherAssignments],
 ['/teacher/submissions',TeacherSubmissions],
 ['/teacher/quizzes',TeacherQuizManagement],
 ['/teacher/attendance',TeacherAttendance],
 ['/teacher/students',TeacherStudents],
 ['/admin/users',AdminUsers],
 ['/admin/students',AdminStudents],
 ['/admin/teachers',AdminTeachers],
 ['/admin/courses',AdminCourses],
 ['/admin/categories',AdminCategories],
 ['/admin/enrollments',AdminEnrollments],
 ['/admin/payments',AdminPayments],
 ['/admin/exams',AdminExams],
 ['/admin/notices',AdminNotices],
 ['/admin/reports',AdminReports],
 ['/admin/settings',AdminSettings]
];
export function AppRoutes(){return <SiteLayout><Routes>
 <Route path="/" element={<Home/>}/><Route path="/login" element={<Login/>}/><Route path="/signup" element={<Signup/>}/><Route path="/forgot-password" element={<ForgotPassword/>}/><Route path="/reset-password" element={<ResetPassword/>}/>
 <Route path="/student/dashboard" element={<ProtectedRoute roles={['student','admin']}><StudentDashboard/></ProtectedRoute>}/>
 <Route path="/teacher/dashboard" element={<ProtectedRoute roles={['teacher','admin']}><TeacherDashboard/></ProtectedRoute>}/>
 <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard/></ProtectedRoute>}/>
 <Route path="/dashboard" element={<ProtectedRoute><StudentDashboard/></ProtectedRoute>}/>
 {routes.map(([path,Page])=><Route key={path} path={path} element={<ProtectedRoute><Page/></ProtectedRoute>}/>)}
 <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/><Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>}/><Route path="*" element={<NotFound/>}/>
 </Routes></SiteLayout>}
