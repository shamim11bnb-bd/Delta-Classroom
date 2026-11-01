import 'dotenv/config';

const required = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
export function validateEnvironment() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  if (!/^https:\/\/.+\.supabase\.co$/.test(process.env.SUPABASE_URL)) {
    throw new Error('SUPABASE_URL must be your HTTPS Supabase project URL.');
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 10000),
  clientUrl: process.env.CLIENT_URL || '',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(',').map((v) => v.trim()).filter(Boolean),
  supabaseUrl: process.env.SUPABASE_URL,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};
