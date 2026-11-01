import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROLES } from "../../utils/format";

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="nav">
      <div className="container">
        <Link to="/" className="brand">
          <img src="/favicon.svg" width="30" height="30" alt="" />
          Delta Classroom
        </Link>
        <nav className="nav-links" aria-label="প্রধান মেনু">
          <NavLink to="/courses">কোর্স</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard">ড্যাশবোর্ড</NavLink>
              <span className="muted" style={{ color: "#9fbcc2" }}>
                {profile?.full_name} ({ROLES[profile?.role] || "…"})
              </span>
              <button className="btn btn-ghost btn-sm" style={{ color: "#fff" }}
                onClick={async () => { await signOut(); navigate("/"); }}>
                লগআউট
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">লগইন</NavLink>
              <Link to="/signup" className="btn btn-accent btn-sm">বিনামূল্যে শুরু করুন</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
