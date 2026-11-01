import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/common/Loader";
import Empty from "../../components/common/Empty";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import { formatDateTime } from "../../utils/format";
import { gradeSubmission, listAssignments, listMySubmissions, listSubmissions, submitAssignment } from "./api";
import AssignmentForm from "./AssignmentForm";

function SubmitBox({ assignment, mine, onDone }) {
  const [text, setText] = useState(mine?.answer_text ?? "");
  const [url, setUrl] = useState(mine?.file_url ?? "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function send(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await submitAssignment(assignment.id, { answer_text: text, file_url: url });
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={send}>
      <Alert>{error}</Alert>
      <Input label="আপনার উত্তর" as="textarea" value={text} onChange={(e) => setText(e.target.value)} />
      <Input label="ফাইলের লিংক (ঐচ্ছিক)" type="url" placeholder="https://" value={url} onChange={(e) => setUrl(e.target.value)} />
      <Button type="submit" loading={busy}>{mine ? "আবার জমা দিন" : "জমা দিন"}</Button>
    </form>
  );
}

function Grader({ assignment }) {
  const { data, loading, reload } = useFetch(() => listSubmissions(assignment.id), [assignment.id]);
  const [marks, setMarks] = useState({});
  const [error, setError] = useState("");

  if (loading) return <Loader />;
  if (!data?.length) return <Empty>এখনো কেউ জমা দেয়নি।</Empty>;

  async function save(s) {
    setError("");
    try {
      await gradeSubmission(s.id, { marks: marks[s.id] ?? s.marks ?? 0, feedback: s.feedback ?? "" });
      reload();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="table-wrap">
      <Alert>{error}</Alert>
      <table>
        <thead>
          <tr><th>শিক্ষার্থী</th><th>উত্তর</th><th>জমার সময়</th><th>নম্বর / {assignment.max_marks}</th><th></th></tr>
        </thead>
        <tbody>
          {data.map((s) => (
            <tr key={s.id}>
              <td>{s.student?.full_name}</td>
              <td>
                {s.answer_text.slice(0, 120)}
                {s.file_url && <> <a href={s.file_url} target="_blank" rel="noreferrer">ফাইল</a></>}
              </td>
              <td>{formatDateTime(s.submitted_at)}</td>
              <td>
                <input className="input" style={{ width: 90 }} type="number" min="0" max={assignment.max_marks}
                  defaultValue={s.marks ?? ""} onChange={(e) => setMarks({ ...marks, [s.id]: e.target.value })} aria-label="নম্বর" />
              </td>
              <td><Button size="sm" onClick={() => save(s)}>সংরক্ষণ</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AssignmentList({ courseId, isTeacher, userId }) {
  const list = useFetch(() => listAssignments(courseId), [courseId]);
  const mine = useFetch(() => (isTeacher ? [] : listMySubmissions(userId)), [isTeacher, userId]);
  const [open, setOpen] = useState(null);

  if (list.loading || mine.loading) return <Loader />;
  const submissionOf = (id) => mine.data?.find((s) => s.assignment_id === id);

  return (
    <div className="stack">
      <Alert>{list.error || mine.error}</Alert>
      {list.data?.length === 0 && <Empty>এখনো কোনো অ্যাসাইনমেন্ট নেই।</Empty>}
      <ul className="list">
        {list.data?.map((a) => {
          const s = submissionOf(a.id);
          return (
            <li key={a.id}>
              <div className="row between">
                <div>
                  <h3 style={{ margin: 0 }}>{a.title}</h3>
                  <span className="muted">
                    পূর্ণ নম্বর {a.max_marks}{a.due_at && ` · শেষ সময়: ${formatDateTime(a.due_at)}`}
                  </span>
                </div>
                {isTeacher ? (
                  <Button size="sm" variant="ghost" onClick={() => setOpen(a)}>জমাগুলো দেখুন</Button>
                ) : (
                  <Button size="sm" onClick={() => setOpen(a)}>{s ? "আপনার জমা" : "জমা দিন"}</Button>
                )}
              </div>
              {a.description && <p style={{ whiteSpace: "pre-wrap", marginTop: ".75rem" }}>{a.description}</p>}
              {s && !isTeacher && (
                <Alert type="ok">
                  জমা দেওয়া হয়েছে। {s.marks != null ? `প্রাপ্ত নম্বর: ${s.marks}/${a.max_marks}` : "নম্বরের অপেক্ষায়।"}
                  {s.feedback && ` মন্তব্য: ${s.feedback}`}
                </Alert>
              )}
            </li>
          );
        })}
      </ul>

      <Modal open={!!open} title={open?.title} onClose={() => setOpen(null)}>
        {open && (isTeacher
          ? <Grader assignment={open} />
          : <SubmitBox assignment={open} mine={submissionOf(open.id)} onDone={() => { setOpen(null); mine.reload(); }} />)}
      </Modal>

      {isTeacher && <AssignmentForm courseId={courseId} onSaved={list.reload} />}
    </div>
  );
}
