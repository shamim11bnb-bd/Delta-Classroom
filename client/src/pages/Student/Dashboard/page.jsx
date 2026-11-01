import { Link } from 'react-router-dom';
import {
  ArrowUpRight, BookOpen, Users, ClipboardCheck, Activity,
  CalendarDays, ChevronRight, Clock, Sparkles, Quote,
} from 'lucide-react';
import useAuth from '../../../hooks/useAuth.js';

/* ── Pure SVG progress ring (no library) ── */
function ProgressRing({ value = 0, size = 52, stroke = 5 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <svg width={size} height={size} className="ring">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(32,199,180,.12)" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke="var(--primary)" strokeWidth={stroke} fill="none"
        strokeDasharray={c} strokeDashoffset={off}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset .8s ease' }}
      />
      <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle"
        fill="#dbe6f4" fontSize="12" fontWeight="600">
        {value}%
      </text>
    </svg>
  );
}

const tips = [
  'প্রতিদিন ২০ মিনিট পড়লেও এক মাসে বিশাল পরিবর্তন আসে।',
  'নোট হাতে লিখে পড়লে মনে রাখার ক্ষমতা বাড়ে।',
  'একটা লেসন শেষ করেই ছোট বিরতি নাও — মস্তিষ্ক রিফ্রেশ হয়।',
  'প্রশ্ন করার সাহসই শেখার সবচেয়ে বড় ধাপ।',
  'লক্ষ্য ছোট হোক, কিন্তু প্রতিদিন এগোও।',
];

