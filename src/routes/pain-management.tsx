import { createFileRoute } from "@tanstack/react-router";
import { ServiceGroupPage } from "@/components/ServiceGroupPage";
import { painManagement } from "@/data/services";

export const Route = createFileRoute("/pain-management")({
  head: () => ({
    meta: [
      { title: "Pain Management | Kshirsagar Orthopaedic Care & ICU" },
      {
        name: "description",
        content:
          "Spinal nerve root block, knee arthritis care, tennis and golfer's elbow, frozen shoulder and plantar fasciitis treatment.",
      },
      { property: "og:title", content: "Pain Management | Kshirsagar Orthopaedic Care & ICU" },
      { property: "og:description", content: "Injection-based and conservative treatment for chronic joint and nerve pain." },
      { property: "og:url", content: "/pain-management" },
    ],
    links: [{ rel: "canonical", href: "/pain-management" }],
  }),
  component: () => <ServiceGroupPage group={painManagement} />,
});
