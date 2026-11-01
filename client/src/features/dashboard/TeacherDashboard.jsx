import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/common/Loader";
import Empty from "../../components/common/Empty";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import CourseCard from "../courses/CourseCard";
import CourseForm from "../courses/CourseForm";
import { listTeachingCourses } from "../courses/api";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { data, loading, error, reload } = useFetch(() => listTeachingCourses(user.id), [user.id]);
  const [open, setOpen] = useState(false);

  return (
    <div className="stack">
      <div className="row between">
        <h2 style={{ margin: 0 }}>আমার পড়ানো কোর্স</h2>
        <Button variant="accent" onClick={() => setOpen(true)}>নতুন কোর্স</Button>
      </div>
      <Alert>{error}</Alert>
      {loading ? <Loader /> : data?.length ? (
        <div className="grid">{data.map((c) => <CourseCard key={c.id} course={c} />)}</div>
      ) : (
        <Empty>এখনো কোনো কোর্স বানাননি। উপরের “নতুন কোর্স” বাটনে ক্লিক করুন।</Empty>
      )}
      <Modal open={open} title="নতুন কোর্স" onClose={() => setOpen(false)}>
        <CourseForm onSaved={() => { setOpen(false); reload(); }} />
      </Modal>
    </div>
  );
}
