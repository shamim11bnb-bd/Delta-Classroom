import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/common/Loader";
import Empty from "../../components/common/Empty";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import { deleteLesson, listLessons } from "./api";
import LessonForm from "./LessonForm";

export default function LessonList({ courseId, isTeacher, isMember }) {
  const { data: lessons, loading, error, reload } = useFetch(() => listLessons(courseId), [courseId]);

  if (loading) return <Loader />;
  return (
    <div className="stack">
      <Alert>{error}</Alert>
      {!isMember && (
        <Alert type="ok">ভর্তি হলে কোর্সের সব পাঠ দেখতে পাবেন। নিচে শুধু ফ্রি প্রিভিউ পাঠগুলো দেখা যাচ্ছে।</Alert>
      )}
      {lessons?.length === 0 && <Empty>এখনো কোনো পাঠ যোগ করা হয়নি।</Empty>}
      <ul className="list">
        {lessons?.map((l) => (
          <li key={l.id}>
            <div className="row between">
              <h3 style={{ margin: 0 }}>{l.title} {l.is_preview && <span className="tag">ফ্রি প্রিভিউ</span>}</h3>
              {isTeacher && (
                <Button size="sm" variant="danger"
                  onClick={async () => { if (confirm("পাঠটি মুছে ফেলবেন?")) { await deleteLesson(courseId, l.id); reload(); } }}>
                  মুছুন
                </Button>
              )}
            </div>
            {l.content && <p style={{ whiteSpace: "pre-wrap" }}>{l.content}</p>}
            <div className="row">
              {l.video_url && <a className="btn btn-ghost btn-sm" href={l.video_url} target="_blank" rel="noreferrer">ভিডিও দেখুন</a>}
              {l.material_url && <a className="btn btn-ghost btn-sm" href={l.material_url} target="_blank" rel="noreferrer">ম্যাটেরিয়াল খুলুন</a>}
            </div>
          </li>
        ))}
      </ul>
      {isTeacher && <LessonForm courseId={courseId} nextPosition={lessons?.length ?? 0} onSaved={reload} />}
    </div>
  );
}
