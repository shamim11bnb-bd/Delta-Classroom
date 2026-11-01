import { useState } from 'react';
import { AppRoutes } from './AppRoutes.jsx';
import { ToastContext } from '../context/ToastContext.jsx';
import Toast from '../components/common/Toast.jsx';
export default function App(){
 const [toast,setToast]=useState(null);
 const notify=(message,type='success')=>{setToast({message,type});window.clearTimeout(window.__toastTimer);window.__toastTimer=window.setTimeout(()=>setToast(null),3200)};
 return <ToastContext.Provider value={notify}><AppRoutes/><Toast toast={toast} onClose={()=>setToast(null)}/></ToastContext.Provider>
}
