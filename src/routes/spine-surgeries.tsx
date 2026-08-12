import { createFileRoute } from "@tanstack/react-router";
import { ServiceGroupPage } from "@/components/ServiceGroupPage";
import { spineSurgeries } from "@/data/services";

export const Route = createFileRoute("/spine-surgeries")({
  head: () => ({
    meta: [
      { title: "Spine Surgeries | Kshirsagar Orthopaedic Care & ICU" },
      {
        name: "description",
        content:
          "Laminectomy, laminectomy with fusion and spinal deformity correction at Kshirsagar Orthopaedic Care & ICU.",
      },
      { property: "og:title", content: "Spine Surgeries | Kshirsagar Orthopaedic Care & ICU" },
      { property: "og:description", content: "Decompression, fusion and deformity correction for spinal conditions." },
      { property: "og:url", content: "/spine-surgeries" },
    ],
    links: [{ rel: "canonical", href: "/spine-surgeries" }],
  }),
  component: () => <ServiceGroupPage group={spineSurgeries} />,
});
