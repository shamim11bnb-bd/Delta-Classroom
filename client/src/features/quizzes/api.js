import {api} from '../../lib/api.js';
export const listQuizzes=async(params)=>{const {data}=await api.get('/quizzes',{params});return data;};
export const createQuizze=async(payload)=>{const {data}=await api.post('/quizzes',payload);return data;};
