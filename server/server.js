// শুধু লোকাল ডেভেলপমেন্টের জন্য। Vercel-এ api/index.js ব্যবহার হয়।
import app from "./src/app.js";
import { env } from "./src/config/env.js";

app.listen(env.port, () => {
  console.log(`Delta Classroom API চলছে: http://localhost:${env.port}`);
});
