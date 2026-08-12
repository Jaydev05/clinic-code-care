import { doctors, type Doctor } from "@/data/doctors";

/**
 * Doctor profiles are static content kept in the repo (src/data/doctors.ts).
 * The MariaDB database only stores appointments, feedback and admin users.
 */
export function usePublicDoctors(): Doctor[] {
  return doctors;
}
