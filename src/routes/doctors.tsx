import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { DoctorCard } from "@/components/DoctorCard";
import { EmergencyCta } from "@/components/EmergencyCta";
import { usePublicDoctors } from "@/hooks/usePublicDoctors";
import ot from "@/assets/facility-ot.jpg";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Our Doctors | Kshirsagar Orthopaedic Care & ICU" },
      {
        name: "description",
        content:
          "Meet the orthopaedic surgery and general medicine & critical care team at Kshirsagar Orthopaedic Care & ICU.",
      },
      { property: "og:title", content: "Our Doctors | Kshirsagar Orthopaedic Care & ICU" },
      { property: "og:description", content: "Qualifications, specialisation and areas of expertise of our doctors." },
      { property: "og:url", content: "/doctors" },
    ],
    links: [{ rel: "canonical", href: "/doctors" }],
  }),
  component: Doctors,
});

function Doctors() {
  const list = usePublicDoctors();

  return (
    <>
      <PageHero
        title="Our Doctors"
        subtitle="Orthopaedic surgery and critical care expertise, working together on every admission."
        image={ot}
        breadcrumb="Doctors"
      />

      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Medical Team"
            title="Doctor profiles"
            description="Only verified qualifications supplied by the hospital are published. Placeholder fields below are awaiting confirmation."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            {list.map((d) => (
              <DoctorCard key={d.slug} doctor={d} detailed />
            ))}
          </div>
        </div>
      </section>

      <EmergencyCta />
    </>
  );
}
