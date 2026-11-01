import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../features/auth/LoginForm";

export default function Login() {
  const { user, loading } = useAuth();
  if (!loading && user) return <Navigate to="/dashboard" replace />;
  return <div className="container"><LoginForm /></div>;
}
