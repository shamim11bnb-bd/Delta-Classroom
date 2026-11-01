"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { apiRequest, saveSession } from "@/lib/api";
import { useRouter } from "next/navigation";

type Props = { title: string; desc: string; button: string; link: string; linkText: string };
export default function AuthPage({ title, desc, button, link, linkText }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const isRegister = title === "নতুন অ্যাকাউন্ট তৈরি করুন";
  const isLogin = title === "লগইন";
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError(""); setMessage("");
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    try {
      if (isLogin) {
        const result = await apiRequest<{session:{access_token:string}}>("/auth/login", { method:"POST", body:JSON.stringify({ email, password:form.get("password") }) });
        saveSession(result.session.access_token); router.push("/dashboard");
      } else if (isRegister) {
        const result = await apiRequest<{message:string;session?:{access_token:string}}>("/auth/register", { method:"POST", body:JSON.stringify({ full_name:form.get("full_name"), email, password:form.get("password"), phone:form.get("phone") || undefined }) });
        if (result.session?.access_token) { saveSession(result.session.access_token); router.push("/dashboard"); }
        else setMessage(result.message || "নিবন্ধন সফল। ইমেইল যাচাই করে লগইন করুন।");
      } else if (title === "পাসওয়ার্ড ভুলে গেছেন?") {
        await apiRequest("/auth/forgot-password", { method:"POST", body:JSON.stringify({email}) });
        setMessage("ইমেইলটি Supabase-এ নিবন্ধিত থাকলে পাসওয়ার্ড রিসেটের নির্দেশনা পাঠানো হবে।");
      } else {
        setMessage("এই ধাপটি Supabase recovery link/OTP workflow সম্পূর্ণভাবে যুক্ত করার পর ব্যবহার করা যাবে। আপাতত লগইন পেজে ফিরে যান।");
      }
    } catch (err) { setError(err instanceof Error ? err.message : "অনুরোধ সম্পন্ন হয়নি।"); }
    finally { setBusy(false); }
  }
  return <div className="auth-wrap"><section className="auth-side"><div className="brand"><div className="brand-mark">SA</div><div><div className="brand-name">SA Delta</div><div className="brand-sub">CLASSROOM</div></div></div><h1>শিখুন নিজের গতিতে, গড়ুন নিজের ভবিষ্যৎ।</h1><p>একটি স্মার্ট লার্নিং প্ল্যাটফর্ম — কোর্স, ক্লাস, পরীক্ষা এবং ফলাফল এক জায়গায়।</p><div style={{marginTop:35,color:"#b9c8ff",fontSize:13}}>Learn • Practice • Achieve</div></section><section className="auth-main"><div className="auth-card"><div className="eyebrow">WELCOME TO SA DELTA</div><h1 className="h1">{title}</h1><p className="sub">{desc}</p><form onSubmit={submit}>
    {isRegister && <div className="field"><label>পূর্ণ নাম</label><input name="full_name" placeholder="আপনার নাম লিখুন" minLength={2} maxLength={100} required /></div>}
    <div className="field"><label>ইমেইল</label><input name="email" type="email" placeholder="name@example.com" required /></div>
    {isRegister && <div className="field"><label>মোবাইল (ঐচ্ছিক)</label><input name="phone" type="tel" placeholder="01XXXXXXXXX" /></div>}
    {(isLogin || isRegister) && <div className="field"><label>পাসওয়ার্ড</label><input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} required /></div>}
    {error && <p role="alert" style={{color:"#b42318",fontSize:13}}>{error}</p>}{message && <p role="status" style={{color:"#067647",fontSize:13}}>{message}</p>}
    <button className="btn full" type="submit" disabled={busy}>{busy ? "অপেক্ষা করুন..." : `${button}　→`}</button>
    </form>{isLogin && <div className="auth-foot"><Link href="/forgot-password">পাসওয়ার্ড ভুলে গেছেন?</Link></div>}<div className="auth-foot"><Link href={link}>{linkText}</Link></div><div className="auth-foot"><Link href="/">← হোম পেজে ফিরে যান</Link></div></div></section></div>;
}
