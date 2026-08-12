import trauma from "@/assets/service-trauma.jpg";
import joint from "@/assets/service-joint.jpg";
import spine from "@/assets/service-spine.jpg";
import arthroscopy from "@/assets/service-arthroscopy.jpg";
import icu from "@/assets/facility-icu.jpg";
import ot from "@/assets/facility-ot.jpg";
import xray from "@/assets/facility-xray.jpg";

/** Medical wording is intentionally general and must be approved by the hospital's doctors. */

export type ServiceGroup = {
  slug: string;
  path: string;
  title: string;
  short: string;
  image: string;
  intro: string;
  items: { title: string; description: string; image?: string }[];
  process?: string[];
  recovery?: string;
  benefits?: string[];
};

export const orthopaedic: ServiceGroup = {
  slug: "orthopaedic-services",
  path: "/orthopaedic-services",
  title: "Orthopaedic Services",
  short: "Trauma care, fracture fixation and joint replacement surgery.",
  image: trauma,
  intro:
    "Our orthopaedic team manages injuries and joint conditions — from accident-related trauma to planned joint replacement — with modern implants, sterile operation theatres and in-house critical care support.",
  items: [
    {
      title: "Complex Trauma",
      description:
        "Assessment and surgical management of severe or multiple injuries, supported by digital imaging and ICU backup.",
      image: trauma,
    },
    {
      title: "Fracture Fixation",
      description:
        "All types of fracture fixation, including plating, nailing and external fixation, selected according to the injury pattern.",
      image: ot,
    },
    {
      title: "Hemiarthroplasty (Hip Ball Replacement)",
      description:
        "Replacement of the femoral head, most often considered for certain hip fractures in older patients.",
      image: joint,
    },
    {
      title: "Total Knee Arthroplasty",
      description:
        "Knee replacement surgery for advanced arthritis where movement and daily activities are significantly affected.",
      image: joint,
    },
    {
      title: "Total Hip Arthroplasty",
      description:
        "Hip replacement surgery aimed at relieving pain and restoring mobility in a severely damaged hip joint.",
      image: xray,
    },
  ],
  benefits: [
    "Pain relief and improved joint function",
    "Modern implants and surgical techniques",
    "Sterile, well-equipped operation theatre",
    "In-house ICU and critical care support",
    "Structured post-operative physiotherapy guidance",
  ],
  process: [
    "Consultation and clinical examination",
    "Digital X-ray and required investigations",
    "Discussion of treatment options and consent",
    "Surgery in a sterile operation theatre",
    "Monitored recovery, ward or ICU care as needed",
    "Follow-up review and rehabilitation advice",
  ],
  recovery:
    "Recovery time depends on the procedure, the injury and the patient's general health. Your treating doctor will share an individual mobilisation and physiotherapy plan.",
};

export const painManagement: ServiceGroup = {
  slug: "pain-management",
  path: "/pain-management",
  title: "Pain Management",
  short: "Injection-based and conservative treatment for chronic joint and nerve pain.",
  image: xray,
  intro:
    "Not every painful condition needs surgery. Pain management combines medication, physiotherapy advice and targeted injection procedures to reduce pain and restore day-to-day movement.",
  items: [
    {
      title: "Spinal Nerve Root Block",
      description:
        "A targeted injection around an irritated spinal nerve root, used for diagnosis and for relief of radiating back or leg pain.",
    },
    {
      title: "Knee Arthritis",
      description:
        "Conservative care for knee osteoarthritis, including medication, activity guidance and intra-articular injections where appropriate.",
    },
    {
      title: "Tennis Elbow",
      description:
        "Treatment for pain on the outer side of the elbow caused by overuse of the forearm tendons.",
    },
    {
      title: "Golfer's Elbow",
      description:
        "Treatment for inner-elbow tendon pain, combining rest, physiotherapy and injection therapy when indicated.",
    },
    {
      title: "Frozen Shoulder",
      description:
        "A staged approach for shoulder stiffness and pain, with mobility exercises and injections where suitable.",
    },
    {
      title: "Plantar Fasciitis",
      description:
        "Management of persistent heel pain with footwear advice, stretching protocols and local injection if required.",
    },
  ],
  process: [
    "Clinical assessment of the painful area",
    "Imaging or investigations if required",
    "Explanation of conservative and injection options",
    "Day-care procedure under sterile conditions",
    "Review of response and exercise guidance",
  ],
  recovery:
    "Most injection procedures are done as day-care treatment. Response varies between patients and is reviewed at follow-up.",
};

