import axios from "axios";
import { supabase } from "./supabaseClient";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
});

api.interceptors.request.use(async (config) => {
  if (!supabase) throw new Error("Supabase configuration is missing.");
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(new Error(err.response?.data?.error || err.message || "নেটওয়ার্কে সমস্যা হয়েছে"))
);

export function unwrap({ data, error }) {
  if (error) throw new Error(error.message);
  return data;
}
