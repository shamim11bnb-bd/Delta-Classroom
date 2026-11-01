import {api} from '../../lib/api.js';
export const listAssignments=async(params)=>{const {data}=await api.get('/assignments',{params});return data;};
export const createAssignment=async(payload)=>{const {data}=await api.post('/assignments',payload);return data;};
