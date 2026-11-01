import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { createAssignment } from "./api";

export default function AssignmentForm({ courseId, onSaved }) {
  const empty = { title: "", description: "", due_at: "", max_marks: 100 };
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await createAssignment({ ...form, course_id: courseId });
      setForm(empty);
      onSaved?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>নতুন অ্যাসাইনমেন্ট</h3>
      <Alert>{error}</Alert>
      <Input label="শিরোনাম" required value={form.title} onChange={set("title")} />
      <Input label="নির্দেশনা" as="textarea" value={form.description} onChange={set("description")} />
      <Input label="জমা দেওয়ার শেষ সময়" type="datetime-local" value={form.due_at} onChange={set("due_at")} />
      <Input label="পূর্ণ নম্বর" type="number" min="1" value={form.max_marks} onChange={set("max_marks")} />
      <Button type="submit" loading={busy}>অ্যাসাইনমেন্ট দিন</Button>
    </form>
  );
}