export const spineSurgeries: ServiceGroup = {
  slug: "spine-surgeries",
  path: "/spine-surgeries",
  title: "Spine Surgeries",
  short: "Laminectomy, spinal fusion and deformity correction.",
  image: spine,
  intro:
    "Spine surgery is considered when back or neck problems cause persistent pain, weakness or nerve compression that has not settled with conservative treatment.",
  items: [
    {
      title: "Laminectomy",
      description:
        "Removal of part of the vertebral bone to relieve pressure on the spinal nerves in conditions such as canal stenosis.",
      image: spine,
    },
    {
      title: "Laminectomy with Fusion",
      description:
        "Decompression combined with stabilisation of the affected spinal segment using implants when the spine needs additional support.",
      image: xray,
    },
    {
      title: "Deformity Correction",
      description:
        "Surgical correction of spinal deformity, planned individually after detailed imaging and clinical assessment.",
      image: ot,
    },
  ],
  process: [
    "Detailed neurological and clinical examination",
    "X-ray, and MRI or CT where advised",
    "Discussion of conservative versus surgical options",
    "Surgery with intra-operative monitoring of vitals",
    "Post-operative care in ward or ICU as required",
    "Graded mobilisation and physiotherapy",
  ],
  recovery:
    "Spinal recovery is gradual and guided by the surgeon. Bracing, walking protocols and physiotherapy are advised individually.",
};

export const arthroscopyService: ServiceGroup = {
  slug: "arthroscopy",
  path: "/arthroscopy",
  title: "Arthroscopy Surgeries",
  short: "Key-hole joint surgery using a camera and fine instruments.",
  image: arthroscopy,
  intro:
    "Arthroscopy is a minimally invasive technique in which a small camera is introduced into a joint through key-hole incisions, allowing the surgeon to examine and treat the joint with fine instruments.",
  items: [
    {
      title: "Diagnostic Arthroscopy",
      description:
        "Direct visualisation of the inside of a joint when imaging alone does not explain the symptoms.",
      image: arthroscopy,
    },
    {
      title: "Therapeutic Arthroscopy",
      description:
        "Treatment of specific joint problems through key-hole incisions. Procedures offered will be listed once confirmed by the hospital.",
      image: ot,
    },
  ],
  benefits: [
    "Smaller incisions than open surgery",
    "Direct view of the joint surfaces",
    "Usually shorter hospital stay",
    "Guided, structured rehabilitation",
  ],
  process: [
    "Clinical examination of the joint",
    "Imaging as advised",
    "Key-hole procedure under anaesthesia",
    "Same-day or short-stay monitoring",
    "Physiotherapy-led rehabilitation",
  ],
  recovery:
    "Return to activity depends on the joint treated and the work done inside it. Your surgeon will confirm the rehabilitation timeline.",
};

export const generalMedicine: ServiceGroup = {
  slug: "general-medicine-critical-care",
  path: "/general-medicine-critical-care",
  title: "General Medicine & Critical Care",
  short: "Day-to-day medical care plus 24×7 ICU and emergency management.",
  image: icu,
  intro:
    "Alongside orthopaedic care, the hospital provides general medicine consultation and an intensive care unit for patients who need close monitoring and emergency management.",
  items: [
    {
      title: "Hypertension",
      description:
        "Evaluation, medication review and long-term monitoring of high blood pressure.",
    },
    {
      title: "Diabetes",
      description:
        "Diagnosis, treatment and follow-up of diabetes, including care during surgery and admission.",
    },
    {
      title: "Thyroid Disorders",
      description: "Assessment and medical management of thyroid gland disorders.",
    },
    {
      title: "Infectious Diseases",
      description:
        "Investigation and treatment of fever and infections, with laboratory support.",
    },
    {
      title: "Snake Bite",
      description:
        "Emergency assessment and management of snake bite with monitoring in the ICU when required.",
    },
    {
      title: "Poisoning",
      description:
        "Emergency stabilisation and intensive monitoring for poisoning and related emergencies.",
    },
  ],
  process: [
    "Emergency assessment and stabilisation",
    "Investigations and monitoring",
    "ICU admission if clinically required",
    "Daily review by the treating physician",
    "Discharge planning and follow-up advice",
  ],
  recovery:
    "Critical care outcomes depend on the condition and how early treatment begins. The medical team will keep relatives informed throughout the stay.",
};

export const serviceGroups: ServiceGroup[] = [
  orthopaedic,
  painManagement,
  spineSurgeries,
  arthroscopyService,
  generalMedicine,
];

export const keyServices = [
  { title: "Complex Trauma", path: orthopaedic.path, icon: "trauma" },
  { title: "Fracture Fixation", path: orthopaedic.path, icon: "bone" },
  { title: "Joint Replacement", path: orthopaedic.path, icon: "joint" },
  { title: "Pain Management", path: painManagement.path, icon: "pain" },
  { title: "Spine Surgery", path: spineSurgeries.path, icon: "spine" },
  { title: "Arthroscopy", path: arthroscopyService.path, icon: "scope" },
  { title: "General Medicine", path: generalMedicine.path, icon: "medicine" },
  { title: "Critical Care", path: generalMedicine.path, icon: "icu" },
] as const;
