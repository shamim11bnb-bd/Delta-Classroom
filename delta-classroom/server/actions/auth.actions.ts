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

  // ইউজার ডাটাবেজ থেকে তার রোল চেক করা
  const { data: accountData } = await supabase
    .from('accounts')
    .select('role')
    .eq('id', data.user.id)
    .single();

  // যদি রোল admin হয় তবে অ্যাডমিন ড্যাশবোর্ডে পাঠাবে, না হলে সাধারণ স্টুডেন্ট ড্যাশবোর্ডে
  if (accountData?.role === 'admin') {
    redirect('/admin/dashboard');
  } else {
    redirect('/dashboard');
  }
}

export async function registerAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'All fields are required' };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  redirect('/dashboard');
}
