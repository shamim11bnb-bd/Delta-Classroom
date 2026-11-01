import { Link } from 'react-router-dom';
import {
  ArrowUpRight, BookOpen, Users, ClipboardCheck, Activity,
  CalendarDays, ChevronRight, GraduationCap, UserCog,
  Bell, ShieldCheck, TrendingUp, Zap,
} from 'lucide-react';
import useAuth from '../../../hooks/useAuth.js';

/* ── Pure SVG progress ring ── */
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

export default function AdminDashboard() {
  const { profile } = useAuth();

  const shortcuts = [
    ['ইউজার ম্যানেজমেন্ট', '/admin/users'],
    ['কোর্স ম্যানেজমেন্ট', '/admin/courses'],
    ['পেমেন্ট', '/admin/payments'],
    ['রিপোর্ট', '/admin/reports'],
  ];

  const today = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  // প্লেসহোল্ডার — পরে Supabase থেকে আসবে
  const stats = [
    ['মোট ব্যবহারকারী', '০', Users, null],
    ['শিক্ষার্থী', '০', GraduationCap, null],
    ['শিক্ষক', '০', UserCog, null],
    ['মোট কোর্স', '০', BookOpen, 0], // ৪র্থ কার্ডে ring
  ];

  const pendingApprovals = [
    { type: 'teacher', name: 'নতুন শিক্ষক অনুরোধ', time: '২ ঘন্টা আগে' },
    { type: 'student', name: 'নতুন শিক্ষার্থী রেজিস্ট্রেশন', time: '৫ ঘন্টা আগে' },
  ];

  // role breakdown (পরে Supabase count থেকে আসবে)
  const roleBreakdown = [
    { label: 'শিক্ষার্থী', value: 0, color: 'var(--primary)' },
    { label: 'শিক্ষক', value: 0, color: 'var(--blue)' },
    { label: 'অ্যাডমিন', value: 0, color: '#f5a524' },
  ];
  const totalUsers = roleBreakdown.reduce((s, r) => s + r.value, 0);

  const systemHealth = [
    { label: 'Supabase', status: 'ok' },
    { label: 'API Server', status: 'ok' },
    { label: 'Render Hosting', status: 'ok' },
  ];

  return (
    <div className="dash-page">

      {/* ── Welcome banner ── */}
      <section className="welcome panel">
        <div>
          <div className="eyebrow">ADMIN CONTROL CENTER</div>
          <h1>স্বাগতম, {profile?.full_name || 'Admin'} 👋</h1>
          <p className="today-line">
            <CalendarDays size={14} /> {today}
          </p>
          <p>প্রতিষ্ঠানের শিক্ষা কার্যক্রম এক জায়গা থেকে নিয়ন্ত্রণ করুন।</p>
          <Link to="/admin/courses" className="btn btn-primary">
            শুরু করুন <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="welcome-art">
          <div className="art-circle"><ShieldCheck size={55} /></div>
          <span className="float-dot one">✦</span>
          <span className="float-dot two">+</span>
        </div>
      </section>

      {/* ── Stats (4 cards) ── */}
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

          {/* Pending approvals */}
          <section className="panel pending-panel">
            <div className="panel-head">
              <div>
                <h2>অনুমোদনের অপেক্ষায়</h2>
                <p>নতুন অনুরোধগুলো দেখুন</p>
              </div>
              <Bell size={18} color="var(--primary)" />
            </div>
            <ul className="pending-list">
              {pendingApprovals.map((p, i) => (
                <li key={i} className={`pending-item ${p.type}`}>
                  <span className="dot" />
                  <div>
                    <b>{p.name}</b>
                    <small>{p.time}</small>
                  </div>
                  <ChevronRight size={16} className="pending-arrow" />
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right column */}
        <div className="right-col">

          {/* Activity */}
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

          {/* Role breakdown */}
          <section className="panel breakdown-panel">
            <div className="panel-head">
              <div>
                <h2>ব্যবহারকারী বিশ্লেষণ</h2>
                <p>রোল অনুযায়ী বিভাজন</p>
              </div>
              <TrendingUp size={18} color="var(--primary)" />
            </div>
            <div className="bar-track">
              {roleBreakdown.map((r, i) => (
                <span
                  key={i}
                  className="bar-seg"
                  style={{
                    width: totalUsers ? `${(r.value / totalUsers) * 100}%` : '33.33%',
                    background: r.color,
                    opacity: totalUsers ? 1 : 0.25,
                  }}
                />
              ))}
            </div>
            <ul className="legend-list">
              {roleBreakdown.map((r) => (
                <li key={r.label}>
                  <span className="legend-dot" style={{ background: r.color }} />
                  <span>{r.label}</span>
                  <b>{r.value}</b>
                </li>
              ))}
            </ul>
          </section>

          {/* System health */}
          <section className="panel health-panel">
            <div className="panel-head">
              <div>
                <h2>সিস্টেম স্ট্যাটাস</h2>
                <p>সার্ভিস চলছে কিনা</p>
              </div>
              <Zap size={18} color="var(--primary)" />
            </div>
            <ul className="health-list">
              {systemHealth.map((s) => (
                <li key={s.label}>
                  <span className={`status-dot ${s.status}`} />
                  <span>{s.label}</span>
                  <b className="status-text">{s.status === 'ok' ? 'OK' : 'Down'}</b>
                </li>
              ))}
            </ul>
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
        .dash-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin:20px 0}
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
        .quick-panel,.activity-panel,.pending-panel,.breakdown-panel,.health-panel{padding:21px}
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

        /* Pending approvals */
        .pending-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
        .pending-item{display:flex;gap:12px;align-items:center;padding:12px;border-radius:12px;border:1px solid var(--line);transition:border-color .25s,background .25s}
        .pending-item:hover{border-color:rgba(32,199,180,.4);background:rgba(32,199,180,.04)}
        .pending-item .dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;background:var(--blue);box-shadow:0 0 0 4px rgba(109,156,255,.15)}
        .pending-item.teacher .dot{background:var(--primary);box-shadow:0 0 0 4px rgba(32,199,180,.15)}
        .pending-item b{display:block;font-size:13px;color:#dbe6f4}
        .pending-item small{display:block;font-size:11px;color:var(--muted);margin-top:2px}
        .pending-arrow{margin-left:auto;color:var(--muted);transition:transform .25s,color .25s}
        .pending-item:hover .pending-arrow{transform:translateX(4px);color:var(--primary)}

        /* Activity empty */
        .activity-empty{min-height:130px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;color:var(--muted);text-align:center}
        .activity-empty svg{color:var(--primary)}
        .activity-empty b{color:#dbe6f4;font-size:13px}
        .activity-empty small{font-size:11px}

        /* Role breakdown */
        .bar-track{display:flex;height:10px;border-radius:6px;overflow:hidden;background:rgba(255,255,255,.05);margin-bottom:14px}
        .bar-seg{transition:width .8s ease,opacity .3s ease}
        .legend-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px}
        .legend-list li{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--muted)}
        .legend-list b{margin-left:auto;color:#dbe6f4;font-size:13px}
        .legend-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}

        /* System health */
        .health-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
        .health-list li{display:flex;align-items:center;gap:10px;font-size:13px;color:#dbe6f4;padding:10px 12px;border-radius:10px;border:1px solid var(--line)}
        .status-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;animation:pulse 2s infinite}
        .status-dot.ok{background:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,.18)}
        .status-dot.down{background:#ef4444;box-shadow:0 0 0 3px rgba(239,68,68,.18)}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        .status-text{margin-left:auto;font-size:11px;color:#22c55e;font-weight:600}
        .status-dot.down ~ .status-text{color:#ef4444}

        /* Responsive */
        @media(max-width:1000px){
          .dash-stats{grid-template-columns:repeat(2,1fr)}
        }
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
