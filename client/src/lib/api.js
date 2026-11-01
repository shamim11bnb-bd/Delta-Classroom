import axios from 'axios';
import { supabase } from './supabaseClient.js';
export const api=axios.create({baseURL:(import.meta.env.VITE_API_URL||'').replace(/\/$/,'') ,timeout:20000});
api.interceptors.request.use(async config=>{if(supabase){const {data}=await supabase.auth.getSession();if(data.session?.access_token)config.headers.Authorization=`Bearer ${data.session.access_token}`;}return config;});
api.interceptors.response.use(r=>r,e=>Promise.reject(new Error(e.response?.data?.error||e.response?.data?.message||e.message||'সার্ভারের সঙ্গে সংযোগ করা যায়নি')));
export async function getJson(path,params){const {data}=await api.get(path,{params});return data;}
export async function postJson(path,body){const {data}=await api.post(path,body);return data;}
