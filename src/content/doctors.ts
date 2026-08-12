/**
 * Static doctor profiles. `key` is the stable identifier stored on appointment
 * rows in MySQL (doctor_key) — never rename a key once it is in use.
 */

export interface Doctor {
  key: string;
  name: string;
  qualifications: string;
  designation: string;
  specialities: string[];
  experienceYears: number;
  bio: string;
  /** Import from src/assets and assign, or use a public/ path. */
  photo?: string;
}

export const doctors: Doctor[] = [
  {
    key: "dr-kshirsagar",
    name: "Dr. Kshirsagar",
    qualifications: "MBBS, MS (Orthopaedics)",
    designation: "Consultant Orthopaedic Surgeon",
    specialities: ["Joint Replacement", "Trauma Surgery", "Arthroscopy"],
    experienceYears: 15,
    bio: "Placeholder biography. Replace with the doctor's actual profile text.",
  },
];

export const doctorByKey = (key: string) => doctors.find((d) => d.key === key);
