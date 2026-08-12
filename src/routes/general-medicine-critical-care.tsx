import { createFileRoute } from "@tanstack/react-router";
import { ServiceGroupPage } from "@/components/ServiceGroupPage";
import { generalMedicine } from "@/data/services";

export const Route = createFileRoute("/general-medicine-critical-care")({
  head: () => ({
    meta: [
      { title: "General Medicine & Critical Care | Kshirsagar Orthopaedic Care & ICU" },
      {
        name: "description",
        content:
          "Hypertension, diabetes, thyroid disorders, infectious diseases, snake bite and poisoning management with 24x7 ICU support.",
      },
      { property: "og:title", content: "General Medicine & Critical Care" },
      { property: "og:description", content: "Medical consultation plus round-the-clock intensive care and emergency management." },
      { property: "og:url", content: "/general-medicine-critical-care" },
    ],
    links: [{ rel: "canonical", href: "/general-medicine-critical-care" }],
  }),
  component: () => <ServiceGroupPage group={generalMedicine} />,
});
