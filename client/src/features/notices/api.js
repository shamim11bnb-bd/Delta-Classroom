import {api} from '../../lib/api.js';
export const listNotices=async(params)=>{const {data}=await api.get('/notices',{params});return data;};
export const createNotice=async(payload)=>{const {data}=await api.post('/notices',payload);return data;};
