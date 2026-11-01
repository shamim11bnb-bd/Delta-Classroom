import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import CourseCard from "../features/courses/CourseCard";
import { listCourses } from "../features/courses/api";

// একটি মোহনা থেকে ছড়িয়ে পড়া ধারা: Delta নামের প্রতীক
function DeltaArt() {
  return (
    <svg className="hero-art" viewBox="0 0 420 340" fill="none" strokeLinecap="round" aria-hidden="true">
      <path className="stream" d="M210 10 C210 90 210 140 210 190" stroke="#5FC1C9" strokeWidth="8" />
      <path className="stream" d="M210 190 C170 230 110 260 50 320" stroke="#5FC1C9" strokeWidth="6" />
      <path className="stream" d="M210 190 C195 240 170 280 140 330" stroke="#5FC1C9" strokeWidth="5" />
      <path className="stream" d="M210 190 C225 240 250 280 280 330" stroke="#E9A23B" strokeWidth="5" />
      <path className="stream" d="M210 190 C250 230 310 260 370 320" stroke="#E9A23B" strokeWidth="6" />
    </svg>
  );
}

export default function Home() {
  const { data } = useFetch(() => listCourses({ limit: 3 }), []);

  return (
    <>
      <section className="hero" style={{ margin: "-2rem 0 0" }}>
        <div className="container">
          <div>
            <h1>একটাই ক্লাসরুম, সবার জন্য</h1>
            <p>বাংলায় লেখা কোর্স, ঘরে বসে ক্লাস, নিজের গতিতে শেখা। শিক্ষক পাঠ ও অ্যাসাইনমেন্ট দেন, শিক্ষার্থী জমা দেয়, ফলাফল সাথে সাথে।</p>
            <div className="row">
              <Link to="/courses" className="btn btn-accent">কোর্স দেখুন</Link>
              <Link to="/signup" className="btn btn-ghost" style={{ color: "#fff", borderColor: "#3d6171" }}>শিক্ষক হিসেবে যোগ দিন</Link>
            </div>
          </div>
          <DeltaArt />
        </div>
      </section>

      <section className="section container">
        <div className="pillars">
          <div>
            <h3>পাঠ ও ম্যাটেরিয়াল</h3>
            <p>ভিডিও, নোট আর PDF এক জায়গায়। কোর্সে ভর্তি হলেই সব পাঠ খুলে যায়।</p>
          </div>
          <div>
            <h3>অ্যাসাইনমেন্ট ও কুইজ</h3>
            <p>উত্তর জমা দিন, নম্বর ও মন্তব্য পান। কুইজের ফলাফল সাথে সাথে দেখুন।</p>
          </div>
          <div>
            <h3>উপস্থিতি ও নোটিশ</h3>
            <p>প্রতিটি ক্লাসের উপস্থিতি আর শিক্ষকের নোটিশ সবসময় হাতের কাছে।</p>
          </div>
        </div>
      </section>

      {data?.length > 0 && (
        <section className="container" style={{ paddingBottom: "3rem" }}>
          <div className="row between">
            <h2>নতুন কোর্স</h2>
            <Link to="/courses">সব কোর্স দেখুন</Link>
          </div>
          <div className="grid">{data.map((c) => <CourseCard key={c.id} course={c} />)}</div>
        </section>
      )}
    </>
  );
}
