import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";

export default function SignupForm() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await signUp(form);
      if (data.session) navigate("/dashboard", { replace: true });
      else setInfo("আপনার ইমেইলে একটি কনফার্মেশন লিংক পাঠানো হয়েছে। লিংকে ক্লিক করে তারপর লগইন করুন।");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card auth-box" onSubmit={onSubmit}>
      <h2>নতুন অ্যাকাউন্ট</h2>
      <Alert>{error}</Alert>
      <Alert type="ok">{info}</Alert>
      <Input label="পুরো নাম" required value={form.fullName} onChange={set("fullName")} autoComplete="name" />
      <Input label="ইমেইল" type="email" required value={form.email} onChange={set("email")} autoComplete="email" />
      <Input label="পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)" type="password" minLength={6} required value={form.password} onChange={set("password")} autoComplete="new-password" />
      <Input label="আমি একজন" as="select" value={form.role} onChange={set("role")}>
        <option value="student">শিক্ষার্থী</option>
        <option value="teacher">শিক্ষক</option>
      </Input>
      <Button type="submit" loading={busy}>অ্যাকাউন্ট খুলুন</Button>
      <p className="muted" style={{ marginTop: "1rem" }}>
        আগে থেকেই অ্যাকাউন্ট আছে? <Link to="/login">লগইন করুন</Link>
      </p>
    </form>
  );
}
