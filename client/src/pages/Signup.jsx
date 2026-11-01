import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SignupForm from "../features/auth/SignupForm";

export default function Signup() {
  const { user, loading } = useAuth();
  if (!loading && user) return <Navigate to="/dashboard" replace />;
  return <div className="container"><SignupForm /></div>;
}
