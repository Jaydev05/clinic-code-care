import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";
import ward from "@/assets/facility-ward.jpg";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Kshirsagar Orthopaedic Care & ICU" },
      {
        name: "description",
        content:
          "How Kshirsagar Orthopaedic Care & ICU collects, uses and protects the information submitted through this website.",
      },
      { property: "og:title", content: "Privacy Policy | Kshirsagar Orthopaedic Care & ICU" },
      { property: "og:description", content: "Our approach to patient privacy and website data." },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: Privacy,
});

const sections = [
  {
    h: "Information we collect",
    p: "When you submit an appointment or contact request, we collect the details you provide — name, mobile number, email address, preferred department and date, and your message. We do not ask for medical records through this website.",
  },
  {
    h: "How we use your information",
    p: "Your details are used only to respond to your enquiry, confirm appointments and provide follow-up information about your treatment at the hospital.",
  },
  {
    h: "Sharing",
    p: "We do not sell or rent your information. Details are shared internally with the treating doctor and hospital staff involved in your care, and with service providers only where required to operate this website.",
  },
  {
    h: "Data retention & security",
    p: "Enquiry details are retained only as long as needed for hospital records and applicable legal requirements. We take reasonable measures to protect information submitted through the website.",
  },
  {
    h: "Cookies",
    p: "This website may use basic cookies or similar technologies to keep the site working correctly and to understand general usage. No advertising profiles are built from your visit.",
  },
  {
    h: "Your choices",
    p: "You may ask us to correct or delete the contact details you submitted by writing to the hospital using the details on the Contact page.",
  },
  {
    h: "Contact",
    p: `For any privacy question, write to ${site.email} or call ${site.phone}.`,
  },
];

function Privacy() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How we handle the information you share with the hospital through this website."
        image={ward}
        breadcrumb="Privacy Policy"
      />
      <section className="section-y">
        <div className="container-page max-w-3xl space-y-8">
          <p className="text-sm italic text-muted-foreground">
            This policy is a working draft and will be finalised with the hospital's approval.
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
