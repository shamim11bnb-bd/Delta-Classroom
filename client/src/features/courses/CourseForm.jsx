import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { createCourse, updateCourse } from "./api";

export default function CourseForm({ course, onSaved }) {
  const [form, setForm] = useState({
    title: course?.title ?? "",
    description: course?.description ?? "",
    category: course?.category ?? "সাধারণ",
    level: course?.level ?? "beginner",
    price: course?.price ?? 0,
    is_published: course?.is_published ?? false,
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const saved = course ? await updateCourse(course.id, form) : await createCourse(form);
      onSaved?.(saved);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Alert>{error}</Alert>
      <Input label="কোর্সের নাম" required value={form.title} onChange={set("title")} />
      <Input label="বিবরণ" as="textarea" value={form.description} onChange={set("description")} />
      <Input label="বিষয়" value={form.category} onChange={set("category")} />
      <Input label="স্তর" as="select" value={form.level} onChange={set("level")}>
        <option value="beginner">শুরুর স্তর</option>
        <option value="intermediate">মাঝারি</option>
        <option value="advanced">উচ্চ স্তর</option>
      </Input>
      <Input label="মূল্য (৳, ০ হলে বিনামূল্যে)" type="number" min="0" value={form.price} onChange={set("price")} />
      <label className="check">
        <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
        কোর্সটি প্রকাশ করুন (সবাই দেখতে পাবে)
      </label>
      <Button type="submit" loading={busy}>{course ? "পরিবর্তন সংরক্ষণ করুন" : "কোর্স তৈরি করুন"}</Button>
    </form>
  );
}
