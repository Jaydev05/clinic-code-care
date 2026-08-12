import { createFileRoute } from "@tanstack/react-router";
import { ServiceGroupPage } from "@/components/ServiceGroupPage";
import { arthroscopyService } from "@/data/services";

export const Route = createFileRoute("/arthroscopy")({
  head: () => ({
    meta: [
      { title: "Arthroscopy Surgeries | Kshirsagar Orthopaedic Care & ICU" },
      {
        name: "description",
        content:
          "Key-hole arthroscopic joint surgery at Kshirsagar Orthopaedic Care & ICU — diagnosis and treatment through small incisions.",
      },
      { property: "og:title", content: "Arthroscopy Surgeries | Kshirsagar Orthopaedic Care & ICU" },
      { property: "og:description", content: "Minimally invasive joint surgery using a camera and fine instruments." },
      { property: "og:url", content: "/arthroscopy" },
    ],
    links: [{ rel: "canonical", href: "/arthroscopy" }],
  }),
  component: () => <ServiceGroupPage group={arthroscopyService} />,
});
