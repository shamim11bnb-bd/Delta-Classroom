
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import CourseCard from "../features/courses/CourseCard";
import { listCourses } from "../features/courses/api";

function StudentIllustration() {
  return (
    <svg viewBox="0 0 560 460" className="premium-student-art"
      xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="ল্যাপটপ ও বই নিয়ে পড়াশোনা করছে একজন শিক্ষার্থী">

      <defs>
        <linearGradient id="artBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#153D50"/>
          <stop offset="100%" stopColor="#10283B"/>
        </linearGradient>
        <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#31B6AC"/>
          <stop offset="100%" stopColor="#167D88"/>
        </linearGradient>
      </defs>

      <circle cx="280" cy="220" r="190" fill="#1B5260" opacity=".25"/>
      <circle cx="280" cy="220" r="145" fill="#1D6670" opacity=".18"/>

      <rect x="105" y="65" width="350" height="260"
        rx="28" fill="url(#artBg)" stroke="#397B83" strokeWidth="2"/>

      <rect x="125" y="85" width="310" height="220"
        rx="17" fill="#102D40"/>

      <rect x="155" y="112" width="250" height="155"
        rx="12" fill="url(#screen)"/>

      <path d="M180 160 L225 205 L275 145"
        stroke="#D9FFEF" strokeWidth="12"
        strokeLinecap="round" strokeLinejoin="round" fill="none"/>

      <circle cx="340" cy="155" r="23" fill="#E9B65B"/>
      <rect x="315" y="194" width="65" height="9" rx="5"
        fill="#C7F2E9" opacity=".8"/>

      <path d="M80 325 L480 325 L450 350 L110 350 Z"
        fill="#A9C8CF"/>
      <path d="M110 350 L450 350 L420 366 L140 366 Z"
        fill="#527A88"/>

      <path d="M215 366 C215 325 230 305 280 305
        C330 305 345 325 345 366 Z" fill="#E9A23B"/>

      <path d="M190 366 C180 310 205 275 250 275
        L310 275 C355 275 380 310 370 366 Z"
        fill="#1D8C91"/>

      <circle cx="280" cy="220" r="1" fill="white"/>

      <ellipse cx="280" cy="220" rx="1" ry="1" fill="none"/>

      <circle cx="280" cy="220" r="0" fill="none"/>

      <path d="M236 225 C228 184 246 150 280 150
        C314 150 332 184 324 225
        C319 253 300 270 280 270
        C260 270 241 253 236 225Z"
        fill="#D99B73"/>

      <path d="M235 210 C225 167 250 128 291 135
        C321 138 336 165 326 197
        C308 185 292 176 270 180
        C258 195 248 203 235 210Z"
        fill="#172B3C"/>

      <path d="M255 225 Q263 230 271 225"
        stroke="#563B32" strokeWidth="3" fill="none"
        strokeLinecap="round"/>
      <path d="M290 225 Q298 230 306 225"
        stroke="#563B32" strokeWidth="3" fill="none"
        strokeLinecap="round"/>

      <path d="M270 250 Q280 258 290 250"
        stroke="#8A4C48" strokeWidth="3" fill="none"
        strokeLinecap="round"/>

      <path d="M170 385 L280 365 L390 385 L280 410 Z"
        fill="#F1B84E"/>
      <path d="M170 385 L280 410 L280 423 L170 398 Z"
        fill="#D58C2E"/>
      <path d="M390 385 L280 410 L280 423 L390 398 Z"
        fill="#B97827"/>

      <path d="M185 385 L280 402 L375 385"
        stroke="#FFF0C9" strokeWidth="3" fill="none"/>

      <circle cx="80" cy="130" r="8" fill="#E9A23B"/>
      <circle cx="470" cy="190" r="7" fill="#47C6B5"/>
      <circle cx="440" cy="80" r="5" fill="#E9A23B"/>
      <path d="M65 230 L80 245 L95 230"
        stroke="#4BC6B8" strokeWidth="5" fill="none"
        strokeLinecap="round"/>
      <path d="M455 275 L470 290 L485 275"
        stroke="#E9A23B" strokeWidth="5" fill="none"
        strokeLinecap="round"/>
    </svg>
  );
}

export default function Home() {
  const { data } = useFetch(() => listCourses({ limit: 3 }), []);

  return (
    <>
      <section className="premium-hero">
        <div className="premium-glow premium-glow-one" />
        <div className="premium-glow premium-glow-two" />

        <div className="premium-hero-container">

          <div className="premium-hero-content">
            <div className="premium-badge">
              <span className="premium-badge-dot" />
              স্মার্ট লার্নিং প্ল্যাটফর্ম
            </div>

            <h1>
              শেখার নতুন
              <span> ঠিকানা,</span>
              <br />
              <strong>SA Delta Classroom</strong>
            </h1>

            <p className="premium-description">
              আপনার শেখার যাত্রা হোক আরও সহজ ও আনন্দময়।
              মানসম্মত কোর্স, অভিজ্ঞ শিক্ষক এবং আধুনিক
              অনলাইন ক্লাসরুম—সবকিছু এক জায়গায়।
            </p>

            <div className="premium-actions">
              <Link to="/courses" className="premium-primary-btn">
                কোর্স দেখুন <span>→</span>
              </Link>

              <Link to="/signup" className="premium-secondary-btn">
                বিনামূল্যে শুরু করুন
              </Link>
            </div>

            <div className="premium-highlights">
              <div>
                <span className="highlight-icon">✓</span>
                নিজের গতিতে শিখুন
              </div>
              <div>
                <span className="highlight-icon">✓</span>
                যেকোনো সময় ক্লাস
              </div>
            </div>
          </div>

          <div className="premium-hero-visual">
            <div className="premium-art-frame">
              <div className="art-top-label">
                <span className="art-live-dot" />
                LEARNING IN PROGRESS
              </div>

              <StudentIllustration />

              <div className="art-floating-card">
                <span className="floating-icon">✦</span>
                <div>
                  <strong>শিখুন প্রতিদিন</strong>
                  <small>Build your future</small>
                </div>
              </div>

              <div className="art-bottom-label">
                <span>✦</span> Learn • Grow • Succeed
              </div>
            </div>
          </div>

        </div>

        <div className="premium-hero-bottom">
          <span>শিক্ষার শক্তিতে গড়ি আগামীর বাংলাদেশ</span>
          <span className="bottom-line" />
        </div>
      </section>

      <section className="section container">
        <div className="pillars">
          <div>
            <h3>পাঠ ও ম্যাটেরিয়াল</h3>
            <p>ভিডিও, নোট আর PDF এক জায়গায়। কোর্সে ভর্তি হলেই সব পাঠ খুলে যায়।</p>
          </div>
          <div>
            <h3>অ্যাসাইনমেন্ট ও কুইজ</h3>
            <p>উত্তর জমা দিন, নম্বর ও মন্তব্য পান। কুইজের ফলাফল সাথে সাথে দেখুন।</p>
          </div>
          <div>
            <h3>উপস্থিতি ও নোটিশ</h3>
            <p>প্রতিটি ক্লাসের উপস্থিতি আর শিক্ষকের নোটিশ সবসময় হাতের কাছে।</p>
          </div>
        </div>
      </section>

      {data?.length > 0 && (
        <section className="container" style={{ paddingBottom: "3rem" }}>
          <div className="row between">
            <h2>নতুন কোর্স</h2>
            <Link to="/courses">সব কোর্স দেখুন</Link>
          </div>
          <div className="grid">
            {data.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
