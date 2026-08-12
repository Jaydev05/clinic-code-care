import { Router } from "express";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { z } from "zod";

import { query } from "../db.js";
import { COOKIE_NAME, cookieOptions, requireAdmin, signAdminToken } from "../middleware/auth.js";

export const adminRouter = Router();

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true });

const loginSchema = z.object({
  username: z.string().trim().min(3).max(60),
  password: z.string().min(8).max(200),
});

adminRouter.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid credentials" });

    const rows = await query(
      `SELECT id, username, password_hash, role FROM admin_users WHERE username = ? LIMIT 1`,
      [parsed.data.username],
    );
    const user = rows[0];
    // Always compare against something to keep timing consistent.
    const hash = user?.password_hash ?? "$2a$10$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalid";
    const ok = await bcrypt.compare(parsed.data.password, hash);
    if (!user || !ok) return res.status(401).json({ message: "Invalid credentials" });

    res.cookie(COOKIE_NAME, signAdminToken(user), cookieOptions());
    res.json({ id: user.id, username: user.username, role: user.role });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/logout", (_req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: undefined });
  res.json({ ok: true });
});

adminRouter.get("/me", requireAdmin, (req, res) => {
  res.json(req.admin);
});
