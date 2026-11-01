import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BookOpen,
  Users,
  ClipboardCheck,
  Activity,
  CalendarDays,
  ChevronRight,
  Sparkles,
  Trophy,
  Clock3,
  TrendingUp,
  Target,
} from 'lucide-react';
import useAuth from '../../../hooks/useAuth.js';

export default function StudentDashboard() {
  const { profile } = useAuth();

  const shortcuts = [
    { label: 'আমার কোর্স', to: '/student/courses', icon: BookOpen, color: '#20c7b4' },
    { label: 'অ্যাসাইনমেন্ট', to: '/student/assignments', icon: ClipboardCheck, color: '#6d9cff' },
    { label: 'কুইজ ও পরীক্ষা', to: '/student/quizzes', icon: Target, color: '#f5a623' },
    { label: 'ফলাফল', to: '/student/results', icon: Trophy, color: '#b47cff' },
  ];

  const stats = [
    { label: 'চলমান কোর্স', value: '০', icon: BookOpen, accent: '#20c7b4', trend: 'Active' },
    { label: 'সম্পন্ন লেসন', value: '০', icon: Users, accent: '#6d9cff', trend: 'Total' },
    { label: 'গড় অগ্রগতি', value: '০%', icon: Activity, accent: '#f5a623', trend: 'Growth' },
  ];

  const weekly = [
    { day: 'শনি', value: 35 },
    { day: 'রবি', value: 55 },
    { day: 'সোম', value: 40 },
    { day: 'মঙ্গল', value: 75 },
    { day: 'বুধ', value: 60 },
    { day: 'বৃহঃ', value: 85 },
    { day: 'শুক্র', value: 50 },
  ];

  const name = profile?.full_name || 'Student';

  return (
    <div className="dash-page">
      {/* ==== WELCOME HERO ==== */}
      <section className="welcome">
        <div className="welcome-glow a" />
        <div className="welcome-glow b" />
        <div className="welcome-content">
          <div className="eyebrow">
            <Sparkles size={13} /> YOUR LEARNING SPACE
          </div>
          <h1>
            স্বাগতম, <span className="grad">{name}</span> 👋
          </h1>
          <p>আজই শেখার নতুন লক্ষ্য পূরণ করুন — ছোট ছোট ধাপেই বড় পরিবর্তন।</p>
          <div className="hero-actions">
            <Link to="/student/courses" className="btn btn-primary">
              শুরু করুন <ArrowUpRight size={17} />
            </Link>
            <Link to="/student/results" className="btn btn-ghost">
              আমার ফলাফল
            </Link>
          </div>
        </div>

        <div className="welcome-art">
          <div className="art-glow" />
          <div className="art-circle">
            <BookOpen size={55} />
          </div>
          <span className="float-dot one">✦</span>
          <span className="float-dot two">+</span>
          <span className="float-dot three">●</span>
        </div>
      </section>

      {/* ==== STATS ==== */}
      <div className="dash-stats">
        {stats.map(({ label, value, icon: Icon, accent, trend }) => (
          <div className="dash-stat panel" key={label} style={{ '--accent': accent }}>
            <div className="dash-icon">
              <Icon size={20} />
            </div>
            <div className="dash-stat-body">
              <small>{label}</small>
              <strong>{value}</strong>
            </div>
            <span className="trend">
              <TrendingUp size={11} /> {trend}
            </span>
          </div>
        ))}
      </div>

      {/* ==== BOTTOM GRID ==== */}
      <div className="dash-bottom">
        {/* Shortcuts */}
        <section className="panel quick-panel">
          <div className="panel-head">
            <div>
              <h2>দ্রুত প্রবেশ</h2>
              <p>প্রয়োজনীয় কাজগুলো এক ক্লিকেই</p>
            </div>
            <span className="pill">SHORTCUTS</span>
          </div>

          <div className="quick-grid">
            {shortcuts.map(({ label, to, icon: Icon, color }, i) => (
              <Link to={to} className="quick-link" key={to} style={{ '--link-accent': color }}>
                <span className="quick-icon">
                  <Icon size={17} />
                </span>
                <div className="quick-text">
                  <b>{label}</b>
                  <small>0{i + 1}</small>
                </div>
                <ChevronRight size={18} className="quick-arrow" />
              </Link>
            ))}
          </div>
        </section>

        {/* Activity */}
        <section className="panel activity-panel">
          <div className="panel-head">
            <div>
              <h2>সাম্প্রতিক কার্যক্রম</h2>
              <p>আপনার আপডেট</p>
            </div>
            <CalendarDays color="var(--primary)" size={20} />
          </div>

          {/* Weekly mini-chart */}
          <div className="mini-chart">
            {weekly.map(({ day, value }) => (
              <div className="bar-col" key={day}>
                <div className="bar-track">
                  <div className="bar-fill" style={{ height: `${value}%` }} />
                </div>
                <small>{day}</small>
              </div>
            ))}
          </div>

          <div className="activity-empty">
            <div className="empty-icon">
              <Clock3 size={22} />
            </div>
            <b>এখনো কোনো কার্যক্রম নেই</b>
            <small>নতুন কার্যক্রম শুরু হলে এখানে দেখা যাবে।</small>
          </div>
        </section>
      </div>

      {/* ==== STYLE ==== */}
      <style>{`
        .dash-page {
          max-width: 1200px;
          margin: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 30px;
        }

        /* ============ HERO ============ */
        .welcome {
          padding: clamp(24px, 4vw, 46px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          position: relative;
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background:
            radial-gradient(circle at 85% 15%, rgba(32, 199, 180, 0.18), transparent 42%),
            radial-gradient(circle at 15% 90%, rgba(109, 156, 255, 0.15), transparent 45%),
            linear-gradient(135deg, #172b43 0%, #101c30 100%);
          box-shadow: 0 20px 50px -30px rgba(32, 199, 180, 0.4);
          isolation: isolate;
        }

        .welcome-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.5;
          z-index: -1;
          animation: floatGlow 8s ease-in-out infinite;
        }
        .welcome-glow.a {
          width: 260px; height: 260px;
          background: rgba(32, 199, 180, 0.5);
          top: -100px; right: 10%;
        }
        .welcome-glow.b {
          width: 220px; height: 220px;
          background: rgba(109, 156, 255, 0.4);
          bottom: -110px; left: -40px;
          animation-delay: -3s;
        }
        @keyframes floatGlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }

        .welcome-content { position: relative; z-index: 2; max-width: 620px; }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10.5px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--primary);
          background: rgba(32, 199, 180, 0.1);
          border: 1px solid rgba(32, 199, 180, 0.25);
          padding: 5px 11px;
          border-radius: 999px;
          font-weight: 700;
        }

        .welcome h1 {
          font-size: clamp(25px, 4vw, 38px);
          margin: 14px 0 10px;
          line-height: 1.25;
          font-weight: 800;
        }

        .grad {
          background: linear-gradient(90deg, #20c7b4, #6d9cff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .welcome p { color: var(--muted); margin: 0 0 22px; line-height: 1.7; }

        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px;
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 600;
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s;
        }
        .btn-primary {
          background: linear-gradient(135deg, #20c7b4, #17a999);
          color: #06231f;
          box-shadow: 0 8px 22px -8px rgba(32, 199, 180, 0.7);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -8px rgba(32, 199, 180, 0.85);
        }
        .btn-ghost {
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #dce7f6;
          background: rgba(255, 255, 255, 0.04);
        }
        .btn-ghost:hover { background: rgba(255, 255, 255, 0.09); }

        /* Art */
        .welcome-art {
          width: 190px;
          height: 160px;
          display: grid;
          place-items: center;
          position: relative;
        }
        .art-glow {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(32, 199, 180, 0.35), transparent 70%);
          filter: blur(20px);
          animation: pulse 3.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.9; }
        }
        .art-circle {
          width: 120px;
          height: 120px;
          border-radius: 34px;
          display: grid;
          place-items: center;
          color: var(--primary);
          background: linear-gradient(145deg, rgba(32, 199, 180, 0.25), rgba(109, 156, 255, 0.13));
          border: 1px solid rgba(32, 199, 180, 0.3);
          transform: rotate(-9deg);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 20px 40px -15px rgba(32, 199, 180, 0.5);
          transition: transform 0.4s ease;
        }
        .welcome:hover .art-circle { transform: rotate(0deg) scale(1.04); }

        .float-dot { position: absolute; font-size: 24px; animation: floatY 4s ease-in-out infinite; }
        .float-dot.one { top: 4px; right: 22px; color: var(--primary); }
        .float-dot.two { bottom: 5px; left: 20px; color: var(--blue); animation-delay: -1.5s; }
        .float-dot.three { top: 40px; left: 8px; color: #f5a623; font-size: 14px; animation-delay: -2.5s; }
        @keyframes floatY {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-10px) rotate(10deg); }
        }

        /* ============ STATS ============ */
        .dash-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }
        .dash-stat {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          transition: transform 0.25s ease, border-color 0.25s;
          border: 1px solid var(--line);
          background: linear-gradient(160deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01));
        }
        .dash-stat::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 60%, color-mix(in srgb, var(--accent) 12%, transparent));
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .dash-stat:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--accent) 45%, var(--line));
        }
        .dash-stat:hover::before { opacity: 1; }

        .dash-icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: color-mix(in srgb, var(--accent) 15%, transparent);
          color: var(--accent);
          display: grid;
          place-items: center;
          flex-shrink: 0;
          box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 25%, transparent);
        }

        .dash-stat-body small { color: var(--muted); font-size: 12px; display: block; }
        .dash-stat-body strong { font-size: 24px; margin-top: 3px; display: block; letter-spacing: -0.5px; }

        .trend {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 3px;
          color: var(--accent);
          font-size: 10px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--accent) 10%, transparent);
        }

        /* ============ BOTTOM ============ */
        .dash-bottom {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 16px;
        }

        .quick-panel, .activity-panel {
          padding: 22px;
          border-radius: 18px;
          border: 1px solid var(--line);
          background: linear-gradient(160deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008));
        }

        .panel-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }
        .panel-head h2 { font-size: 17px; margin: 0 0 5px; font-weight: 700; }
        .panel-head p { font-size: 12px; color: var(--muted); margin: 0; }
        .pill {
          font-size: 9.5px;
          letter-spacing: 1.4px;
          padding: 5px 10px;
          border-radius: 999px;
          color: var(--primary);
          background: rgba(32, 199, 180, 0.1);
          border: 1px solid rgba(32, 199, 180, 0.25);
          font-weight: 700;
        }

        /* Quick links */
        .quick-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 11px;
        }
        .quick-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          border: 1px solid var(--line);
          border-radius: 13px;
          color: #dce7f6;
          font-size: 13px;
          transition: all 0.22s ease;
          background: rgba(255, 255, 255, 0.015);
          position: relative;
          overflow: hidden;
        }
        .quick-link::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent, color-mix(in srgb, var(--link-accent) 10%, transparent));
          opacity: 0;
          transition: opacity 0.25s;
          pointer-events: none;
        }
        .quick-link:hover {
          border-color: color-mix(in srgb, var(--link-accent) 50%, var(--line));
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -16px color-mix(in srgb, var(--link-accent) 80%, transparent);
        }
        .quick-link:hover::after { opacity: 1; }

        .quick-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: color-mix(in srgb, var(--link-accent) 15%, transparent);
          color: var(--link-accent);
          flex-shrink: 0;
          box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--link-accent) 25%, transparent);
        }
        .quick-text { display: flex; flex-direction: column; gap: 2px; }
        .quick-text b { font-size: 13px; font-weight: 600; }
        .quick-text small { font-size: 10px; color: var(--muted); letter-spacing: 0.5px; }
        .quick-arrow { margin-left: auto; color: var(--muted); transition: transform 0.25s, color 0.25s; }
        .quick-link:hover .quick-arrow {
          transform: translateX(3px);
          color: var(--link-accent);
        }

        /* Mini Chart */
        .mini-chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 8px;
          height: 90px;
          padding: 0 4px 6px;
          margin-bottom: 16px;
          border-bottom: 1px dashed var(--line);
        }
        .bar-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          height: 100%;
        }
        .bar-track {
          flex: 1;
          width: 100%;
          max-width: 20px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .bar-fill {
          width: 100%;
          border-radius: 6px;
          background: linear-gradient(180deg, #20c7b4, #17a999);
          transition: height 0.5s ease;
          box-shadow: 0 0 10px rgba(32, 199, 180, 0.5);
        }
        .bar-col small { font-size: 10px; color: var(--muted); }

        /* Empty state */
        .activity-empty {
          min-height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
          color: var(--muted);
          text-align: center;
          padding: 10px;
          border-radius: 14px;
          border: 1px dashed var(--line);
          background: rgba(255, 255, 255, 0.015);
        }
        .empty-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: var(--primary);
          background: rgba(32, 199, 180, 0.1);
          border: 1px solid rgba(32, 199, 180, 0.25);
        }
        .activity-empty b { color: #dbe6f4; font-size: 13px; }
        .activity-empty small { font-size: 11px; }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 900px) {
          .dash-bottom { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .welcome-art { display: none; }
          .dash-stats { grid-template-columns: 1fr; }
          .quick-grid { grid-template-columns: 1fr; }
          .hero-actions { width: 100%; }
          .btn { flex: 1; justify-content: center; }
        }
      `}</style>
    </div>
  );
}
