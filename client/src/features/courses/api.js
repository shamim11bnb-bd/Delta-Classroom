import {api} from '../../lib/api.js';
export const listCourses=async(params)=>{const {data}=await api.get('/courses',{params});return data;};
export const createCourse=async(payload)=>{const {data}=await api.post('/courses',payload);return data;};
