import "dotenv/config";

const clientOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const env = {
  port: Number(process.env.PORT) || 5000,
  clientOrigins,
  supabaseUrl: process.env.SUPABASE_URL?.trim(),
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
};

const missing = [
  !env.supabaseUrl && "SUPABASE_URL",
  !env.serviceKey && "SUPABASE_SERVICE_ROLE_KEY",
].filter(Boolean);

if (missing.length) {
  throw new Error(`Missing required server environment variables: ${missing.join(", ")}. Add them in Render → Backend Service → Environment.`);
}
