
"use client";

import Link from "next/link";

const courses = [
  {
    title: "Admission Preparation",
    subtitle: "বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি",
    category: "ADMISSION",
    price: "৳১,৫০০",
    oldPrice: "৳২,০০০",
    color: "teal",
    icon: "🎓",
  },
  {
    title: "HSC Academic Course",
    subtitle: "HSC সম্পূর্ণ একাডেমিক কোর্স",
    category: "ACADEMIC",
    price: "৳১,২০০",
    oldPrice: "৳১,৮০০",
    color: "blue",
    icon: "📚",
  },
  {
    title: "English Foundation",
    subtitle: "ইংরেজিতে দক্ষতা অর্জন",
    category: "ENGLISH",
    price: "৳৮০০",
    oldPrice: "৳১,২০০",
    color: "purple",
    icon: "✍️",
  },
  {
    title: "ICT Master Course",
    subtitle: "ICT বেসিক থেকে অ্যাডভান্স",
    category: "ICT",
    price: "৳৯০০",
    oldPrice: "৳১,৩০০",
    color: "orange",
    icon: "💻",
  },
  {
    title: "BCS Preparation",
    subtitle: "প্রতিযোগিতামূলক পরীক্ষার প্রস্তুতি",
    category: "CAREER",
    price: "৳১,৭০০",
    oldPrice: "৳২,২০০",
    color: "pink",
    icon: "🏆",
  },
];

const features = [
  {
    icon: "🎥",
    title: "লাইভ ক্লাস",
    description: "অভিজ্ঞ শিক্ষকদের সাথে সরাসরি ক্লাসে অংশগ্রহণ।",
  },
  {
    icon: "📝",
    title: "অনলাইন পরীক্ষা",
    description: "নিজের প্রস্তুতি যাচাই করতে নিয়মিত পরীক্ষা দাও।",
  },
  {
    icon: "📖",
    title: "প্রশ্ন ব্যাংক",
    description: "বিষয়ভিত্তিক প্রশ্ন ও অনুশীলনের সুবিধা।",
  },
  {
    icon: "📊",
    title: "প্রগ্রেস রিপোর্ট",
    description: "নিজের শেখার অগ্রগতি এক জায়গায় দেখো।",
  },
];

function Logo() {
  return (
    <Link href="/" className="brand-logo" aria-label="Delta Classroom Home">
      <span className="brand-symbol">
        <svg viewBox="0 0 48 48" fill="none">
          <path
            d="M24 5L44 41H4L24 5Z"
            fill="white"
            fillOpacity=".18"
            stroke="white"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M16 31L24 16L32 31"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 27H30"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="brand-text">
        <strong>DELTA</strong>
        <small>CLASSROOM</small>
      </span>
    </Link>
  );
}

function HeroIllustration() {
  return (
    <div className="hero-art">
      <div className="art-glow" />
      <div className="floating-card card-one">
        <span>📚</span>
        <div>
          <strong>Smart Learning</strong>
          <small>Learn every day</small>
        </div>
      </div>

      <div className="floating-card card-two">
        <span>🏆</span>
        <div>
          <strong>Great Progress!</strong>
          <small>Keep it up</small>
        </div>
      </div>

      <div className="student-card">
        <div className="student-window">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <div className="student-scene">
            <div className="sun" />
            <div className="student-head">
              <div className="student-hair" />
              <div className="student-face">
                <i />
                <i />
              </div>
              <div className="student-body" />
            </div>
            <div className="laptop">
              <div className="laptop-screen">Δ</div>
              <div className="laptop-base" />
            </div>
            <div className="book book-a" />
            <div className="book book-b" />
          </div>
        </div>
        <div className="art-caption">
          <span className="caption-icon">✦</span>
          <div>
            <strong>Learn. Grow. Succeed.</strong>
            <small>Your journey starts here</small>
          </div>
        </div>
      </div>
      <div className="art-circle circle-a" />
      <div className="art-circle circle-b" />
    </div>
  );
}

