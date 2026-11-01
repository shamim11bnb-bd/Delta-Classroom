import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, GraduationCap, Users, Award, Play,
  CheckCircle2, Sparkles, ClipboardCheck, BarChart3,
  Video, FileText, Bell, Star, Mail, Phone, MapPin,
  Facebook, Youtube, Github,
} from 'lucide-react';

export default function HomePage() {
  /* ── Data (placeholder — পরে Supabase/API থেকে আসবে) ── */
  const stats = [
    { value: '১০০০+', label: 'শিক্ষার্থী', icon: GraduationCap },
    { value: '৫০+',   label: 'কোর্স',      icon: BookOpen },
    { value: '৩০+',   label: 'শিক্ষক',     icon: Users },
    { value: '৯৫%',   label: 'সন্তুষ্টি',  icon: Award },
  ];

  const features = [
    { icon: Video,          title: 'লাইভ ও রেকর্ডেড ক্লাস', desc: 'যেকোনো সময়, যেকোনো জায়গা থেকে ক্লাস করুন।' },
    { icon: ClipboardCheck, title: 'অ্যাসাইনমেন্ট ও কুইজ', desc: 'সহজে জমা দিন, ইনস্ট্যান্ট ফিডব্যাক পান।' },
    { icon: BarChart3,      title: 'প্রোগ্রেস ট্র্যাকিং', desc: 'নিজের অগ্রগতি গ্রাফে দেখুন প্রতিদিন।' },
    { icon: FileText,       title: 'পরীক্ষা ও ফলাফল', desc: 'অনলাইন পরীক্ষা, সাথে সাথে ফলাফল।' },
    { icon: Bell,           title: 'নোটিশ ও নোটিফিকেশন', desc: 'গুরুত্বপূর্ণ আপডেট মিস করবেন না।' },
    { icon: Award,          title: 'সার্টিফিকেট', desc: 'কোর্স শেষে পান ডিজিটাল সার্টিফিকেট।' },
  ];

  const courses = [
    { title: 'ম্যাথমেটিক্স', teacher: 'রহিম স্যার',    tag: 'Class 10',  color: '#20c7b4' },
    { title: 'ইংরেজি',       teacher: 'করিম ম্যাডাম',  tag: 'Class 9',   color: '#6d9cff' },
    { title: 'বিজ্ঞান',      teacher: 'সুমন স্যার',    tag: 'Class 10',  color: '#f5a524' },
  ];

  const steps = [
    { n: '০১', title: 'রেজিস্ট্রেশন করুন', desc: 'ফ্রি অ্যাকাউন্ট খুলুন মাত্র ১ মিনিটে।' },
    { n: '০২', title: 'কোর্স বেছে নিন',   desc: 'আপনার পছন্দের কোর্সে এনরোল করুন।' },
    { n: '০৩', title: 'শেখা শুরু করুন',  desc: 'লাইভ ক্লাস, অ্যাসাইনমেন্ট, পরীক্ষা — সব এক জায়গায়।' },
  ];

  const notices = [
    { title: 'নতুন ব্যাচ শুরু হচ্ছে আগামী সপ্তাহে', date: '২ দিন আগে' },
    { title: 'মিড-টার্ম পরীক্ষার রুটিন প্রকাশিত', date: '৫ দিন আগে' },
    { title: 'বিজ্ঞান মেলায় রেজিস্ট্রেশন চলছে', date: '১ সপ্তাহ আগে' },
  ];

  return (
    <div className="home-page">

      {/* ═══════ HERO ═══════ */}
      <section className="hero">
        <div className="hero-bg-dots" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-text">
            <span className="hero-badge">
              <Sparkles size={14} /> SA Delta Classroom
            </span>
            <h1>
              শেখার নতুন <span className="grad">অভিজ্ঞতা</span> <br />
              শুরু হোক আজই
            </h1>
            <p>
              আধুনিক অনলাইন ক্লাসরুম প্ল্যাটফর্ম — লাইভ ক্লাস, অ্যাসাইনমেন্ট,
              পরীক্ষা ও ফলাফল, সব এক জায়গায়।
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn-primary">
                শুরু করুন <ArrowRight size={17} />
              </Link>
              <Link to="/login" className="btn btn-ghost">
                <Play size={15} /> ডেমো দেখুন
              </Link>
            </div>
            <ul className="hero-checks">
              <li><CheckCircle2 size={16} /> ফ্রি ট্রায়াল</li>
              <li><CheckCircle2 size={16} /> কোনো কার্ড লাগবে না</li>
              <li><CheckCircle2 size={16} /> ২৪/৭ সাপোর্ট</li>
            </ul>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="art-card card-1">
              <div className="art-icon"><BookOpen size={22} /></div>
              <div className="art-lines">
                <span></span><span></span>
              </div>
            </div>
            <div className="art-card card-2">
              <div className="art-icon"><ClipboardCheck size={22} /></div>
              <div className="art-lines">
                <span></span><span></span>
              </div>
            </div>
            <div className="art-card card-3">
              <div className="art-icon"><Award size={22} /></div>
              <div className="art-lines">
                <span></span><span></span>
              </div>
            </div>
            <div className="art-glow" />
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="stats-strip">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div className="stat-item" key={i}>
              <div className="stat-icon"><Icon size={20} /></div>
              <div>
                <strong>{s.value}</strong>
                <small>{s.label}</small>
              </div>
            </div>
          );
        })}
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className="section features">
        <div className="section-head">
          <span className="kicker">FEATURES</span>
          <h2>সবকিছু যা শেখার জন্য দরকার</h2>
          <p>আধুনিক প্রযুক্তিতে সাজানো সহজ, সুন্দর আর শক্তিশালী টুলস।</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div className="feature-card" key={i}>
                <div className="feature-icon"><Icon size={22} /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════ COURSES ═══════ */}
      <section className="section courses">
        <div className="section-head row">
          <div>
            <span className="kicker">COURSES</span>
            <h2>জনপ্রিয় কোর্সসমূহ</h2>
          </div>
          <Link to="/student/courses" className="see-all">
            সব দেখুন <ArrowRight size={15} />
          </Link>
        </div>
        <div className="courses-grid">
          {courses.map((c, i) => (
            <div className="course-card" key={i}>
              <div
                className="course-thumb"
                style={{ background: `linear-gradient(135deg, ${c.color}33, ${c.color}11)`, borderColor: `${c.color}44` }}
              >
                <BookOpen size={34} color={c.color} />
                <span className="course-tag" style={{ color: c.color, background: `${c.color}1a`, borderColor: `${c.color}44` }}>
                  {c.tag}
                </span>
              </div>
              <div className="course-body">
                <h3>{c.title}</h3>
                <p><Users size={13} /> {c.teacher}</p>
                <div className="course-foot">
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={12} fill="currentColor" />)}
                  </div>
                  <Link to="/signup" className="course-cta">এনরোল <ArrowRight size={13} /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="section how">
        <div className="section-head">
          <span className="kicker">HOW IT WORKS</span>
          <h2>মাত্র ৩ ধাপে শুরু</h2>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-card" key={i}>
              <span className="step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ NOTICES ═══════ */}
      <section className="section notices">
        <div className="section-head row">
          <div>
            <span className="kicker">NOTICES</span>
            <h2>সাম্প্রতিক নোটিশ</h2>
          </div>
          <Link to="/notices" className="see-all">সব দেখুন <ArrowRight size={15} /></Link>
        </div>
        <ul className="notice-list">
          {notices.map((n, i) => (
            <li key={i} className="notice-item">
              <span className="notice-dot" />
              <div>
                <b>{n.title}</b>
                <small>{n.date}</small>
              </div>
              <ArrowRight size={16} className="notice-arrow" />
            </li>
          ))}
        </ul>
      </section>

      {/* ═══════ CTA BANNER ═══════ */}
      <section className="cta-banner">
        <div>
          <h2>আজই শুরু করুন আপনার শেখার যাত্রা</h2>
          <p>ফ্রি রেজিস্ট্রেশন করুন, কোনো ক্রেডিট কার্ড লাগবে না।</p>
        </div>
        <Link to="/signup" className="btn btn-primary">
          ফ্রি রেজিস্ট্রেশন <ArrowRight size={16} />
        </Link>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>SA Delta Classroom</h3>
            <p>আধুনিক শিক্ষার জন্য ডিজিটাল ক্লাসরুম প্ল্যাটফর্ম।</p>
            <div className="social-row">
              <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
              <a href="#" aria-label="YouTube"><Youtube size={16} /></a>
              <a href="#" aria-label="GitHub"><Github size={16} /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>লিংক</h4>
            <ul>
              <li><Link to="/">হোম</Link></li>
              <li><Link to="/student/courses">কোর্স</Link></li>
              <li><Link to="/notices">নোটিশ</Link></li>
              <li><Link to="/login">লগইন</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>সাহায্য</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">যোগাযোগ</a></li>
              <li><a href="#">প্রাইভেসি</a></li>
              <li><a href="#">শর্তাবলী</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>যোগাযোগ</h4>
            <ul className="contact-list">
              <li><Mail size={14} /> info@sadelta.com</li>
              <li><Phone size={14} /> +৮৮০ ১৭XX-XXXXXX</li>
              <li><MapPin size={14} /> ঢাকা, বাংলাদেশ</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SA Delta Classroom. সর্বস্বত্ব সংরক্ষিত।</span>
        </div>
      </footer>

      {/* ═══════ STYLES ═══════ */}
      <style>{`
        .home-page{max-width:1200px;margin:auto;padding:0 16px}

        /* ── HERO ── */
        .hero{position:relative;padding:clamp(40px,7vw,90px) clamp(20px,4vw,50px);border-radius:24px;margin-top:20px;overflow:hidden;background:radial-gradient(circle at 85% 15%,rgba(32,199,180,.18),transparent 35%),radial-gradient(circle at 10% 90%,rgba(109,156,255,.14),transparent 40%),linear-gradient(120deg,#172b43,#101c30)}
        .hero-bg-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px);background-size:22px 22px;opacity:.4;pointer-events:none}
        .hero-inner{display:grid;grid-template-columns:1.15fr .85fr;gap:40px;align-items:center;position:relative;z-index:1}
        .hero-badge{display:inline-flex;align-items:center;gap:6px;font-size:12px;padding:6px 12px;border-radius:999px;background:rgba(32,199,180,.15);color:var(--primary);border:1px solid rgba(32,199,180,.3);margin-bottom:20px}
        .hero h1{font-size:clamp(30px,5vw,52px);line-height:1.15;margin:0 0 18px;color:#fff}
        .grad{background:linear-gradient(90deg,var(--primary),var(--blue));-webkit-background-clip:text;background-clip:text;color:transparent}
        .hero p{font-size:clamp(14px,1.6vw,16px);color:var(--muted);margin:0 0 26px;line-height:1.7;max-width:520px}
        .hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:22px}
        .btn{display:inline-flex;align-items:center;gap:8px;padding:11px 20px;border-radius:12px;font-size:14px;font-weight:500;text-decoration:none;transition:all .25s ease;border:1px solid transparent;cursor:pointer}
        .btn-primary{background:var(--primary);color:#0a1724}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(32,199,180,.35)}
        .btn-ghost{background:rgba(255,255,255,.05);color:#dce7f6;border:1px solid rgba(255,255,255,.15)}
        .btn-ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(32,199,180,.4)}
        .hero-checks{list-style:none;padding:0;margin:0;display:flex;gap:18px;flex-wrap:wrap;font-size:12px;color:var(--muted)}
        .hero-checks li{display:flex;align-items:center;gap:6px}
        .hero-checks svg{color:var(--primary)}

        .hero-art{position:relative;height:320px;display:grid;place-items:center}
        .art-glow{position:absolute;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(32,199,180,.35),transparent 70%);filter:blur(20px)}
        .art-card{position:absolute;display:flex;gap:12px;align-items:center;padding:14px 18px;border-radius:16px;background:rgba(23,43,67,.85);border:1px solid rgba(32,199,180,.25);backdrop-filter:blur(8px);box-shadow:0 12px 30px rgba(0,0,0,.35);animation:floatCard 5s ease-in-out infinite}
        .art-card.card-1{top:20px;left:0;transform:rotate(-6deg);animation-delay:0s}
        .art-card.card-2{top:120px;right:0;transform:rotate(5deg);animation-delay:.8s}
        .art-card.card-3{bottom:20px;left:30px;transform:rotate(-3deg);animation-delay:1.6s}
        .art-icon{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:rgba(32,199,180,.18);color:var(--primary)}
        .art-lines{display:flex;flex-direction:column;gap:6px}
        .art-lines span{display:block;height:6px;border-radius:4px;background:rgba(255,255,255,.18)}
        .art-lines span:first-child{width:70px}
        .art-lines span:last-child{width:45px}
        @keyframes floatCard{0%,100%{translate:0 0}50%{translate:0 -10px}}

        /* ── STATS STRIP ── */
        .stats-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:22px 0;padding:18px;background:linear-gradient(120deg,rgba(32,199,180,.06),rgba(109,156,255,.05));border:1px solid var(--line);border-radius:18px}
        .stat-item{display:flex;align-items:center;gap:12px;padding:8px}
        .stat-icon{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:rgba(32,199,180,.12);color:var(--primary);flex-shrink:0}
        .stat-item strong{display:block;font-size:22px;color:#fff}
        .stat-item small{display:block;font-size:12px;color:var(--muted)}

        /* ── SECTION BASE ── */
        .section{margin:60px 0}
        .section-head{text-align:center;max-width:640px;margin:0 auto 36px}
        .section-head.row{display:flex;justify-content:space-between;align-items:flex-end;text-align:left;max-width:none}
        .kicker{display:inline-block;font-size:11px;letter-spacing:2px;color:var(--primary);font-weight:600;margin-bottom:10px}
        .section-head h2{font-size:clamp(22px,3vw,32px);color:#fff;margin:0 0 10px}
        .section-head p{color:var(--muted);margin:0;font-size:14px}
        .see-all{display:inline-flex;align-items:center;gap:6px;color:var(--primary);font-size:13px;text-decoration:none;font-weight:500}
        .see-all:hover{gap:10px}

        /* ── FEATURES ── */
        .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .feature-card{padding:24px;border-radius:18px;border:1px solid var(--line);background:rgba(255,255,255,.02);transition:all .3s ease}
        .feature-card:hover{transform:translateY(-4px);border-color:rgba(32,199,180,.4);background:rgba(32,199,180,.05)}
        .feature-icon{width:46px;height:46px;border-radius:13px;display:grid;place-items:center;background:rgba(32,199,180,.12);color:var(--primary);margin-bottom:14px}
        .feature-card h3{font-size:16px;color:#fff;margin:0 0 8px}
        .feature-card p{font-size:13px;color:var(--muted);line-height:1.6;margin:0}

        /* ── COURSES ── */
        .courses-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
        .course-card{border-radius:18px;overflow:hidden;border:1px solid var(--line);background:rgba(255,255,255,.02);transition:all .3s ease}
        .course-card:hover{transform:translateY(-4px);border-color:rgba(32,199,180,.4);box-shadow:0 12px 28px rgba(0,0,0,.25)}
        .course-thumb{position:relative;height:130px;display:grid;place-items:center;border-bottom:1px solid var(--line)}
        .course-tag{position:absolute;top:12px;right:12px;font-size:11px;padding:4px 10px;border-radius:20px;border:1px solid;font-weight:600}
        .course-body{padding:16px}
        .course-body h3{font-size:16px;margin:0 0 6px;color:#fff}
        .course-body p{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:5px;margin:0 0 14px}
        .course-foot{display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid var(--line)}
        .stars{display:flex;gap:2px;color:#f5a524}
        .course-cta{display:inline-flex;align-items:center;gap:4px;color:var(--primary);font-size:12px;text-decoration:none;font-weight:500}
        .course-cta:hover{gap:8px}

        /* ── HOW IT WORKS ── */
        .steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .step-card{position:relative;padding:28px 22px 22px;border-radius:18px;border:1px solid var(--line);background:rgba(255,255,255,.02);transition:all .3s ease}
        .step-card:hover{border-color:rgba(32,199,180,.4);background:rgba(32,199,180,.04)}
        .step-n{position:absolute;top:-14px;left:20px;font-size:32px;font-weight:800;background:linear-gradient(135deg,var(--primary),var(--blue));-webkit-background-clip:text;background-clip:text;color:transparent}
        .step-card h3{font-size:16px;margin:10px 0 8px;color:#fff}
        .step-card p{font-size:13px;color:var(--muted);margin:0;line-height:1.6}

        /* ── NOTICES ── */
        .notice-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
        .notice-item{display:flex;align-items:center;gap:14px;padding:16px 18px;border-radius:14px;border:1px solid var(--line);background:rgba(255,255,255,.02);transition:all .25s ease;cursor:pointer}
        .notice-item:hover{border-color:rgba(32,199,180,.4);background:rgba(32,199,180,.04)}
        .notice-dot{width:8px;height:8px;border-radius:50%;background:var(--primary);box-shadow:0 0 0 4px rgba(32,199,180,.15);flex-shrink:0}
        .notice-item b{display:block;font-size:14px;color:#fff;margin-bottom:2px}
        .notice-item small{font-size:11px;color:var(--muted)}
        .notice-arrow{margin-left:auto;color:var(--muted);transition:transform .25s,color .25s}
        .notice-item:hover .notice-arrow{transform:translateX(4px);color:var(--primary)}

        /* ── CTA BANNER ── */
        .cta-banner{margin:60px 0;padding:clamp(28px,5vw,50px);border-radius:22px;display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;background:radial-gradient(circle at 90% 20%,rgba(32,199,180,.25),transparent 40%),linear-gradient(120deg,#172b43,#101c30);border:1px solid rgba(32,199,180,.25)}
        .cta-banner h2{font-size:clamp(20px,2.6vw,28px);color:#fff;margin:0 0 8px}
        .cta-banner p{color:var(--muted);margin:0;font-size:14px}

        /* ── FOOTER ── */
        .site-footer{margin:60px 0 20px;padding:36px 26px 20px;border-radius:22px;background:linear-gradient(120deg,#0f1e30,#0a1626);border:1px solid var(--line)}
        .footer-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1.2fr;gap:28px;padding-bottom:28px;border-bottom:1px solid var(--line)}
        .footer-brand h3{font-size:17px;color:#fff;margin:0 0 10px}
        .footer-brand p{font-size:13px;color:var(--muted);line-height:1.6;margin:0 0 16px;max-width:280px}
        .social-row{display:flex;gap:8px}
        .social-row a{width:32px;height:32px;border-radius:9px;display:grid;place-items:center;border:1px solid var(--line);color:var(--muted);transition:all .25s}
        .social-row a:hover{border-color:var(--primary);color:var(--primary);background:rgba(32,199,180,.08)}
        .footer-col h4{font-size:13px;color:#fff;margin:0 0 12px;letter-spacing:.3px}
        .footer-col ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px}
        .footer-col a{font-size:12.5px;color:var(--muted);text-decoration:none;transition:color .2s}
        .footer-col a:hover{color:var(--primary)}
        .contact-list li{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--muted)}
        .contact-list svg{color:var(--primary);flex-shrink:0}
        .footer-bottom{padding-top:18px;text-align:center;font-size:11.5px;color:var(--muted)}

        /* ── RESPONSIVE ── */
        @media(max-width:900px){
          .hero-inner{grid-template-columns:1fr;text-align:center}
          .hero p,.hero-checks{margin-left:auto;margin-right:auto}
          .hero-actions{justify-content:center}
          .hero-art{height:280px;max-width:400px;margin:0 auto;width:100%}
          .features-grid,.courses-grid,.steps-grid{grid-template-columns:repeat(2,1fr)}
          .footer-grid{grid-template-columns:1fr 1fr}
        }
        @media(max-width:600px){
          .stats-strip{grid-template-columns:1fr 1fr}
          .features-grid,.courses-grid,.steps-grid{grid-template-columns:1fr}
          .section-head.row{flex-direction:column;align-items:flex-start;gap:8px}
          .cta-banner{flex-direction:column;text-align:center}
          .footer-grid{grid-template-columns:1fr}
          .hero-art{display:none}
        }
      `}</style>
    </div>
  );
}
