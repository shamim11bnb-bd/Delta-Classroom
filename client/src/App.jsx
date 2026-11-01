import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import AppRoutes from "./routes/AppRoutes";
import { isClientConfigured, missingClientEnv } from "./lib/supabaseClient";

function EnvironmentSetupNotice() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px", background: "#f2f6f5", fontFamily: '"Hind Siliguri", system-ui, sans-serif', color: "#0e2a3a" }}>
      <section style={{ width: "min(620px, 100%)", background: "#fff", border: "1px solid #cbdad8", borderRadius: "16px", padding: "28px", boxShadow: "0 12px 36px rgba(14,42,58,.08)" }}>
        <h1 style={{ fontSize: "1.7rem", margin: "0 0 12px" }}>SA Delta Classroom</h1>
        <h2 style={{ fontSize: "1.2rem" }}>Environment Variables সেটআপ বাকি</h2>
        <p>Render Dashboard → Client Service → Environment-এ নিচের Variable-গুলো যোগ করে নতুন Deploy দিন।</p>
        <ul>{missingClientEnv.map((name) => <li key={name}><code>{name}</code></li>)}</ul>
        <p style={{ marginBottom: 0, color: "#55707c" }}>Supabase-এর URL ও publishable/anon key Client Service-এ দিন। Service Role Key কখনো এখানে দেবেন না।</p>
      </section>
    </main>
  );
}

export default function App() {
  if (!isClientConfigured) return <EnvironmentSetupNotice />;
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
