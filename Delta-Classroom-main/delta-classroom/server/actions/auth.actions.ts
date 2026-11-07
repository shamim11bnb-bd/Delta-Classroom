'use server';

type AuthResult = {
  success: boolean;
  error?: string;
  redirectTo?: string;
};

import { createClient } from '@/lib/supabase/server';

export async function loginAction(formData: FormData): Promise<AuthResult> {
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

  // Check user role from accounts table
  const { data: accountData } = await supabase
    .from('accounts')
    .select('role')
    .eq('id', data.user.id)
    .single();

  if (accountData?.role === 'admin') {
    return { success: true, redirectTo: '/admin/dashboard' };
  } else {
    return { success: true, redirectTo: '/dashboard' };
  }
}

export async function registerAction(formData: FormData): Promise<AuthResult> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password || !name) {
    return { success: false, error: 'All fields are required' };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data.user) {
    // Insert account record
    await supabase.from('accounts').insert({
      id: data.user.id,
      email: email,
      name: name,
      role: 'student',
    });
  }

  return { success: true, redirectTo: '/dashboard' };
}
