import { Router } from "express";
import { z } from "zod";

import { query } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

export const feedbackRouter = Router();

const feedbackSchema = z.object({
  name: z.string().trim().min(2).max(120),
  rating: z.coerce.number().int().min(1).max(5),
  message: z.string().trim().min(3).max(2000),
});

const approvalSchema = z.object({ isApproved: z.boolean() });

// Public: submit feedback (stored unapproved until an admin approves it)
feedbackRouter.post("/", async (req, res, next) => {
  try {
    const parsed = feedbackSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid feedback", issues: parsed.error.issues });
    }
    const { name, rating, message } = parsed.data;
    const result = await query(`INSERT INTO feedback (name, rating, message) VALUES (?, ?, ?)`, [
      name,
      rating,
      message,
    ]);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    next(error);
  }
});

// Public: approved testimonials only
feedbackRouter.get("/approved", async (_req, res, next) => {
  try {
    const rows = await query(
      `SELECT id, name, rating, message, 1 AS isApproved, created_at AS createdAt
         FROM feedback WHERE is_approved = 1 ORDER BY created_at DESC LIMIT 50`,
    );
    res.json(rows.map((r) => ({ ...r, isApproved: true })));
  } catch (error) {
    next(error);
  }
});

// Admin: all feedback
feedbackRouter.get("/", requireAdmin, async (_req, res, next) => {
  try {
    const rows = await query(
      `SELECT id, name, rating, message, is_approved AS isApproved, created_at AS createdAt
         FROM feedback ORDER BY created_at DESC`,
    );
    res.json(rows.map((r) => ({ ...r, isApproved: Boolean(r.isApproved) })));
  } catch (error) {
    next(error);
  }
});

// Admin: approve / hide
feedbackRouter.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "Invalid id" });

    const parsed = approvalSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid payload" });

    const result = await query(`UPDATE feedback SET is_approved = ? WHERE id = ?`, [
      parsed.data.isApproved ? 1 : 0,
      id,
    ]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

// Admin: delete
feedbackRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "Invalid id" });

    const result = await query(`DELETE FROM feedback WHERE id = ?`, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});
