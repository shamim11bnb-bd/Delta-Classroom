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
    // accounts টেবিলে ইউজার ডাটা সেভ করা (যদি অলরেডি ট্রিগার বা অন্য কিছু না থাকে)
    const { error: insertError } = await supabase.from('accounts').upsert({
      id: data.user.id,
      email: email,
      name: name,
      role: 'student',
    });

    if (insertError) {
      console.error('Account table insert error:', insertError.message);
    }
  }

  return { success: true, redirectTo: '/dashboard' };
}
