import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {supabase} from '../../../lib/supabaseClient.js';
import {useToast} from '../../../context/ToastContext.jsx';
export default function ResetPassword(){
 const [value,setValue]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const toast=useToast(),nav=useNavigate();
 const submit=async e=>{e.preventDefault();setBusy(true);setError('');try{
  if(!supabase)throw new Error('Supabase সেটআপ করা হয়নি');
  if('password'==='email'){const {error}=await supabase.auth.resetPasswordForEmail(value,{redirectTo:window.location.origin+'/reset-password'});if(error)throw error;toast('রিসেট লিংক ইমেইলে পাঠানো হয়েছে');}
  else{const {error}=await supabase.auth.updateUser({password:value});if(error)throw error;toast('পাসওয়ার্ড পরিবর্তন হয়েছে');nav('/login');}
 }catch(e){setError(e.message)}finally{setBusy(false)}};
 return <div className="auth-page"><div className="auth-card panel"><div className="eyebrow">ACCOUNT RECOVERY</div><h1>নতুন পাসওয়ার্ড দিন</h1><p className="muted">নতুন একটি নিরাপদ পাসওয়ার্ড সেট করুন।</p>{error&&<div className="error">{error}</div>}<form onSubmit={submit} className="form"><label className="field">নতুন পাসওয়ার্ড<input required type="password" value={value} onChange={e=>setValue(e.target.value)} minLength={8} placeholder="কমপক্ষে ৮ অক্ষর"/></label><button className="btn btn-primary" disabled={busy}>{busy?'অপেক্ষা করুন...':'চালিয়ে যান'}</button></form><Link className="back" to="/login">লগইনে ফিরে যান</Link></div><style>{`.auth-page{min-height:65vh;display:grid;place-items:center;padding:35px 16px}.auth-card{width:min(440px,100%);padding:35px}h1{font-size:27px;margin:10px 0}.muted{font-size:13px;line-height:1.7}.form{display:grid;gap:18px;margin-top:25px}.back{display:block;text-align:center;color:var(--primary);font-size:12px;margin-top:20px}.error{padding:10px;background:rgba(251,113,133,.1);color:#ff9aaa;border-radius:9px;font-size:12px}`}</style></div>;
}
