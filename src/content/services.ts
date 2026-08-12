/**
 * Static service catalogue. `key` is stored on appointment rows (service_key).
 */

export interface Service {
  key: string;
  title: string;
  summary: string;
  /** lucide-react icon name, resolved in the UI layer. */
  icon: string;
  details?: string[];
}

export const services: Service[] = [
  {
    key: "joint-replacement",
    title: "Joint Replacement",
    summary: "Knee and hip replacement using modern implants and techniques.",
    icon: "Bone",
  },
  {
    key: "trauma-fracture",
    title: "Trauma & Fracture Care",
    summary: "Emergency management and surgical fixation of fractures.",
    icon: "Activity",
  },
  {
    key: "arthroscopy",
    title: "Arthroscopy",
    summary: "Keyhole surgery for knee, shoulder and ankle problems.",
    icon: "Stethoscope",
  },
  {
    key: "physiotherapy",
    title: "Physiotherapy & Rehab",
    summary: "Post-operative rehabilitation and pain management.",
    icon: "HeartPulse",
  },
];

export const serviceByKey = (key: string) => services.find((s) => s.key === key);
