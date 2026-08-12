/**
 * Thin fetch wrapper for the external Node/Express API hosted on Hostinger.
 *
 * The frontend never talks to MySQL directly and never holds DB credentials.
 * Only the API origin is exposed to the browser via VITE_API_BASE_URL.
 */

const API_BASE_URL = (import.meta.env["VITE_API_BASE_URL"] as string | undefined) ?? "";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    // Admin auth uses an httpOnly cookie issued by Express.
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const text = await response.text();
  const payload = text ? (JSON.parse(text) as unknown) : null;

  if (!response.ok) {
    const message =
      (payload as { message?: string } | null)?.message ?? `Request failed (${response.status})`;
    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}

export interface AppointmentInput {
  name: string;
  phone: string;
  email?: string;
  preferredDate: string;
  preferredTime?: string;
  doctorKey?: string;
  serviceKey?: string;
  message?: string;
}

export interface FeedbackInput {
  name: string;
  rating: number;
  message: string;
}

export interface AppointmentRecord extends AppointmentInput {
  id: number;
  status: "new" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface FeedbackRecord {
  id: number;
  name: string;
  rating: number;
  message: string;
  isApproved: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: number;
  username: string;
  role: string;
}

export const api = {
  // Public
  createAppointment: (data: AppointmentInput) =>
    request<{ id: number }>("/api/appointments", { method: "POST", body: JSON.stringify(data) }),
  createFeedback: (data: FeedbackInput) =>
    request<{ id: number }>("/api/feedback", { method: "POST", body: JSON.stringify(data) }),
  listApprovedFeedback: () => request<FeedbackRecord[]>("/api/feedback/approved"),

  // Admin
  login: (username: string, password: string) =>
    request<AdminUser>("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  logout: () => request<{ ok: true }>("/api/admin/logout", { method: "POST" }),
  me: () => request<AdminUser>("/api/admin/me"),
  listAppointments: () => request<AppointmentRecord[]>("/api/appointments"),
  updateAppointmentStatus: (id: number, status: AppointmentRecord["status"]) =>
    request<{ ok: true }>(`/api/appointments/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  listFeedback: () => request<FeedbackRecord[]>("/api/feedback"),
  setFeedbackApproval: (id: number, isApproved: boolean) =>
    request<{ ok: true }>(`/api/feedback/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isApproved }),
    }),
  deleteFeedback: (id: number) => request<{ ok: true }>(`/api/feedback/${id}`, { method: "DELETE" }),
};
