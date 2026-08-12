import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { pool } from "./db.js";
import { adminRouter } from "./routes/admin.js";
import { appointmentsRouter } from "./routes/appointments.js";
import { feedbackRouter } from "./routes/feedback.js";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

const allowedOrigins = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Origin not allowed"));
    },
    credentials: true,
  }),
);

// Throttle public write endpoints (spam protection for the forms).
const publicWriteLimiter = rateLimit({ windowMs: 10 * 60 * 1000, limit: 20, standardHeaders: true });
app.use(["/api/appointments", "/api/feedback"], (req, res, next) =>
  req.method === "POST" ? publicWriteLimiter(req, res, next) : next(),
);

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "up" });
  } catch {
    res.status(503).json({ ok: false, db: "down" });
  }
});

app.use("/api/appointments", appointmentsRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/admin", adminRouter);

app.use((_req, res) => res.status(404).json({ message: "Not found" }));

// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Server error" });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => console.log(`API listening on port ${port}`));
