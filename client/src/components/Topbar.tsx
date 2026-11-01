"use client";
import { usePathname } from "next/navigation";
const labels:Record<string,string>={"/dashboard":"Dashboard","/courses":"Courses","/mycourse":"My Courses","/exam":"Examinations","/result":"Results","/notice":"Notices","/profile":"My Profile","/questionbank":"Question Bank"};
export default function Topbar(){const path=usePathname();const key=Object.keys(labels).find(k=>path===k)||" /dashboard";return <header className="topbar"><div className="crumb"><span className="mobile-menu">☰　</span>Learning Portal　/　<strong>{labels[key]||"Workspace"}</strong></div><div className="top-actions"><div className="search">⌕　Search courses, lessons...</div><span>♧</span><div className="avatar">S</div></div></header>}
