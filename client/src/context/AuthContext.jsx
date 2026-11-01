import {createContext,useCallback,useEffect,useMemo,useState} from 'react';
import {supabase} from '../lib/supabaseClient.js';
export const AuthContext=createContext(null);
export function AuthProvider({children}){
 const [session,setSession]=useState(null),[profile,setProfile]=useState(null),[loading,setLoading]=useState(true);
 const loadProfile=useCallback(async(user)=>{if(!user||!supabase){setProfile(null);return;}const {data,error}=await supabase.from('profiles').select('*').eq('id',user.id).maybeSingle();if(!error)setProfile(data||{id:user.id,full_name:user.user_metadata?.full_name||user.email,role:'student'});},[]);
 useEffect(()=>{let alive=true;if(!supabase){setLoading(false);return;}supabase.auth.getSession().then(async({data})=>{if(!alive)return;setSession(data.session);await loadProfile(data.session?.user);if(alive)setLoading(false);});const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,s)=>{setSession(s);queueMicrotask(()=>loadProfile(s?.user));});return()=>{alive=false;subscription.unsubscribe();};},[loadProfile]);
 const signIn=async(email,password)=>{if(!supabase)throw new Error('Supabase environment variables সেট করা হয়নি।');const {error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;};
 const signUp=async({email,password,fullName})=>{if(!supabase)throw new Error('Supabase environment variables সেট করা হয়নি।');const {data,error}=await supabase.auth.signUp({email,password,options:{data:{full_name:fullName,role:'student'}}});if(error)throw error;return data;};
 const signOut=async()=>{if(supabase)await supabase.auth.signOut();setProfile(null);setSession(null);};
 const value=useMemo(()=>({session,user:session?.user||null,profile,role:profile?.role||null,loading,signIn,signUp,signOut,refreshProfile:()=>loadProfile(session?.user)}),[session,profile,loading,loadProfile]);
 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
