import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Render assigns the listening port through process.env.PORT.
// Leading-dot host entry allows Render's generated *.onrender.com hostnames.
const renderPort = Number(process.env.PORT) || 4173;

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: [".onrender.com"],
  },
  preview: {
    host: "0.0.0.0",
    port: renderPort,
    strictPort: true,
    allowedHosts: [".onrender.com"],
  },
});
