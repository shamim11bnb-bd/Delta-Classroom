import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/common/Loader";
import Empty from "../../components/common/Empty";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { formatDateTime } from "../../utils/format";
import { createNotice, deleteNotice, listCourseNotices, listRecentNotices } from "./api";

// courseId না দিলে ড্যাশবোর্ডের সাম্প্রতিক নোটিশ দেখায়
export default function NoticeBoard({ courseId, canPost = false }) {
  const { data, loading, error, reload } = useFetch(
    () => (courseId ? listCourseNotices(courseId) : listRecentNotices()),
    [courseId]
  );
  const [form, setForm] = useState({ title: "", body: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function post(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      await createNotice({ ...form, course_id: courseId ?? null });
      setForm({ title: "", body: "" });
      reload();
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <Loader />;
  return (
    <div className="stack">
      <Alert>{error}</Alert>
      {data?.length === 0 && <Empty>এখনো কোনো নোটিশ নেই।</Empty>}
      <ul className="list">
        {data?.map((n) => (
          <li key={n.id}>
            <div className="row between">
              <h3 style={{ margin: 0 }}>{n.title}</h3>
              {canPost && courseId && (
                <Button size="sm" variant="danger" onClick={async () => { await deleteNotice(n.id); reload(); }}>মুছুন</Button>
              )}
            </div>
            <span className="muted">{n.author?.full_name} · {formatDateTime(n.created_at)}</span>
            {n.body && <p style={{ whiteSpace: "pre-wrap", marginTop: ".5rem" }}>{n.body}</p>}
          </li>
        ))}
      </ul>

      {canPost && (
        <form className="card" onSubmit={post}>
          <h3>নতুন নোটিশ</h3>
          <Alert>{err}</Alert>
          <Input label="শিরোনাম" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input label="বিস্তারিত" as="textarea" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          <Button type="submit" loading={busy}>নোটিশ দিন</Button>
        </form>
      )}
    </div>
  );
}
