import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/common/Loader";
import Empty from "../../components/common/Empty";
import Alert from "../../components/ui/Alert";
import CourseCard from "../courses/CourseCard";
import NoticeBoard from "../notices/NoticeBoard";
import { listEnrolledCourses } from "../courses/api";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data, loading, error } = useFetch(() => listEnrolledCourses(user.id), [user.id]);

  return (
    <div className="stack">
      <section>
        <h2>আমার কোর্স</h2>
        <Alert>{error}</Alert>
        {loading ? <Loader /> : data?.length ? (
          <div className="grid">{data.map((c) => <CourseCard key={c.id} course={c} />)}</div>
        ) : (
          <Empty>আপনি এখনো কোনো কোর্সে ভর্তি হননি। <Link to="/courses">কোর্সগুলো দেখুন</Link></Empty>
        )}
      </section>
      <section>
        <h2>সাম্প্রতিক নোটিশ</h2>
        <NoticeBoard />
      </section>
    </div>
  );
}
