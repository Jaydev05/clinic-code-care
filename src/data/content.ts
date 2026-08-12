import reception from "@/assets/facility-reception.jpg";
import ot from "@/assets/facility-ot.jpg";
import icu from "@/assets/facility-icu.jpg";
import xray from "@/assets/facility-xray.jpg";
import lab from "@/assets/facility-lab.jpg";
import ward from "@/assets/facility-ward.jpg";
import hero from "@/assets/hero-hospital.jpg";

export const gallery = [
  { src: reception, caption: "Reception & waiting area", category: "Hospital" },
  { src: ot, caption: "Operation theatre", category: "Facilities" },
  { src: icu, caption: "Intensive care unit", category: "Facilities" },
  { src: xray, caption: "Digital X-ray", category: "Equipment" },
  { src: lab, caption: "Laboratory", category: "Equipment" },
  { src: ward, caption: "Patient ward", category: "Hospital" },
  { src: hero, caption: "Hospital corridor", category: "Hospital" },
];

export const facilities = [
  { title: "Operation Theatre", image: ot, note: "Sterile theatre for orthopaedic and spine procedures." },
  { title: "Intensive Care Unit", image: icu, note: "Monitored beds with ventilator support." },
  { title: "Emergency", image: hero, note: "Round-the-clock emergency assessment." },
  { title: "Digital X-Ray", image: xray, note: "On-site imaging for quick diagnosis." },
  { title: "Laboratory", image: lab, note: "Routine and pre-operative investigations." },
  { title: "Ward", image: ward, note: "Clean inpatient rooms for recovery." },
];

/** Placeholder testimonials — replace with genuine, consented patient reviews only. */
export const testimonials = [
  {
    quote:
      "Placeholder testimonial. Genuine patient feedback will be published here once the hospital shares approved reviews.",
    name: "Patient name",
    detail: "Treatment / department",
  },
  {
    quote:
      "Placeholder testimonial. This section is reserved for real, consented patient experiences.",
    name: "Patient name",
    detail: "Treatment / department",
  },
  {
    quote:
      "Placeholder testimonial. No review is published without the patient's permission.",
    name: "Patient name",
    detail: "Treatment / department",
  },
];

export const faqs = [
  {
    q: "How can I book an appointment?",
    a: "You can call the hospital, message us on WhatsApp, or fill the appointment form on the Contact page. The front desk will confirm your slot.",
  },
  {
    q: "What orthopaedic treatments are available?",
    a: "Trauma and fracture care, joint replacement, spine surgery, arthroscopy and pain management. Each is described on its own service page.",
  },
  {
    q: "How can I contact the hospital?",
    a: "Phone, WhatsApp and email details are listed on the Contact page and in the footer of every page.",
  },
  {
    q: "Where is the hospital located?",
    a: "The full address and a Google Map with directions are available on the Contact page.",
  },
  {
    q: "What are the emergency contact details?",
    a: "The emergency and ICU number is available 24×7 and is listed on the Contact page and in the floating call button.",
  },
];
