import { api, unwrap } from "../../lib/api";
import { supabase } from "../../lib/supabaseClient";

const sel = "*, author:profiles!author_id(full_name)";

export const listCourseNotices = async (courseId) =>
  unwrap(await supabase.from("notices").select(sel).eq("course_id", courseId).order("created_at", { ascending: false }));

// ড্যাশবোর্ডের জন্য: সবার নোটিশ + নিজের কোর্সের নোটিশ (RLS নিজেই ফিল্টার করে)
export const listRecentNotices = async (limit = 5) =>
  unwrap(await supabase.from("notices").select(sel).order("created_at", { ascending: false }).limit(limit));

export const createNotice = (body) => api.post("/notices", body).then((r) => r.data.data);
export const deleteNotice = (id) => api.delete(`/notices/${id}`);
