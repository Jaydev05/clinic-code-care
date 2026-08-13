/**
 * Central hospital information.
 * NOTE: values marked PLACEHOLDER must be replaced with the hospital's
 * confirmed details before the site goes live.
 */
export const site = {
  name: "Kshirsagar Orthopaedic Care & ICU",
  shortName: "Kshirsagar Orthopaedic Care",
  tagline: "Restoring Movement. Saving Lives.",
  // PLACEHOLDER — confirm with hospital
  phone: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  emergencyPhone: "+91 00000 00000",
  emergencyHref: "tel:+910000000000",
  whatsapp: "+91 00000 00000",
  whatsappHref: "https://wa.me/910000000000",
  email: "info@example.com",
  addressLines: ["Hospital Address Line 1 (placeholder)", "City, District, State — PIN"],
  mapsQuery: "Kshirsagar Orthopaedic Care & ICU",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Kshirsagar+Orthopaedic+Care+%26+ICU",
  mapEmbed:
    "https://www.google.com/maps?q=Kshirsagar+Orthopaedic+Care+%26+ICU&output=embed",
  hours: [
    { day: "Monday – Saturday", time: "OPD hours to be confirmed" },
    { day: "Sunday", time: "By appointment" },
    { day: "Emergency & ICU", time: "24 × 7" },
  ],
  social: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
  ],
} as const;

/**
 * Appointment departments. `value` is the stable service slug stored in the
 * database (appointments.service_key) and must match a slug in data/services.ts.
 * Never change a value once appointments reference it.
 */
export const departments = [
  { value: "orthopaedic-services", label: "Orthopaedics" },
  { value: "orthopaedic-services", label: "Trauma Care" },
  { value: "orthopaedic-services", label: "Joint Replacement" },
  { value: "spine-surgeries", label: "Spine Surgery" },
  { value: "arthroscopy", label: "Arthroscopy" },
  { value: "pain-management", label: "Pain Management" },
  { value: "general-medicine-critical-care", label: "General Medicine" },
  { value: "general-medicine-critical-care", label: "Critical Care" },
] as const;

/** Preferred appointment time slots (stored as-is in appointments.preferred_time). */
export const timeSlots = [
  "Morning (9 AM - 12 PM)",
  "Afternoon (12 PM - 4 PM)",
  "Evening (4 PM - 8 PM)",
] as const;
