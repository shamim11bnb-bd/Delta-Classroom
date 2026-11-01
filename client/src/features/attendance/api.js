import {api} from '../../lib/api.js';
export const listAttendance=async(params)=>{const {data}=await api.get('/attendance',{params});return data;};
export const createAttendance=async(payload)=>{const {data}=await api.post('/attendance',payload);return data;};
