import axios from "axios";
import { supabase } from "./supabaseClient";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// প্রতিটি রিকোয়েস্টে Supabase সেশনের টোকেন যোগ হয়
api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// সার্ভারের বাংলা error message সরাসরি দেখানোর জন্য
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(new Error(err.response?.data?.error || "নেটওয়ার্কে সমস্যা হয়েছে"))
);

// Supabase query-র { data, error } থেকে error থাকলে throw করে
export function unwrap({ data, error }) {
  if (error) throw new Error(error.message);
  return data;
}
