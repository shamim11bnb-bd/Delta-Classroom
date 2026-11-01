import { useState } from "react";
import { api } from "../../lib/api";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../../components/common/Loader";
import Alert from "../../components/ui/Alert";
import NoticeBoard from "../notices/NoticeBoard";
import { ROLES, formatDate } from "../../utils/format";

export default function AdminDashboard() {
  const stats = useFetch(() => api.get("/users/stats").then((r) => r.data.data), []);
  const users = useFetch(() => api.get("/users").then((r) => r.data.data), []);
  const [msg, setMsg] = useState("");

  async function changeRole(id, role) {
    setMsg("");
    try {
      await api.patch(`/users/${id}/role`, { role });
      users.reload();
    } catch (e) {
      setMsg(e.message);
    }
  }

  if (stats.loading || users.loading) return <Loader />;
  const s = stats.data;

  return (
    <div className="stack">
      <Alert>{stats.error || users.error || msg}</Alert>
      {s && (
        <div className="stats">
          <div className="stat"><b>{s.users}</b>মোট ইউজার</div>
          <div className="stat"><b>{s.courses}</b>কোর্স</div>
          <div className="stat"><b>{s.enrollments}</b>ভর্তি</div>
          <div className="stat"><b>{s.submissions}</b>জমা পড়া অ্যাসাইনমেন্ট</div>
        </div>
      )}

      <section>
        <h2>ইউজার ব্যবস্থাপনা</h2>
        <div className="table-wrap">
          <table>
            <thead><tr><th>নাম</th><th>ভূমিকা</th><th>যোগ দিয়েছেন</th></tr></thead>
            <tbody>
              {users.data?.map((u) => (
                <tr key={u.id}>
                  <td>{u.full_name || "(নাম নেই)"}</td>
                  <td>
                    <select className="input" style={{ maxWidth: 160 }} value={u.role} onChange={(e) => changeRole(u.id, e.target.value)} aria-label="ভূমিকা">
                      {Object.entries(ROLES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </td>
                  <td>{formatDate(u.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>সবার জন্য নোটিশ</h2>
        <NoticeBoard canPost />
      </section>
    </div>
  );
}
