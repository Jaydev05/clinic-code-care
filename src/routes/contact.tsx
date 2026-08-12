import { createFileRoute } from "@tanstack/react-router";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { AppointmentForm } from "@/components/AppointmentForm";
import { EmergencyCta } from "@/components/EmergencyCta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site } from "@/data/site";
import { faqs } from "@/data/content";
import icu from "@/assets/facility-icu.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Appointment | Kshirsagar Orthopaedic Care & ICU" },
      {
        name: "description",
        content:
          "Contact Kshirsagar Orthopaedic Care & ICU — phone, WhatsApp, email, address, working hours, emergency number and appointment form.",
      },
      { property: "og:title", content: "Contact & Appointment | Kshirsagar Orthopaedic Care & ICU" },
      { property: "og:description", content: "Reach the hospital desk or book an appointment online." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        title="Contact & Appointment"
        subtitle="Call the hospital, message us on WhatsApp, or send an appointment request — the front desk will confirm your slot."
        image={icu}
        breadcrumb="Contact"
      />

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading align="left" eyebrow="Reach Us" title="Hospital contact details" />

            <ul className="space-y-4">
              {[
                { icon: <FiMapPin />, label: "Address", value: site.addressLines.join(", ") },
                { icon: <FiPhone />, label: "Phone", value: site.phone, href: site.phoneHref },
                { icon: <FaWhatsapp />, label: "WhatsApp", value: site.whatsapp, href: site.whatsappHref },
                { icon: <FiMail />, label: "Email", value: site.email, href: `mailto:${site.email}` },
                { icon: <FiPhone />, label: "Emergency (24 × 7)", value: site.emergencyPhone, href: site.emergencyHref },
              ].map((c) => (
                <li key={c.label} className="card-surface flex gap-4 p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal">
                    {c.icon}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="mt-1 block text-sm font-medium text-primary hover:underline">
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-primary">{c.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="card-surface p-6">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-primary">
                <FiClock className="text-teal" /> Working hours
              </h3>
              <dl className="mt-4 divide-y divide-border text-sm">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4 py-2.5">
                    <dt className="font-medium text-foreground">{h.day}</dt>
                    <dd className="text-right text-muted-foreground">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div>
            <SectionHeading align="left" eyebrow="Appointment" title="Request an appointment" />
            <div className="mt-6">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="container-page">
          <div className="card-surface overflow-hidden">
            <iframe
              title="Hospital location on Google Maps"
              src={site.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full border-0 sm:h-96"
            />
          </div>
          <p className="mt-3 text-center text-xs italic text-muted-foreground">
            Map location is indicative and will be updated with the hospital's confirmed address.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="card-surface border-none px-5">
                  <AccordionTrigger className="text-left text-sm font-semibold text-primary hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <EmergencyCta />
    </>
  );
}
