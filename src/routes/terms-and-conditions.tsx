import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";
import lab from "@/assets/facility-lab.jpg";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Kshirsagar Orthopaedic Care & ICU" },
      {
        name: "description",
        content:
          "Terms of use and medical disclaimer for the Kshirsagar Orthopaedic Care & ICU website, including appointment request conditions.",
      },
      { property: "og:title", content: "Terms & Conditions | Kshirsagar Orthopaedic Care & ICU" },
      { property: "og:description", content: "Website terms of use and medical disclaimer." },
      { property: "og:url", content: "/terms-and-conditions" },
    ],
    links: [{ rel: "canonical", href: "/terms-and-conditions" }],
  }),
  component: Terms,
});

const sections = [
  {
    h: "Use of this website",
    p: "This website provides general information about the hospital and the services it offers. By using the site you agree to use it for lawful purposes only.",
  },
  {
    h: "Medical disclaimer",
    p: "Content on this website is general information and does not constitute medical advice, diagnosis or treatment. Always consult a qualified doctor about your specific condition. Never delay seeking emergency care because of something you read here.",
  },
  {
    h: "Appointment requests",
    p: "Submitting the appointment form is a request, not a confirmed booking. The hospital will contact you to confirm availability. For emergencies, call the hospital directly.",
  },
  {
    h: "Treatment outcomes",
    p: "Results of any treatment or surgery vary between patients. No guarantee of a specific outcome is made or implied on this website.",
  },
  {
    h: "Content accuracy",
    p: "We aim to keep information current. Medical content on this website is subject to review and approval by the hospital's doctors and may change without notice.",
  },
  {
    h: "Intellectual property",
    p: "The hospital name, logo, text and images on this site belong to the hospital and may not be reproduced without permission.",
  },
  {
    h: "External links",
    p: "Links to third-party sites, including maps and messaging services, are provided for convenience. We are not responsible for their content or policies.",
  },
  {
    h: "Contact",
    p: `Questions about these terms can be sent to ${site.email} or discussed on ${site.phone}.`,
  },
];

function Terms() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        subtitle="Conditions of use for this website, together with our medical disclaimer."
        image={lab}
        breadcrumb="Terms & Conditions"
      />
      <section className="section-y">
        <div className="container-page max-w-3xl space-y-8">
          <p className="text-sm italic text-muted-foreground">
            These terms are a working draft and will be finalised with the hospital's approval.
          </p>
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-xl font-semibold text-primary">{s.h}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
