/**
 * Doctor profiles.
 * All fields are placeholders until the hospital supplies verified details.
 * Never publish invented qualifications or experience.
 */
export type Doctor = {
  slug: string;
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  languages: string[];
  expertise: string[];
  about: string;
};

export const doctors: Doctor[] = [
  {
    slug: "orthopaedic-surgeon",
    name: "Dr. [Full Name]",
    qualification: "[Qualification to be provided]",
    specialization: "Orthopaedic Surgery",
    experience: "[Experience to be provided]",
    languages: ["Marathi", "Hindi", "English"],
    expertise: [
      "Complex trauma & fracture fixation",
      "Joint replacement surgery",
      "Spine surgery",
      "Arthroscopy",
    ],
    about:
      "Profile details will be published here once the hospital shares the doctor's verified qualifications, registrations and areas of expertise.",
  },
  {
    slug: "physician-critical-care",
    name: "Dr. [Full Name]",
    qualification: "[Qualification to be provided]",
    specialization: "General Medicine & Critical Care",
    experience: "[Experience to be provided]",
    languages: ["Marathi", "Hindi", "English"],
    expertise: [
      "Hypertension & diabetes care",
      "Thyroid disorders",
      "Infectious diseases",
      "ICU & emergency management",
    ],
    about:
      "Profile details will be published here once the hospital shares the doctor's verified qualifications, registrations and areas of expertise.",
  },
];
