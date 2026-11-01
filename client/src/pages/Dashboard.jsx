import { useAuth } from "../hooks/useAuth";
import Loader from "../components/common/Loader";
import { ROLES } from "../utils/format";
import StudentDashboard from "../features/dashboard/StudentDashboard";
import TeacherDashboard from "../features/dashboard/TeacherDashboard";
import AdminDashboard from "../features/dashboard/AdminDashboard";

export default function Dashboard() {
  const { profile, role } = useAuth();
  if (!profile) return <Loader full />;

  return (
    <div className="container">
      <h1 style={{ fontSize: "2.2rem" }}>স্বাগতম, {profile.full_name || "বন্ধু"}</h1>
      <p className="muted">আপনার ভূমিকা: {ROLES[role]}</p>
      {role === "admin" ? <AdminDashboard /> : role === "teacher" ? <TeacherDashboard /> : <StudentDashboard />}
    </div>
  );
}
