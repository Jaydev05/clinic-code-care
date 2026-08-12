/**
 * Static hospital information. Lives in the repo (not the database) by design.
 * Edit this file and redeploy to change it.
 */

export interface OpeningHour {
  days: string;
  hours: string;
}

export const hospital = {
  name: "Kshirsagar Orthopaedic Hospital",
  tagline: "Advanced orthopaedic and joint replacement care",
  about:
    "A dedicated orthopaedic centre offering joint replacement, trauma care, arthroscopy and physiotherapy under one roof.",
  phone: "+91 00000 00000",
  whatsapp: "+91 00000 00000",
  email: "info@example.com",
  address: {
    line1: "Hospital address line 1",
    line2: "Hospital address line 2",
    city: "City",
    state: "State",
    pincode: "000000",
  },
  mapEmbedUrl: "",
  emergencyNote: "Emergency services available 24x7.",
  openingHours: [
    { days: "Monday - Saturday", hours: "9:00 AM - 8:00 PM" },
    { days: "Sunday", hours: "10:00 AM - 1:00 PM" },
  ] satisfies OpeningHour[],
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
} as const;
