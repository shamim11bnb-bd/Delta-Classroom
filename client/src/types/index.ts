export type UserRole = "student" | "admin";
export interface User { id:string; full_name:string; email:string; role:UserRole; avatar_url?:string }
export interface Course { id:string; title:string; description:string; thumbnail_url?:string; price:number; published:boolean }
