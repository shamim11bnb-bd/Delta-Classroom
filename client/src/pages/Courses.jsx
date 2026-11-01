import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Loader from "../components/common/Loader";
import Empty from "../components/common/Empty";
import Alert from "../components/ui/Alert";
import CourseCard from "../features/courses/CourseCard";
import { listCourses } from "../features/courses/api";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const { data, loading, error } = useFetch(() => listCourses({ search: query }), [query]);

  return (
    <div className="container">
      <h1 style={{ fontSize: "2.2rem" }}>সব কোর্স</h1>
      <form className="row" style={{ marginBottom: "1.5rem" }} onSubmit={(e) => { e.preventDefault(); setQuery(search.trim()); }}>
        <input className="input" style={{ maxWidth: 360 }} placeholder="কোর্সের নাম লিখে খুঁজুন" value={search}
          onChange={(e) => setSearch(e.target.value)} aria-label="কোর্স খুঁজুন" />
        <button className="btn">খুঁজুন</button>
      </form>
      <Alert>{error}</Alert>
      {loading ? <Loader /> : data?.length ? (
        <div className="grid">{data.map((c) => <CourseCard key={c.id} course={c} />)}</div>
      ) : (
        <Empty>{query ? `“${query}” নামে কোনো কোর্স পাওয়া যায়নি।` : "এখনো কোনো কোর্স প্রকাশিত হয়নি।"}</Empty>
      )}
    </div>
  );
}
