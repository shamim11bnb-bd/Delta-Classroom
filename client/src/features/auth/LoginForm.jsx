import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";

export default function LoginForm() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signIn(form.email, form.password);
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card auth-box" onSubmit={onSubmit}>
      <h2>লগইন করুন</h2>
      <Alert>{error}</Alert>
      <Input label="ইমেইল" type="email" required value={form.email} onChange={set("email")} autoComplete="email" />
      <Input label="পাসওয়ার্ড" type="password" required value={form.password} onChange={set("password")} autoComplete="current-password" />
      <Button type="submit" loading={busy}>লগইন</Button>
      <p className="muted" style={{ marginTop: "1rem" }}>
        অ্যাকাউন্ট নেই? <Link to="/signup">নতুন অ্যাকাউন্ট খুলুন</Link>
      </p>
    </form>
  );
}
