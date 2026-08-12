import { createFileRoute, Link } from "@tanstack/react-router";
import { FiArrowRight } from "react-icons/fi";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { EmergencyCta } from "@/components/EmergencyCta";
import { serviceGroups } from "@/data/services";
import hero from "@/assets/service-trauma.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Kshirsagar Orthopaedic Care & ICU" },
      {
        name: "description",
        content:
          "Orthopaedic services, pain management, spine surgeries, arthroscopy and general medicine & critical care at Kshirsagar Orthopaedic Care & ICU.",
      },
      { property: "og:title", content: "Our Services | Kshirsagar Orthopaedic Care & ICU" },
      { property: "og:description", content: "Explore every department and treatment offered by the hospital." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Five departments covering trauma, joints, spine, pain and critical care — each with its own detail page."
        image={hero}
        breadcrumb="Services"
      />

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Departments" title="Choose a department" />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {serviceGroups.map((g) => (
              <Link key={g.path} to={g.path} className="card-surface hover-lift group flex flex-col overflow-hidden">
                <img
                  src={g.image}
                  alt={g.title}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="aspect-16/10 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold text-primary">{g.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{g.short}</p>
                  <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                    {g.items.slice(0, 3).map((i) => (
                      <li key={i.title}>• {i.title}</li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal">
                    View department <FiArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EmergencyCta />
    </>
  );
}