function CourseCard({ course }: { course: (typeof courses)[number] }) {
  return (
    <article className="course-card group">
      <div className={`course-art ${course.color}`}>
        <span className="course-category">{course.category}</span>
        <span className="course-icon">{course.icon}</span>
        <div className="course-decoration" />
      </div>

      <div className="course-content">
        <h3>{course.title}</h3>
        <p>{course.subtitle}</p>
        <div className="course-bottom">
          <div className="course-price">
            <strong>{course.price}</strong>
            <del>{course.oldPrice}</del>
          </div>
          <Link href="/course" className="course-arrow" aria-label="কোর্স দেখুন">
            →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <main className="home-page">
      {/* HEADER */}
      <header className="site-header">
        <div className="container header-inner">
          <Logo />

          <nav className="desktop-nav">
            <Link href="/">হোম</Link>
            <Link href="/course">কোর্সসমূহ</Link>
            <Link href="/exam">পরীক্ষা</Link>
            <Link href="/questionbank">প্রশ্ন ব্যাংক</Link>
            <Link href="/about">আমাদের সম্পর্কে</Link>
          </nav>

          <div className="header-actions">
            <Link href="/login" className="login-link">
              লগইন
            </Link>
            <Link href="/register" className="register-button">
              শুরু করো <span>↗</span>
            </Link>
          </div>

          <Link href="/login" className="mobile-login">
            Login ↗
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-label">
              <span className="label-dot" />
              স্মার্ট লার্নিংয়ের নতুন ঠিকানা
            </div>

            <h1>
              শেখার নতুন
              <br />
              দিগন্তে <span>Delta</span>
              <br />
              Classroom
            </h1>

            <p className="hero-description">
              নিজের স্বপ্ন পূরণের যাত্রা শুরু হোক সঠিক প্রস্তুতি দিয়ে।
              মানসম্মত ক্লাস, অনলাইন পরীক্ষা ও প্রয়োজনীয় শিক্ষাসামগ্রী
              এখন একই প্ল্যাটফর্মে।
            </p>

            <div className="hero-buttons">
              <Link href="/course" className="primary-button">
                কোর্স দেখো <span>↗</span>
              </Link>
              <Link href="/about" className="secondary-button">
                আমাদের সম্পর্কে
                <span className="play-icon">▶</span>
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-avatars">
                <span>🎓</span>
                <span>👨‍🎓</span>
                <span>👩‍🎓</span>
              </div>
              <div>
                <strong>শেখার যাত্রায় একসাথে</strong>
                <small>তোমার লক্ষ্য, আমাদের সহযোগিতা</small>
              </div>
            </div>
          </div>

          <HeroIllustration />
        </div>

        <div className="hero-bottom-shape" />
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item">
            <span>🎓</span>
            <div>
              <strong>অনলাইন শিক্ষা</strong>
              <small>সহজ ও সুন্দর শেখার অভিজ্ঞতা</small>
            </div>
          </div>
          <div className="stat-item">
            <span>📚</span>
            <div>
              <strong>বিভিন্ন কোর্স</strong>
              <small>এক প্ল্যাটফর্মে শেখার সুযোগ</small>
            </div>
          </div>
          <div className="stat-item">
            <span>📝</span>
            <div>
              <strong>নিয়মিত পরীক্ষা</strong>
              <small>নিজেকে যাচাই করার সুবিধা</small>
            </div>
          </div>
          <div className="stat-item">
            <span>🌟</span>
            <div>
              <strong>দক্ষতা উন্নয়ন</strong>
              <small>লক্ষ্য অর্জনে এগিয়ে যাও</small>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="courses-section" id="courses">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">OUR COURSES</span>
              <h2>
                তোমার জন্য সেরা <span>কোর্স</span>
              </h2>
              <p>নিজের প্রয়োজন অনুযায়ী কোর্স বেছে নিয়ে শেখা শুরু করো।</p>
            </div>
            <Link href="/course" className="view-all">
              সব কোর্স দেখো <span>↗</span>
            </Link>
          </div>

          <div className="course-marquee">
            <div className="course-track">
              {[...courses, ...courses].map((course, index) => (
                <div className="course-slide" key={`${course.title}-${index}`}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>

          <div className="slider-hint">
            <span>←</span> কোর্সগুলো দেখতে থাকো <span>→</span>
          </div>
        </div>
      </section>

      {/* EXAM */}
      <section className="exam-section">
        <div className="container exam-grid">
          <div className="exam-content">
            <span className="eyebrow light">PRACTICE & IMPROVE</span>
            <h2>
              প্রস্তুতি যাচাই করো,
              <br />
              আত্মবিশ্বাস <span>বাড়াও।</span>
            </h2>
            <p>
              নিয়মিত অনলাইন পরীক্ষায় অংশগ্রহণ করো। নিজের ফলাফল বিশ্লেষণ
              করে দুর্বল জায়গাগুলো উন্নত করার চেষ্টা করো।
            </p>
            <Link href="/exam" className="exam-button">
              পরীক্ষা শুরু করো <span>↗</span>
            </Link>
          </div>

          <div className="exam-visual">
            <div className="exam-circle" />
            <div className="exam-paper">
              <div className="paper-top">
                <span>Δ</span>
                <small>DELTA CLASSROOM</small>
              </div>
              <h3>Practice Test</h3>
              <p>Test your knowledge</p>
              <div className="paper-line" />
              <div className="question-row">
                <span>01</span>
                <div />
                <i>✓</i>
              </div>
              <div className="question-row">
                <span>02</span>
                <div />
                <i>✓</i>
              </div>
              <div className="question-row">
                <span>03</span>
                <div />
                <i>✓</i>
              </div>
              <div className="paper-progress">
                <span />
              </div>
              <small className="progress-label">Keep Learning!</small>
            </div>
            <div className="exam-badge">✦ Smart Learning</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="container">
          <div className="center-heading">
            <span className="eyebrow">WHY DELTA CLASSROOM</span>
            <h2>
              শেখার জন্য যা কিছু প্রয়োজন,
              <br />
              <span>সব এক জায়গায়</span>
            </h2>
            <p>
              পড়াশোনাকে আরও সহজ, গোছানো ও কার্যকর করতে প্রয়োজনীয়
              সুবিধাগুলো ব্যবহার করো।
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <article className="feature-card" key={feature.title}>
                <div className={`feature-icon feature-${index}`}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="feature-number">
                  0{index + 1}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUESTION BANK */}
      <section className="question-section">
        <div className="container question-box">
          <div className="question-icon">📖</div>
          <div className="question-copy">
            <span className="eyebrow">QUESTION BANK</span>
            <h2>প্রশ্ন অনুশীলন করো নিজের গতিতে</h2>
            <p>
              বিষয়ভিত্তিক প্রশ্ন অনুশীলনের মাধ্যমে নিজের প্রস্তুতিকে
              আরও মজবুত করো।
            </p>
          </div>
          <Link href="/questionbank" className="question-button">
            প্রশ্ন ব্যাংক দেখো <span>↗</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-content">
          <div className="cta-symbol">Δ</div>
          <span className="eyebrow light">YOUR FUTURE STARTS HERE</span>
          <h2>
            আজ থেকেই শুরু হোক
            <br />
            তোমার <span>সফলতার যাত্রা।</span>
          </h2>
          <p>
            Delta Classroom-এর সাথে শেখার নতুন অভিজ্ঞতা শুরু করো।
          </p>
          <Link href="/register" className="cta-button">
            এখনই অ্যাকাউন্ট তৈরি করো <span>↗</span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              শেখার নতুন দিগন্ত। জ্ঞান, দক্ষতা ও আত্মবিশ্বাস
              অর্জনের ডিজিটাল শিক্ষার প্ল্যাটফর্ম।
            </p>
          </div>

          <div className="footer-links">
            <h3>দ্রুত লিংক</h3>
            <Link href="/">হোম</Link>
            <Link href="/course">কোর্সসমূহ</Link>
            <Link href="/exam">পরীক্ষা</Link>
            <Link href="/about">আমাদের সম্পর্কে</Link>
          </div>

          <div className="footer-links">
            <h3>শিক্ষার্থীদের জন্য</h3>
            <Link href="/questionbank">প্রশ্ন ব্যাংক</Link>
            <Link href="/login">লগইন</Link>
            <Link href="/register">রেজিস্ট্রেশন</Link>
            <Link href="/dashboard">ড্যাশবোর্ড</Link>
          </div>

          <div className="footer-contact">
            <h3>যোগাযোগ</h3>
            <p>📍 Rangpur, Bangladesh</p>
            <p>✉️ Contact us for support</p>
            <Link href="/about">আরও জানুন ↗</Link>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Delta Classroom. All rights reserved.</p>
          <p>Designed for Better Learning ✦</p>
        </div>
      </footer>

      {/* ALL PAGE CSS */}
      <style jsx>{`
        :global(*) {
          box-sizing: border-box;
        }

        .home-page {
          --teal: #0d9488;
          --teal-dark: #087d74;
          --navy: #102d3a;
          --muted: #64748b;
          color: var(--navy);
          background: #ffffff;
          overflow: hidden;
          font-family: Arial, "Noto Sans Bengali", sans-serif;
        }

        .container {
          width: min(1160px, calc(100% - 40px));
          margin: 0 auto;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        .site-header {
          position: relative;
          z-index: 20;
          background: rgba(255, 255, 255, 0.96);
          border-bottom: 1px solid #edf3f3;
        }

        .header-inner {
          height: 82px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .brand-symbol {
          width: 45px;
          height: 45px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: linear-gradient(145deg, #16b8a7, #087d74);
          box-shadow: 0 7px 18px #0d948833;
        }

        .brand-symbol svg {
          width: 32px;
          height: 32px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .brand-text strong {
          font-size: 21px;
          letter-spacing: 1.5px;
          color: #123b43;
          font-weight: 900;
        }

        .brand-text small {
          font-size: 9px;
          letter-spacing: 3px;
          color: var(--teal);
          margin-top: 5px;
          font-weight: 800;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 27px;
        }

        .desktop-nav a {
          font-size: 13px;
          color: #536574;
          font-weight: 700;
          transition: color 0.2s;
        }

        .desktop-nav a:hover,
        .login-link:hover {
          color: var(--teal);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .login-link {
          font-size: 13px;
          font-weight: 800;
        }

        .register-button,
        .primary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          background: var(--teal);
          color: white;
          border-radius: 10px;
          padding: 13px 20px;
          font-size: 13px;
          font-weight: 800;
          box-shadow: 0 8px 20px #0d94882b;
          transition: 0.25s;
        }

        .register-button:hover,
        .primary-button:hover {
          background: var(--teal-dark);
          transform: translateY(-3px);
        }

        .mobile-login {
          display: none;
          color: var(--teal);
          font-size: 13px;
          font-weight: 800;
        }

        .hero-section {
          position: relative;
          background:
            radial-gradient(ellipse at 80% 40%, #d9f5ef 0, transparent 36%),
            linear-gradient(115deg, #f5fcfa 0%, #ffffff 60%, #f0faf8 100%);
          padding: 75px 0 85px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 0.95fr;
          align-items: center;
          gap: 55px;
          position: relative;
          z-index: 2;
        }

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: #e2f7f2;
          border: 1px solid #c7eee5;
          color: #087d74;
          border-radius: 30px;
          padding: 9px 15px;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 24px;
        }

        .label-dot {
          width: 8px;
          height: 8px;
          background: #0d9488;
          border-radius: 50%;
          box-shadow: 0 0 0 4px #0d94881c;
        }

        .hero-content h1 {
          font-size: clamp(42px, 5.2vw, 68px);
          line-height: 1.2;
          letter-spacing: -2px;
          font-weight: 900;
          color: #102f3b;
          margin: 0;
        }

        .hero-content h1 span,
        .section-heading h2 span,
        .center-heading h2 span {
          color: var(--teal);
        }

        .hero-description {
          color: #647783;
          font-size: 15px;
          line-height: 2;
          max-width: 520px;
          margin: 22px 0 27px;
        }

        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 14px;
        }

        .primary-button {
          padding: 16px 25px;
        }

        .secondary-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          font-size: 13px;
          font-weight: 800;
          color: #24444d;
        }

        .play-icon {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e1f5f0;
          color: var(--teal);
          font-size: 10px;
        }

        .hero-trust {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-top: 35px;
        }

        .trust-avatars {
          display: flex;
        }

        .trust-avatars span {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #d9f1ec;
          border: 2px solid white;
          margin-left: -7px;
          font-size: 16px;
        }

        .trust-avatars span:first-child {
          margin-left: 0;
        }

        .hero-trust strong,
        .hero-trust small {
          display: block;
        }

        .hero-trust strong {
          font-size: 12px;
          color: #24444d;
        }

        .hero-trust small {
          font-size: 11px;
          color: #81919a;
          margin-top: 4px;
        }

        .hero-art {
          min-height: 420px;
          position: relative;
          display: grid;
          place-items: center;
        }

        .art-glow {
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: #c8eee5;
          opacity: 0.65;
          filter: blur(2px);
        }

        .student-card {
          position: relative;
          z-index: 2;
          width: min(350px, 80%);
          padding: 13px;
          border-radius: 25px;
          background: white;
          box-shadow: 0 25px 70px #174b4b1c;
          transform: rotate(-3deg);
        }

        .student-window {
          background: #e6f7f2;
          border-radius: 17px;
          overflow: hidden;
        }

        .window-dots {
          height: 34px;
          display: flex;
          align-items: center;
          gap: 5px;
          padding-left: 13px;
          background: #f7fbfa;
        }

        .window-dots i {
          width: 7px;
          height: 7px;
          background: #b4d8ce;
          border-radius: 50%;
        }

        .window-dots i:first-child {
          background: #ed9b8c;
        }

        .window-dots i:nth-child(2) {
          background: #e9c66c;
        }

        .student-scene {
          position: relative;
          height: 275px;
          overflow: hidden;
          background: linear-gradient(145deg, #d9f3ec, #b6e5da);
        }

        .sun {
          position: absolute;
          top: 28px;
          right: 35px;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: #ffdc8a;
          box-shadow: 0 0 0 12px #ffdc8a35;
        }

        .student-head {
          position: absolute;
          left: 50%;
          top: 48px;
          transform: translateX(-50%);
          width: 125px;
          height: 190px;
        }

        .student-face {
          position: absolute;
          top: 15px;
          left: 28px;
          width: 70px;
          height: 78px;
          border-radius: 45% 45% 48% 48%;
          background: #d99569;
          z-index: 2;
        }

        .student-face i {
          position: absolute;
          top: 35px;
          left: 18px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #283a42;
        }

        .student-face i:nth-child(2) {
          left: 47px;
        }

        .student-hair {
          position: absolute;
          top: 5px;
          left: 25px;
          width: 75px;
          height: 40px;
          border-radius: 50% 50% 20% 20%;
          background: #263d46;
          z-index: 3;
          transform: rotate(-5deg);
        }

        .student-body {
          position: absolute;
          top: 83px;
          left: 8px;
          width: 110px;
          height: 115px;
          border-radius: 45px 45px 12px 12px;
          background: #0d9488;
        }

        .laptop {
          position: absolute;
          z-index: 4;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 175px;
        }

        .laptop-screen {
          height: 100px;
          border: 7px solid #314d59;
          border-bottom-width: 10px;
          border-radius: 10px 10px 3px 3px;
          background: linear-gradient(145deg, #123f4b, #0d9488);
          display: grid;
          place-items: center;
          color: white;
          font-size: 42px;
          font-weight: 900;
        }

        .laptop-base {
          height: 9px;
          background: #607982;
          border-radius: 2px 2px 10px 10px;
        }

        .book {
          position: absolute;
          bottom: 8px;
          width: 55px;
          height: 13px;
          border-radius: 3px;
          background: #f0b56b;
          transform: rotate(-10deg);
        }

        .book-a {
          left: 12px;
        }

        .book-b {
          right: 12px;
          background: #7d9fe0;
          transform: rotate(10deg);
        }

        .art-caption {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 15px 10px 5px;
        }

        .caption-icon {
          width: 35px;
          height: 35px;
          border-radius: 11px;
          background: #e0f5ef;
          color: var(--teal);
          display: grid;
          place-items: center;
        }

        .art-caption strong,
        .art-caption small {
          display: block;
        }

        .art-caption strong {
          font-size: 13px;
        }

        .art-caption small {
          color: #83949a;
          font-size: 10px;
          margin-top: 4px;
        }

        .floating-card {
          position: absolute;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 16px;
          border-radius: 13px;
          background: white;
          box-shadow: 0 12px 35px #164a4520;
          animation: float 4s ease-in-out infinite;
        }

        .floating-card > span {
          font-size: 23px;
        }

        .floating-card strong,
        .floating-card small {
          display: block;
          white-space: nowrap;
        }

        .floating-card strong {
          font-size: 11px;
        }

        .floating-card small {
          color: #91a0a5;
          font-size: 9px;
          margin-top: 4px;
        }

        .card-one {
          top: 55px;
          left: -5px;
        }

        .card-two {
          right: -8px;
          bottom: 65px;
          animation-delay: -2s;
        }

        .art-circle {
          position: absolute;
          border: 1px dashed #8acfc0;
          border-radius: 50%;
        }

        .circle-a {
          width: 420px;
          height: 420px;
        }

        .circle-b {
          width: 475px;
          height: 475px;
          opacity: 0.45;
        }

        .hero-bottom-shape {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 22px;
          background: white;
          clip-path: polygon(0 100%, 50% 0, 100% 100%);
        }

        .stats-section {
          padding: 25px 0;
          border-bottom: 1px solid #edf3f2;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
        }

        .stat-item > span {
          display: grid;
          place-items: center;
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          border-radius: 13px;
          background: #e8f7f3;
          font-size: 20px;
        }

        .stat-item strong,
        .stat-item small {
          display: block;
        }

        .stat-item strong {
          font-size: 13px;
        }

        .stat-item small {
          color: #82929a;
          font-size: 10px;
          margin-top: 5px;
        }

        .courses-section {
          padding: 95px 0 85px;
          background: #fbfdfd;
        }

        .section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 35px;
        }

        .eyebrow {
          display: block;
          color: var(--teal);
          font-size: 10px;
          letter-spacing: 2.5px;
          font-weight: 900;
          margin-bottom: 13px;
        }

        .section-heading h2,
        .center-heading h2 {
          font-size: clamp(27px, 3.5vw, 39px);
          line-height: 1.35;
          margin: 0;
          font-weight: 900;
          color: #173b46;
        }

        .section-heading p,
        .center-heading p {
          color: #82929a;
          font-size: 13px;
          line-height: 1.8;
          margin: 10px 0 0;
        }

        .view-all {
          display: inline-flex;
          gap: 12px;
          align-items: center;
          color: var(--teal);
          font-size: 12px;
          font-weight: 900;
          white-space: nowrap;
          padding-bottom: 7px;
        }

        .course-marquee {
          width: 100%;
          overflow: hidden;
          padding: 8px 0 18px;
        }

        .course-track {
          display: flex;
          width: max-content;
          animation: moveCourses 35s linear infinite;
        }

        .course-marquee:hover .course-track,
        .course-marquee:focus-within .course-track {
          animation-play-state: paused;
        }

        .course-slide {
          width: 275px;
          flex-shrink: 0;
          padding: 0 10px;
        }

        .course-card {
          overflow: hidden;
          height: 100%;
          background: white;
          border: 1px solid #eaf0ef;
          border-radius: 17px;
          transition: 0.3s;
          box-shadow: 0 7px 22px #153e3d08;
        }

        .course-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 16px 35px #153e3d15;
          border-color: #b9e8dc;
        }

        .course-art {
          height: 150px;
          position: relative;
          display: grid;
          place-items: center;
          overflow: hidden;
        }

        .course-art.teal {
          background: linear-gradient(135deg, #d5f4eb, #a8e3d4);
        }

        .course-art.blue {
          background: linear-gradient(135deg, #e0eaff, #b8cfff);
        }

        .course-art.purple {
          background: linear-gradient(135deg, #eee4ff, #d4c1ff);
        }

        .course-art.orange {
          background: linear-gradient(135deg, #fff0d9, #ffd5a0);
        }

        .course-art.pink {
          background: linear-gradient(135deg, #ffe5ef, #ffc4da);
        }

        .course-category {
          position: absolute;
          left: 13px;
          top: 13px;
          z-index: 2;
          padding: 6px 9px;
          border-radius: 20px;
          background: #ffffffb8;
          color: #35545b;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .course-icon {
          position: relative;
          z-index: 2;
          font-size: 57px;
          filter: drop-shadow(0 9px 8px #214d4220);
          transition: transform 0.3s;
        }

        .course-card:hover .course-icon {
          transform: scale(1.12) rotate(-5deg);
        }

        .course-decoration {
          position: absolute;
          width: 120px;
          height: 120px;
          border: 1px solid #ffffff8c;
          border-radius: 50%;
          right: -22px;
          bottom: -65px;
          box-shadow: 0 0 0 15px #ffffff25, 0 0 0 30px #ffffff19;
        }

        .course-content {
          padding: 18px;
        }

        .course-content h3 {
          font-size: 16px;
          margin: 0;
          color: #193b45;
          font-weight: 900;
        }

        .course-content p {
          font-size: 11px;
          color: #89979c;
          margin: 8px 0 17px;
        }

        .course-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #eef2f1;
          padding-top: 13px;
        }

        .course-price strong,
        .course-price del {
          display: block;
        }

        .course-price strong {
          color: var(--teal);
          font-size: 16px;
        }

        .course-price del {
          color: #a8b3b6;
          font-size: 10px;
          margin-top: 3px;
        }

        .course-arrow {
          width: 35px;
          height: 35px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: #e8f7f3;
          color: var(--teal);
          font-size: 20px;
          font-weight: 800;
          transition: 0.2s;
        }

        .course-arrow:hover {
          background: var(--teal);
          color: white;
        }

        .slider-hint {
          text-align: center;
          color: #9aa9ac;
          font-size: 10px;
          margin-top: 10px;
        }

        .slider-hint span {
          color: var(--teal);
          padding: 0 8px;
        }

        .exam-section {
          padding: 85px 0;
          background: #103b43;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .exam-section::before {
          content: "";
          position: absolute;
          width: 450px;
          height: 450px;
          border: 1px solid #ffffff13;
          border-radius: 50%;
          top: -230px;
          right: -100px;
          box-shadow: 0 0 0 40px #ffffff08, 0 0 0 80px #ffffff05;
        }

        .exam-grid {
          display: grid;
          grid-template-columns: 1fr 0.8fr;
          align-items: center;
          gap: 70px;
        }

        .eyebrow.light {
          color: #65d8c4;
        }

        .exam-content h2 {
          font-size: clamp(30px, 4vw, 46px);
          line-height: 1.4;
          margin: 0;
          font-weight: 900;
        }

        .exam-content h2 span {
          color: #5bd5bf;
        }

        .exam-content p {
          color: #c0d5d5;
          font-size: 13px;
          line-height: 2;
          max-width: 500px;
          margin: 18px 0 25px;
        }

        .exam-button {
          display: inline-flex;
          gap: 15px;
          align-items: center;
          padding: 14px 21px;
          border-radius: 9px;
          background: #ffffff;
          color: #087d74;
          font-size: 12px;
          font-weight: 900;
          transition: 0.2s;
        }

        .exam-button:hover {
          transform: translateY(-3px);
          background: #dff8f0;
        }

        .exam-visual {
          min-height: 310px;
          position: relative;
          display: grid;
          place-items: center;
        }

        .exam-circle {
          position: absolute;
          width: 270px;
          height: 270px;
          border-radius: 50%;
          background: #1a5960;
        }

        .exam-paper {
          position: relative;
          z-index: 2;
          width: 235px;
          padding: 20px;
          background: white;
          color: #173b46;
          border-radius: 13px;
          box-shadow: 0 20px 50px #001b203f;
          transform: rotate(4deg);
        }

        .paper-top {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--teal);
          font-weight: 900;
        }

        .paper-top span {
          font-size: 20px;
        }

        .paper-top small {
          font-size: 8px;
          letter-spacing: 1.5px;
        }

        .exam-paper h3 {
          font-size: 19px;
          margin: 20px 0 4px;
        }

        .exam-paper > p {
          color: #93a1a4;
          font-size: 10px;
          margin: 0 0 15px;
        }

        .paper-line {
          height: 1px;
          background: #edf1f0;
          margin-bottom: 14px;
        }

        .question-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 12px 0;
        }

        .question-row span {
          font-size: 10px;
          color: #8b9c9f;
        }

        .question-row div {
          height: 6px;
          width: 115px;
          border-radius: 10px;
          background: #eaf1ef;
        }

        .question-row i {
          margin-left: auto;
          width: 18px;
          height: 18px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #dff6ee;
          color: var(--teal);
          font-size: 10px;
          font-style: normal;
        }

        .paper-progress {
          height: 6px;
          background: #e8f0ee;
          border-radius: 10px;
          margin-top: 18px;
          overflow: hidden;
        }

        .paper-progress span {
          display: block;
          width: 75%;
          height: 100%;
          background: var(--teal);
          border-radius: 10px;
        }

        .progress-label {
          display: block;
          text-align: right;
          margin-top: 7px;
          color: #8a9a9d;
          font-size: 8px;
        }

        .exam-badge {
          position: absolute;
          right: 0;
          bottom: 25px;
          z-index: 3;
          background: #ffffff;
          color: #087d74;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 900;
          box-shadow: 0 10px 25px #001b2035;
        }

        .features-section {
          padding: 95px 0;
          background: #ffffff;
        }

        .center-heading {
          text-align: center;
          max-width: 650px;
          margin: 0 auto 42px;
        }

        .center-heading p {
          max-width: 500px;
          margin: 12px auto 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .feature-card {
          position: relative;
          padding: 25px 20px;
          min-height: 195px;
          border: 1px solid #eaf1ef;
          border-radius: 15px;
          background: #ffffff;
          transition: 0.25s;
          overflow: hidden;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          border-color: #bce8dc;
          box-shadow: 0 15px 35px #153e3d0e;
        }

        .feature-icon {
          width: 49px;
          height: 49px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: #e5f7f1;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .feature-1 {
          background: #e9efff;
        }

        .feature-2 {
          background: #fff1dc;
        }

        .feature-3 {
          background: #f3eaff;
        }

        .feature-card h3 {
          font-size: 15px;
          margin: 0 0 9px;
          font-weight: 900;
        }

        .feature-card p {
          color: #82939a;
          font-size: 11px;
          line-height: 1.8;
          margin: 0;
        }

        .feature-number {
          position: absolute;
          right: 13px;
          bottom: 7px;
          color: #eff4f2;
          font-size: 35px;
          font-weight: 900;
        }

        .question-section {
          padding: 0 0 90px;
        }

        .question-box {
          display: flex;
          align-items: center;
          gap: 23px;
          padding: 30px 35px;
          border: 1px solid #dcefe9;
          border-radius: 18px;
          background: linear-gradient(110deg, #f0faf7, #ffffff);
        }

        .question-icon {
          width: 65px;
          height: 65px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 18px;
          background: #d9f2e9;
          font-size: 30px;
        }

        .question-copy {
          flex: 1;
        }

        .question-copy .eyebrow {
          margin-bottom: 7px;
        }

        .question-copy h2 {
          margin: 0;
          font-size: 21px;
          font-weight: 900;
        }

        .question-copy p {
          margin: 8px 0 0;
          color: #819197;
          font-size: 11px;
          line-height: 1.8;
        }

        .question-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          white-space: nowrap;
          background: var(--teal);
          color: white;
          padding: 14px 18px;
          border-radius: 9px;
          font-size: 11px;
          font-weight: 900;
          transition: 0.2s;
        }

        .question-button:hover {
          background: var(--teal-dark);
        }

        .cta-section {
          position: relative;
          overflow: hidden;
          text-align: center;
          padding: 75px 0 80px;
          background: linear-gradient(120deg, #0c756e, #0e9c8c);
          color: white;
        }

        .cta-section::before,
        .cta-section::after {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          border: 1px solid #ffffff20;
          border-radius: 50%;
        }

        .cta-section::before {
          top: -180px;
          left: -100px;
          box-shadow: 0 0 0 30px #ffffff08, 0 0 0 60px #ffffff06;
        }

        .cta-section::after {
          bottom: -220px;
          right: -70px;
          box-shadow: 0 0 0 35px #ffffff08, 0 0 0 70px #ffffff05;
        }

        .cta-content {
          position: relative;
          z-index: 2;
        }

        .cta-symbol {
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          margin: 0 auto 20px;
          border: 1px solid #ffffff66;
          border-radius: 14px;
          font-size: 26px;
          font-weight: 900;
        }

        .cta-section .eyebrow {
          color: #b5f5e7;
        }

        .cta-section h2 {
          font-size: clamp(30px, 4vw, 46px);
          line-height: 1.4;
          margin: 0;
          font-weight: 900;
        }

        .cta-section h2 span {
          color: #b7f4e3;
        }

        .cta-section p {
          color: #d4f0e9;
          font-size: 13px;
          margin: 15px 0 25px;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 15px 23px;
          border-radius: 10px;
          background: white;
          color: #087d74;
          font-size: 12px;
          font-weight: 900;
          transition: 0.2s;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px #003c3435;
        }

        .site-footer {
          padding: 65px 0 0;
          background: #102f3a;
          color: white;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
          gap: 40px;
          padding-bottom: 45px;
        }

        .footer-brand .brand-text strong {
          color: white;
        }

        .footer-brand p {
          max-width: 270px;
          color: #a6bbc0;
          font-size: 11px;
          line-height: 2;
          margin-top: 20px;
        }

        .footer-links,
        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .footer-links h3,
        .footer-contact h3 {
          font-size: 14px;
          margin: 5px 0 9px;
        }

        .footer-links a,
        .footer-contact p,
        .footer-contact > a {
          color: #a6bbc0;
          font-size: 11px;
          margin: 0;
          transition: color 0.2s;
        }

        .footer-links a:hover,
        .footer-contact > a:hover {
          color: #65d8c4;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          border-top: 1px solid #ffffff18;
          padding: 20px 0;
        }

        .footer-bottom p {
          color: #90a8ad;
          font-size: 10px;
          margin: 0;
        }

        @keyframes moveCourses {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .course-track,
          .floating-card {
            animation: none;
          }

          * {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media (max-width: 900px) {
          .desktop-nav {
            gap: 14px;
          }

          .desktop-nav a {
            font-size: 11px;
          }

          .hero-grid {
            gap: 20px;
          }

          .hero-content h1 {
            font-size: 48px;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 650px) {
          .container {
            width: min(100% - 30px, 500px);
          }

          .header-inner {
            height: 70px;
          }

          .brand-symbol {
            width: 39px;
            height: 39px;
          }

          .brand-text strong {
            font-size: 17px;
          }

          .brand-text small {
            font-size: 8px;
          }

          .desktop-nav,
          .header-actions {
            display: none;
          }

          .mobile-login {
            display: block;
          }

          .hero-section {
            padding: 48px 0 55px;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .hero-content h1 {
            font-size: 43px;
          }

          .hero-description {
            font-size: 13px;
            margin: 16px 0 22px;
          }

          .hero-art {
            min-height: 360px;
            margin-top: 10px;
          }

          .student-card {
            width: 270px;
          }

          .student-scene {
            height: 235px;
          }

          .art-glow {
            width: 270px;
            height: 270px;
          }

          .circle-a {
            width: 330px;
            height: 330px;
          }

          .circle-b {
            width: 370px;
            height: 370px;
          }

          .floating-card {
            padding: 9px 11px;
          }

          .floating-card strong {
            font-size: 9px;
          }

          .floating-card small {
            font-size: 8px;
          }

          .card-one {
            top: 35px;
            left: 0;
          }

          .card-two {
            right: 0;
            bottom: 45px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 13px 5px;
          }

          .stat-item {
            gap: 8px;
          }

          .stat-item > span {
            width: 36px;
            height: 36px;
            font-size: 17px;
          }

          .stat-item strong {
            font-size: 10px;
          }

          .stat-item small {
            font-size: 8px;
          }

          .courses-section,
          .features-section {
            padding: 65px 0;
          }

          .section-heading {
            align-items: flex-start;
            flex-direction: column;
            margin-bottom: 25px;
          }

          .section-heading h2,
          .center-heading h2 {
            font-size: 28px;
          }

          .section-heading p,
          .center-heading p {
            font-size: 11px;
          }

          .course-slide {
            width: 245px;
          }

          .course-art {
            height: 130px;
          }

          .exam-section {
            padding: 65px 0;
          }

          .exam-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .exam-content h2 {
            font-size: 32px;
          }

          .exam-visual {
            min-height: 290px;
          }

          .features-grid {
            gap: 12px;
          }

          .feature-card {
            min-height: 180px;
            padding: 18px 13px;
          }

          .feature-card h3 {
            font-size: 12px;
          }

          .feature-card p {
            font-size: 10px;
          }

          .question-section {
            padding-bottom: 65px;
          }

          .question-box {
            flex-direction: column;
            align-items: flex-start;
            padding: 23px;
            gap: 14px;
          }

          .question-copy h2 {
            font-size: 18px;
          }

          .cta-section {
            padding: 65px 0;
          }

          .cta-section h2 {
            font-size: 31px;
          }

          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px 18px;
          }

          .footer-brand {
            grid-column: 1 / -1;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 360px) {
          .hero-content h1 {
            font-size: 36px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </main>
  );
}