export default function StudentDashboard() {
  const { profile } = useAuth();

  const shortcuts = [
    ['আমার কোর্স', '/student/courses'],
    ['অ্যাসাইনমেন্ট', '/student/assignments'],
    ['কুইজ ও পরীক্ষা', '/student/quizzes'],
    ['ফলাফল', '/student/results'],
  ];

  const today = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const tip = tips[new Date().getDate() % tips.length];

  // প্লেসহোল্ডার — পরে Supabase থেকে আসবে
  const upcoming = [
    { type: 'class', title: 'ম্যাথমেটিক্স লাইভ ক্লাস', time: 'আজ, বিকাল ৪:০০' },
    { type: 'deadline', title: 'ইংরেজি অ্যাসাইনমেন্ট জমা', time: 'কাল, রাত ১১:৫৯' },
  ];

  const stats = [
    ['চলমান কোর্স', '০', BookOpen, null],
    ['সম্পন্ন লেসন', '০', Users, null],
    ['গড় অগ্রগতি', '০%', Activity, 0],
  ];

  return (
    <div className="dash-page">

      {/* ── Welcome banner ── */}
      <section className="welcome panel">
        <div>
          <div className="eyebrow">YOUR LEARNING SPACE</div>
          <h1>স্বাগতম, {profile?.full_name || 'Student'} 👋</h1>
          <p className="today-line">
            <CalendarDays size={14} /> {today}
          </p>
          <p>আজই শেখার নতুন লক্ষ্য পূরণ করুন।</p>
          <Link to="/student/courses" className="btn btn-primary">
            শুরু করুন <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="welcome-art">
          <div className="art-circle"><BookOpen size={55} /></div>
          <span className="float-dot one">✦</span>
          <span className="float-dot two">+</span>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="dash-stats">
        {stats.map(([label, value, Icon, ring]) => (
          <div className="dash-stat panel" key={label}>
            <div className="dash-icon"><Icon size={20} /></div>
            <div>
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
            {ring !== null
              ? <ProgressRing value={ring} />
              : <span className="trend">Overview</span>}
          </div>
        ))}
      </div>

      {/* ── Bottom grid ── */}
      <div className="dash-bottom">

        {/* Left column */}
        <div className="left-col">

          {/* Upcoming */}
          <section className="panel upcoming-panel">
            <div className="panel-head">
              <div>
                <h2>আসন্ন কার্যক্রম</h2>
                <p>আজ ও কালকের গুরুত্বপূর্ণ কাজ</p>
              </div>
              <Clock size={18} color="var(--primary)" />
            </div>
            <ul className="upcoming-list">
              {upcoming.map((u, i) => (
                <li key={i} className={`upcoming-item ${u.type}`}>
                  <span className="dot" />
                  <div>
                    <b>{u.title}</b>
                    <small>{u.time}</small>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Quick links */}
          <section className="panel quick-panel">
            <div className="panel-head">
              <div>
                <h2>দ্রুত প্রবেশ</h2>
                <p>প্রয়োজনীয় কাজগুলো এক ক্লিকেই</p>
              </div>
              <span className="pill">SHORTCUTS</span>
            </div>
            <div className="quick-grid">
              {shortcuts.map(([label, to], i) => (
                <Link to={to} className="quick-link" key={to}>
                  <span className="quick-number">0{i + 1}</span>
                  <b>{label}</b>
                  <ChevronRight size={18} className="quick-arrow" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="right-col">
          <section className="panel activity-panel">
            <div className="panel-head">
              <div>
                <h2>সাম্প্রতিক কার্যক্রম</h2>
                <p>আপনার আপডেট</p>
              </div>
              <CalendarDays color="var(--primary)" />
            </div>
            <div className="activity-empty">
              <ClipboardCheck size={28} />
              <b>এখনো কোনো কার্যক্রম নেই</b>
              <small>নতুন কার্যক্রম শুরু হলে এখানে দেখা যাবে।</small>
            </div>
          </section>

          {/* Tip of the day */}
          <section className="panel tip-panel">
            <div className="tip-head">
              <span className="tip-badge"><Sparkles size={14} /> আজকের টিপস</span>
            </div>
            <Quote size={22} className="quote-icon" />
            <p className="tip-text">{tip}</p>
          </section>
        </div>
      </div>

      {/* ── Styles ── */}
      <style>{`
        .dash-page{max-width:1200px;margin:auto}

        /* Welcome */
        .welcome{padding:clamp(24px,4vw,42px);display:flex;justify-content:space-between;align-items:center;overflow:hidden;position:relative;background:radial-gradient(circle at 80% 20%,rgba(32,199,180,.16),transparent 30%),linear-gradient(120deg,#172b43,#101c30)}
        .welcome h1{font-size:clamp(25px,4vw,38px);margin:12px 0 6px}
        .welcome p{color:var(--muted);margin:0 0 22px}
        .today-line{display:inline-flex;align-items:center;gap:6px;font-size:12px;background:rgba(32,199,180,.1);color:var(--primary);padding:4px 10px;border-radius:20px;margin:0 0 14px!important}
        .welcome-art{width:190px;height:150px;display:grid;place-items:center;position:relative}
        .art-circle{width:120px;height:120px;border-radius:36px;display:grid;place-items:center;color:var(--primary);background:linear-gradient(145deg,rgba(32,199,180,.25),rgba(109,156,255,.13));border:1px solid rgba(32,199,180,.3);transform:rotate(-9deg);transition:transform .5s ease}
        .welcome:hover .art-circle{transform:rotate(0deg) scale(1.03)}
        .float-dot{position:absolute;color:var(--primary);font-size:28px;animation:floaty 4s ease-in-out infinite}
        .float-dot.one{top:4px;right:22px}
        .float-dot.two{bottom:5px;left:20px;color:var(--blue);animation-delay:1.2s}
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}

        /* Stats */
        .dash-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin:20px 0}
        .dash-stat{padding:18px;display:flex;align-items:center;gap:13px;position:relative;transition:transform .25s ease,border-color .25s ease}
        .dash-stat:hover{transform:translateY(-3px);border-color:rgba(32,199,180,.35)}
        .dash-icon{width:43px;height:43px;border-radius:13px;background:rgba(32,199,180,.1);color:var(--primary);display:grid;place-items:center}
        .dash-stat small,.dash-stat strong{display:block}
        .dash-stat small{color:var(--muted);font-size:12px}
        .dash-stat strong{font-size:23px;margin-top:4px}
        .trend{margin-left:auto;color:#6ddfd2;font-size:10px}
        .ring{margin-left:auto;flex-shrink:0}

        /* Bottom layout */
        .dash-bottom{display:grid;grid-template-columns:1.1fr .9fr;gap:16px}
        .left-col,.right-col{display:flex;flex-direction:column;gap:16px}
        .quick-panel,.activity-panel,.upcoming-panel,.tip-panel{padding:21px}
        .panel-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
        .panel-head h2{font-size:18px;margin:0 0 5px}
        .panel-head p{font-size:12px;color:var(--muted);margin:0}

        /* Quick links */
        .quick-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .quick-link{display:flex;align-items:center;gap:10px;padding:14px;border:1px solid var(--line);border-radius:12px;color:#dce7f6;font-size:13px;transition:all .25s ease}
        .quick-link:hover{border-color:rgba(32,199,180,.5);background:rgba(32,199,180,.06);transform:translateY(-2px)}
        .quick-link .quick-arrow{margin-left:auto;color:var(--muted);transition:transform .25s ease,color .25s ease}
        .quick-link:hover .quick-arrow{transform:translateX(4px);color:var(--primary)}
        .quick-number{color:var(--primary);font-size:11px}

        /* Upcoming */
        .upcoming-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
        .upcoming-item{display:flex;gap:12px;align-items:flex-start;padding:12px;border-radius:12px;border:1px solid var(--line);transition:border-color .25s}
        .upcoming-item:hover{border-color:rgba(32,199,180,.4)}
        .upcoming-item .dot{width:8px;height:8px;border-radius:50%;margin-top:6px;flex-shrink:0;background:var(--primary);box-shadow:0 0 0 4px rgba(32,199,180,.15)}
        .upcoming-item.deadline .dot{background:#f5a524;box-shadow:0 0 0 4px rgba(245,165,36,.15)}
        .upcoming-item b{display:block;font-size:13px;color:#dbe6f4}
        .upcoming-item small{display:block;font-size:11px;color:var(--muted);margin-top:2px}

        /* Activity empty */
        .activity-empty{min-height:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;color:var(--muted);text-align:center}
        .activity-empty svg{color:var(--primary)}
        .activity-empty b{color:#dbe6f4;font-size:13px}
        .activity-empty small{font-size:11px}

        /* Tip panel */
        .tip-panel{position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(32,199,180,.07),rgba(109,156,255,.05))}
        .tip-head{margin-bottom:8px}
        .tip-badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:var(--primary);background:rgba(32,199,180,.12);padding:4px 10px;border-radius:20px;font-weight:600}
        .quote-icon{color:rgba(32,199,180,.35);margin:6px 0 4px}
        .tip-text{margin:0;font-size:13px;color:#dbe6f4;line-height:1.6}

        /* Responsive */
        @media(max-width:850px){
          .dash-bottom{grid-template-columns:1fr}
        }
        @media(max-width:600px){
          .welcome-art{display:none}
          .dash-stats{grid-template-columns:1fr}
          .quick-grid{grid-template-columns:1fr}
        }
      `}</style>
    </div>
  );
}
