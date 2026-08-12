import { createFileRoute } from "@tanstack/react-router";
import { FiCheck } from "react-icons/fi";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { EmergencyCta } from "@/components/EmergencyCta";
import { facilities } from "@/data/content";
import { departments, site } from "@/data/site";
import hero from "@/assets/hero-hospital.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Kshirsagar Orthopaedic Care & ICU" },
      {
        name: "description",
        content:
          "Learn about Kshirsagar Orthopaedic Care & ICU — our mission, vision, specialities, infrastructure and patient-first approach.",
      },
      { property: "og:title", content: "About Kshirsagar Orthopaedic Care & ICU" },
      {
        property: "og:description",
        content: "Our mission, vision, values, specialities and hospital infrastructure.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const pillars = [
  {
    title: "Our Mission",
    text: "To provide patient-focused orthopaedic and critical care that prioritises safety, recovery and clear communication at every step.",
  },
  {
    title: "Our Vision",
    text: "To be a trusted centre for comprehensive orthopaedic treatment and emergency medical care in the region.",
  },
  {
    title: "Our Values",
    text: "Clinical honesty, respect for every patient, transparent guidance and continuous improvement in the care we deliver.",
  },
];

const trust = [
  "Orthopaedic and critical care teams under one roof",
  "Digital imaging and laboratory support on site",
  "Sterile operation theatre with modern implants",
  "Round-the-clock emergency and ICU cover",
  "Structured follow-up and physiotherapy guidance",
  "Clear explanation of treatment options and costs",
];

function About() {
  return (
    <>
      <PageHero
        title="About Kshirsagar Orthopaedic Care & ICU"
        subtitle={`${site.tagline} A dedicated orthopaedic and critical care hospital combining surgical expertise with attentive inpatient care.`}
        image={hero}
        breadcrumb="About Us"
      />

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div>
            <SectionHeading align="left" eyebrow="Introduction" title="A hospital focused on movement and recovery" />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Kshirsagar Orthopaedic Care &amp; ICU treats bone, joint and spine conditions alongside general medical
                and intensive care needs. Patients arriving after an accident, living with long-standing joint pain, or
                requiring close monitoring are managed by the same coordinated team.
              </p>
              <p>
                The hospital brings together consultation, imaging, surgery, intensive care and inpatient recovery in a
                single building, so treatment can begin without delay and follow-up stays with one team.
              </p>
              <p className="italic">
                Detailed hospital history, bed strength and facility specifications will be published here once the
                hospital shares the confirmed information.
              </p>
            </div>
          </div>
          <div className="card-surface bg-soft-gradient p-8">
            <h3 className="font-display text-lg font-semibold text-primary">Our Specialities</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {departments.map((d) => (
                <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FiCheck className="size-4 shrink-0 text-teal" /> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading eyebrow="What Guides Us" title="Mission, vision and values" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="card-surface hover-lift p-8">
                <h3 className="font-display text-lg font-semibold text-primary">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Infrastructure"
            title="Hospital facilities"
            description="Representative images. Actual hospital photographs will replace these once provided."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <figure key={f.title} className="card-surface hover-lift overflow-hidden">
                <img
                  src={f.image}
                  alt={f.title}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="aspect-16/10 w-full object-cover"
                />
                <figcaption className="p-6">
                  <h3 className="font-display text-base font-semibold text-primary">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading eyebrow="Trust" title="Why patients trust us" />
          <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {trust.map((t) => (
              <li key={t} className="card-surface flex items-start gap-3 p-5 text-sm text-muted-foreground">
                <FiCheck className="mt-0.5 size-4 shrink-0 text-teal" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EmergencyCta />
    </>
  );
}
