'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // ইউজারের রোল চেক করার জন্য accounts টেবিল থেকে ডাটা আনা
  const { data: accountData } = await supabase
    .from('accounts')
    .select('role')
    .eq('id', data.user.id)
    .single();

  // রোল যদি admin হয়, তবে অ্যাডমিন প্যানেলে পাঠাবে, অন্যথায় স্টুডেন্ট ড্যাশবোর্ডে
  if (accountData?.role === 'admin') {
    redirect('/admin/dashboard');
  } else {
    redirect('/dashboard');
  }
}
