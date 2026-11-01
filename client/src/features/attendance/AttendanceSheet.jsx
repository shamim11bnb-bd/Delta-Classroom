import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/common/Loader";
import Empty from "../../components/common/Empty";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import { STATUS, formatDate, today } from "../../utils/format";
import { listStudents } from "../courses/api";
import { listAttendanceByDate, listMyAttendance, markAttendance } from "./api";

function TeacherSheet({ courseId }) {
  const [date, setDate] = useState(today());
  const students = useFetch(() => listStudents(courseId), [courseId]);
  const saved = useFetch(() => listAttendanceByDate(courseId, date), [courseId, date]);
  const [status, setStatus] = useState({});
  const [msg, setMsg] = useState({ type: "ok", text: "" });
  const [busy, setBusy] = useState(false);

  // তারিখ বদলালে আগের সংরক্ষিত তথ্য দিয়ে ফর্ম ভরা হয়
  useEffect(() => {
    const map = {};
    saved.data?.forEach((r) => (map[r.student_id] = r.status));
    setStatus(map);
  }, [saved.data]);

  if (students.loading) return <Loader />;
  if (!students.data?.length) return <Empty>এই কোর্সে এখনো কোনো শিক্ষার্থী ভর্তি হয়নি।</Empty>;

  async function save() {
    setBusy(true);
    setMsg({ type: "ok", text: "" });
    try {
      const records = students.data.map((s) => ({ student_id: s.id, status: status[s.id] || "absent" }));
      await markAttendance({ course_id: courseId, class_date: date, records });
      setMsg({ type: "ok", text: "উপস্থিতি সংরক্ষণ করা হয়েছে" });
      saved.reload();
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="stack">
      <label className="field" style={{ maxWidth: 260 }}>
        <span>ক্লাসের তারিখ</span>
        <input className="input" type="date" value={date} max={today()} onChange={(e) => setDate(e.target.value)} />
      </label>
      <Alert type={msg.type}>{msg.text}</Alert>
      <div className="table-wrap">
        <table>
          <thead><tr><th>শিক্ষার্থী</th><th>অবস্থা</th></tr></thead>
          <tbody>
            {students.data.map((s) => (
              <tr key={s.id}>
                <td>{s.full_name}</td>
                <td>
                  <select className="input" style={{ maxWidth: 180 }} value={status[s.id] || "absent"}
                    onChange={(e) => setStatus({ ...status, [s.id]: e.target.value })} aria-label={`${s.full_name}-এর উপস্থিতি`}>
                    {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={save} loading={busy}>উপস্থিতি সংরক্ষণ করুন</Button>
    </div>
  );
}

function StudentView({ courseId, userId }) {
  const { data, loading } = useFetch(() => listMyAttendance(courseId, userId), [courseId, userId]);
  if (loading) return <Loader />;
  if (!data?.length) return <Empty>এখনো কোনো উপস্থিতি নেওয়া হয়নি।</Empty>;
  const present = data.filter((r) => r.status !== "absent").length;
  return (
    <div className="stack">
      <p><b>{data.length}</b> দিনের মধ্যে <b>{present}</b> দিন উপস্থিত ছিলেন।</p>
      <table>
        <thead><tr><th>তারিখ</th><th>অবস্থা</th></tr></thead>
        <tbody>{data.map((r) => <tr key={r.id}><td>{formatDate(r.class_date)}</td><td>{STATUS[r.status]}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export default function AttendanceSheet({ courseId, isTeacher, userId }) {
  return isTeacher ? <TeacherSheet courseId={courseId} /> : <StudentView courseId={courseId} userId={userId} />;
}
