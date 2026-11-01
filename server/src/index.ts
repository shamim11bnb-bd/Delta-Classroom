import app from "./app";
import { env } from "./config/env";
app.listen(env.PORT, "0.0.0.0", () => {
  console.log(`SA Delta Classroom API listening on port ${env.PORT}`);
});
