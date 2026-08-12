import jwt from "jsonwebtoken";

export const COOKIE_NAME = "hospital_admin";

export function signAdminToken(user) {
  return jwt.sign({ sub: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? "8h",
  });
}

export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "none",
    secure: String(process.env.COOKIE_SECURE ?? "true") === "true",
    path: "/",
    maxAge: 8 * 60 * 60 * 1000,
  };
}

export function requireAdmin(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = { id: payload.sub, username: payload.username, role: payload.role };
    next();
  } catch {
    res.status(401).json({ message: "Session expired" });
  }
}
