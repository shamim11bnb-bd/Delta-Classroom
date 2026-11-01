import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { addLesson } from "./api";

export default function LessonForm({ courseId, nextPosition, onSaved }) {
  const empty = { title: "", content: "", video_url: "", material_url: "", is_preview: false };
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await addLesson(courseId, { ...form, position: nextPosition });
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
      <h3>নতুন পাঠ যোগ করুন</h3>
      <Alert>{error}</Alert>
      <Input label="পাঠের নাম" required value={form.title} onChange={set("title")} />
      <Input label="বিবরণ / নোট" as="textarea" value={form.content} onChange={set("content")} />
      <Input label="ভিডিও লিংক (YouTube unlisted ইত্যাদি)" type="url" placeholder="https://" value={form.video_url} onChange={set("video_url")} />
      <Input label="ম্যাটেরিয়াল লিংক (PDF, Drive ইত্যাদি)" type="url" placeholder="https://" value={form.material_url} onChange={set("material_url")} />
      <label className="check">
        <input type="checkbox" checked={form.is_preview} onChange={(e) => setForm({ ...form, is_preview: e.target.checked })} />
        ভর্তির আগেই ফ্রি প্রিভিউ হিসেবে দেখানো হবে
      </label>
      <Button type="submit" loading={busy}>পাঠ যোগ করুন</Button>
    </form>
  );
}
