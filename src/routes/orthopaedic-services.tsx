import { createFileRoute } from "@tanstack/react-router";
import { ServiceGroupPage } from "@/components/ServiceGroupPage";
import { orthopaedic } from "@/data/services";

export const Route = createFileRoute("/orthopaedic-services")({
  head: () => ({
    meta: [
      { title: "Orthopaedic Services | Kshirsagar Orthopaedic Care & ICU" },
      {
        name: "description",
        content:
          "Complex trauma, fracture fixation, hemiarthroplasty, total knee and total hip arthroplasty at Kshirsagar Orthopaedic Care & ICU.",
      },
      { property: "og:title", content: "Orthopaedic Services | Kshirsagar Orthopaedic Care & ICU" },
      { property: "og:description", content: "Trauma care, fracture fixation and joint replacement surgery." },
      { property: "og:url", content: "/orthopaedic-services" },
    ],
    links: [{ rel: "canonical", href: "/orthopaedic-services" }],
  }),
  component: () => <ServiceGroupPage group={orthopaedic} />,
});
