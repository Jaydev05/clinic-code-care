import { Router } from "express";
import { z } from "zod";

import { query } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

export const appointmentsRouter = Router();

const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(160).optional().or(z.literal("")),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferredTime: z.string().trim().max(20).optional().or(z.literal("")),
  doctorKey: z.string().trim().max(60).optional().or(z.literal("")),
  serviceKey: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const statusSchema = z.object({
  status: z.enum(["new", "confirmed", "completed", "cancelled"]),
});

const nullIfEmpty = (value) => (value === undefined || value === "" ? null : value);

// Public: submit an appointment request
appointmentsRouter.post("/", async (req, res, next) => {
  try {
    const parsed = appointmentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid appointment details", issues: parsed.error.issues });
    }
    const d = parsed.data;
    const result = await query(
      `INSERT INTO appointments
         (name, phone, email, preferred_date, preferred_time, doctor_key, service_key, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        d.name,
        d.phone,
        nullIfEmpty(d.email),
        d.preferredDate,
        nullIfEmpty(d.preferredTime),
        nullIfEmpty(d.doctorKey),
        nullIfEmpty(d.serviceKey),
        nullIfEmpty(d.message),
      ],
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    next(error);
  }
});

// Admin: list all appointment requests
appointmentsRouter.get("/", requireAdmin, async (_req, res, next) => {
  try {
    const rows = await query(
      `SELECT id, name, phone, email,
              DATE_FORMAT(preferred_date, '%Y-%m-%d') AS preferredDate,
              preferred_time AS preferredTime, doctor_key AS doctorKey,
              service_key AS serviceKey, message, status, created_at AS createdAt
         FROM appointments
        ORDER BY created_at DESC`,
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

// Admin: update status
appointmentsRouter.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ message: "Invalid id" });

    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid status" });

    const result = await query(`UPDATE appointments SET status = ? WHERE id = ?`, [parsed.data.status, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});
