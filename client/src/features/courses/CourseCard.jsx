import { Link } from "react-router-dom";
import { LEVELS, formatPrice } from "../../utils/format";

export default function CourseCard({ course }) {
  return (
    <article className="card course-card">
      <span className="tag">{course.category}</span>
      <h3>
        <Link to={`/courses/${course.id}`}>{course.title}</Link>
      </h3>
      <p className="muted" style={{ margin: 0 }}>
        {course.description.slice(0, 110)}{course.description.length > 110 ? "…" : ""}
      </p>
      <div className="meta">
        {course.teacher?.full_name} · {LEVELS[course.level]}
        {!course.is_published && " · খসড়া"}
      </div>
      <div className="foot">
        <span className="price">{formatPrice(course.price)}</span>
        <Link className="btn btn-ghost btn-sm" to={`/courses/${course.id}`}>বিস্তারিত দেখুন</Link>
      </div>
    </article>
  );
}
