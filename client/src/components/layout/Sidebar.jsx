// src/components/layout/DashboardLayout.jsx
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Search,
  Menu,
  LogOut,
  UserRound,
  Settings,
  ChevronDown,
  Moon,
  Sun,
} from 'lucide-react';
import Sidebar from './Sidebar';
import useAuth from '../../hooks/useAuth.js';

export default function DashboardLayout() {
  const { profile, role, signOut } = useAuth();
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const roleLabel =
    role === 'admin' ? 'অ্যাডমিন' : role === 'teacher' ? 'শিক্ষক' : 'শিক্ষার্থী';

  return (
    <div className="dash-layout">
      {/* ==== Sidebar (mobile drawer + desktop fixed) ==== */}
      <div
        className={`sidebar-wrap ${mobileSidebar ? 'mobile-open' : ''}`}
        onClick={() => setMobileSidebar(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <Sidebar />
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileSidebar && (
        <div className="sidebar-overlay" onClick={() => setMobileSidebar(false)} />
      )}

      {/* ==== Main Content Area ==== */}
      <div className="dash-main">
        {/* Topbar */}
        <header className="topbar">
          <button
            className="icon-btn mobile-only"
            onClick={() => setMobileSidebar(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Search */}
          <div className="search-box">
            <Search size={16} />
            <input placeholder="কিছু খুঁজুন..." aria-label="Search" />
            <kbd>⌘K</kbd>
          </div>

          <div className="topbar-actions">
            {/* Theme toggle */}
            <button
              className="icon-btn"
              onClick={() => setDarkMode((d) => !d)}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Notifications */}
            <Link to="/notifications" className="icon-btn notif-btn" aria-label="Notifications">
              <Bell size={17} />
              <span className="badge">3</span>
            </Link>

            {/* User menu */}
            <div className="user-menu" ref={menuRef}>
              <button
                className="user-trigger"
                onClick={() => setMenuOpen((o) => !o)}
              >
                <div className="mini-avatar">
                  {(profile?.full_name || 'S').slice(0, 1).toUpperCase()}
                </div>
                <div className="mini-meta">
                  <b>{profile?.full_name || 'User'}</b>
                  <small>{roleLabel}</small>
                </div>
                <ChevronDown
                  size={14}
                  className={menuOpen ? 'rotate' : ''}
                />
              </button>

              {menuOpen && (
                <div className="dropdown">
                  <Link to="/profile" className="drop-item">
                    <UserRound size={15} /> প্রোফাইল
                  </Link>
                  <Link to={`/${role}/settings`} className="drop-item">
                    <Settings size={15} /> সেটিংস
                  </Link>
                  <div className="drop-divider" />
                  <button
                    className="drop-item danger"
                    onClick={async () => {
                      await signOut();
                      nav('/');
                    }}
                  >
                    <LogOut size={15} /> লগআউট
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="dash-content">
          <Outlet />
        </main>
      </div>

      <style>{`
        /* ============ LAYOUT GRID ============ */
        .dash-layout {
          display: flex;
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 0%, rgba(32, 199, 180, 0.04), transparent 40%),
            radial-gradient(circle at 80% 100%, rgba(109, 156, 255, 0.05), transparent 45%),
            #0b1422;
          color: #dce7f6;
        }

        .sidebar-wrap {
          position: sticky;
          top: 0;
          height: 100vh;
          flex-shrink: 0;
          z-index: 40;
        }

        .dash-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        /* ============ TOPBAR ============ */
        .topbar {
          position: sticky;
          top: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 24px;
          backdrop-filter: blur(14px);
          background: rgba(11, 20, 34, 0.75);
          border-bottom: 1px solid var(--line);
        }

        /* Search */
        .search-box {
          flex: 1;
          max-width: 420px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 14px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid var(--line);
          border-radius: 11px;
          color: var(--muted);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .search-box:focus-within {
          border-color: rgba(32, 199, 180, 0.5);
          background: rgba(32, 199, 180, 0.05);
        }
        .search-box input {
          flex: 1;
          background: none;
          border: 0;
          outline: none;
          color: #dce7f6;
          font-size: 13px;
        }
        .search-box input::placeholder { color: var(--muted); }
        .search-box kbd {
          font-size: 10px;
          padding: 2px 6px;
          border: 1px solid var(--line);
          border-radius: 5px;
          color: var(--muted);
        }

        /* Actions */
        .topbar-actions {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .icon-btn {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.03);
          color: #b8c8dd;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }
        .icon-btn:hover {
          color: var(--primary);
          border-color: rgba(32, 199, 180, 0.45);
          background: rgba(32, 199, 180, 0.08);
        }

        .notif-btn .badge {
          position: absolute;
          top: -3px;
          right: -3px;
          min-width: 17px;
          height: 17px;
          border-radius: 999px;
          background: linear-gradient(135deg, #f5a623, #f48023);
          color: #23130a;
          font-size: 9px;
          font-weight: 800;
          display: grid;
          place-items: center;
          padding: 0 4px;
          box-shadow: 0 0 0 2px #0b1422;
        }

        /* User menu */
        .user-menu { position: relative; }

        .user-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px 10px 5px 5px;
          border-radius: 12px;
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.03);
          color: #dce7f6;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .user-trigger:hover {
          border-color: rgba(32, 199, 180, 0.4);
          background: rgba(32, 199, 180, 0.05);
        }

        .mini-avatar {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          background: linear-gradient(135deg, #20c7b4, #4679c9);
          color: #071c23;
          font-weight: 800;
          font-size: 12px;
          display: grid;
          place-items: center;
        }
        .mini-meta { display: flex; flex-direction: column; text-align: left; }
        .mini-meta b { font-size: 12px; max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .mini-meta small { font-size: 10px; color: var(--muted); }
        .user-trigger svg { color: var(--muted); transition: transform 0.25s ease; }
        .user-trigger svg.rotate { transform: rotate(180deg); }

        /* Dropdown */
        .dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          min-width: 200px;
          padding: 6px;
          background: #132236;
          border: 1px solid var(--line);
          border-radius: 12px;
          box-shadow: 0 24px 48px -16px rgba(0, 0, 0, 0.6);
          animation: slideDown 0.18s ease;
          z-index: 50;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .drop-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 11px;
          border-radius: 8px;
          color: #b8c8dd;
          font-size: 12.5px;
          background: none;
          border: 0;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
        }
        .drop-item:hover {
          background: rgba(32, 199, 180, 0.1);
          color: #6de2d5;
        }
        .drop-item.danger { color: #f48b9b; }
        .drop-item.danger:hover {
          background: rgba(244, 139, 155, 0.1);
          color: #ff9eac;
        }
        .drop-divider {
          height: 1px;
          margin: 4px 6px;
          background: var(--line);
        }

        /* ============ CONTENT ============ */
        .dash-content {
          flex: 1;
          padding: 24px;
          overflow-x: hidden;
        }

        /* ============ MOBILE ============ */
        .mobile-only { display: none; }
        .sidebar-overlay { display: none; }

        @media (max-width: 800px) {
          .dash-layout { flex-direction: column; }

          .sidebar-wrap {
            position: fixed;
            top: 0;
            left: -280px;
            height: 100vh;
            width: 260px;
            z-index: 60;
            transition: left 0.3s ease;
          }
          .sidebar-wrap.mobile-open { left: 0; }
          .sidebar-wrap > div { height: 100%; }
          .sidebar-wrap .sidebar {
            height: 100%;
            flex-direction: column !important;
            overflow-y: auto;
            overflow-x: hidden;
          }
          .sidebar-wrap .sidebar nav { flex-direction: column; }

          .sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(4, 10, 20, 0.6);
            backdrop-filter: blur(3px);
            z-index: 55;
            animation: fadeIn 0.2s ease;
          }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

          .mobile-only { display: grid; }

          .topbar { padding: 12px 14px; }
          .search-box { max-width: none; }
          .search-box kbd { display: none; }
          .mini-meta { display: none; }
          .dash-content { padding: 16px; }
        }

        @media (max-width: 480px) {
          .search-box { display: none; }
        }
      `}</style>
    </div>
  );
}
