import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl.split(","), credentials: true }));
app.use(express.json({ limit: "1mb" }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.get("/", (_req, res) => res.json({ name: "Delta Classroom API" }));
app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

export default app;
