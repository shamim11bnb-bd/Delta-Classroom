import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";
import Loader from "../components/common/Loader";
import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Sidebar from "../components/layout/Sidebar";
import { LEVELS, formatPrice } from "../utils/format";
import { deleteCourse, enroll, getCourse, isEnrolled } from "../features/courses/api";
import CourseForm from "../features/courses/CourseForm";
import LessonList from "../features/classroom/LessonList";
import AssignmentList from "../features/assignments/AssignmentList";
import QuizPlayer from "../features/quiz/QuizPlayer";
import AttendanceSheet from "../features/attendance/AttendanceSheet";
import NoticeBoard from "../features/notices/NoticeBoard";

const TABS = [
  { key: "lessons", label: "পাঠ" },
  { key: "assignments", label: "অ্যাসাইনমেন্ট" },
  { key: "quiz", label: "কুইজ" },
  { key: "attendance", label: "উপস্থিতি" },
  { key: "notices", label: "নোটিশ" },
];

export default function CourseDetail() {
  const { id } = useParams();
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const course = useFetch(() => getCourse(id), [id]);
  const enrolled = useFetch(() => isEnrolled(id, user?.id), [id, user?.id]);
  const [tab, setTab] = useState("lessons");
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  if (course.loading || enrolled.loading) return <Loader full />;
  if (course.error || !course.data)
    return <div className="container"><Alert>কোর্সটি পাওয়া যায়নি বা আপনি এটি দেখতে পারবেন না।</Alert><Link to="/courses">সব কোর্সে ফিরুন</Link></div>;

  const c = course.data;
  const isTeacher = !!user && (c.teacher_id === user.id || role === "admin");
  const isMember = isTeacher || enrolled.data;

  async function onEnroll() {
    if (!user) return navigate("/login", { state: { from: { pathname: `/courses/${id}` } } });
    setBusy(true);
    setMsg("");
    try {
      await enroll(id);
      enrolled.reload();
    } catch (e) {
      setMsg(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container">
      <div className="row between" style={{ alignItems: "flex-start" }}>
        <div>
          <span className="tag">{c.category}</span>
          <h1 style={{ fontSize: "2.4rem", marginTop: ".5rem" }}>{c.title}</h1>
          <p className="muted">শিক্ষক: {c.teacher?.full_name} · {LEVELS[c.level]} · <span className="price">{formatPrice(c.price)}</span>{!c.is_published && " · খসড়া"}</p>
        </div>
        <div className="row">
          {isTeacher ? (
            <>
              <Button variant="ghost" onClick={() => setEditing(true)}>কোর্স সম্পাদনা</Button>
              <Button variant="danger" onClick={async () => {
                if (confirm("কোর্সটি স্থায়ীভাবে মুছে যাবে। নিশ্চিত?")) { await deleteCourse(id); navigate("/dashboard"); }
              }}>মুছুন</Button>
            </>
          ) : !isMember && role !== "teacher" ? (
            <Button variant="accent" onClick={onEnroll} loading={busy}>কোর্সে ভর্তি হন</Button>
          ) : null}
        </div>
      </div>

      <Alert>{msg}</Alert>
      {c.description && <p style={{ whiteSpace: "pre-wrap" }}>{c.description}</p>}

      <Sidebar items={isMember ? TABS : TABS.slice(0, 1)} active={tab} onChange={setTab} />

      {tab === "lessons" && <LessonList courseId={id} isTeacher={isTeacher} isMember={isMember} />}
      {isMember && tab === "assignments" && <AssignmentList courseId={id} isTeacher={isTeacher} userId={user.id} />}
      {isMember && tab === "quiz" && <QuizPlayer courseId={id} isTeacher={isTeacher} userId={user.id} />}
      {isMember && tab === "attendance" && <AttendanceSheet courseId={id} isTeacher={isTeacher} userId={user.id} />}
      {isMember && tab === "notices" && <NoticeBoard courseId={id} canPost={isTeacher} />}

      <Modal open={editing} title="কোর্স সম্পাদনা" onClose={() => setEditing(false)}>
        <CourseForm course={c} onSaved={() => { setEditing(false); course.reload(); }} />
      </Modal>
    </div>
  );
}
