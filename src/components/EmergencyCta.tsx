import { FiMapPin, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export function EmergencyCta() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-4xl bg-brand-gradient px-6 py-14 text-center sm:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/75">
            Emergency &amp; Critical Care · 24 × 7
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-primary-foreground sm:text-4xl">
            Need immediate medical help?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">
            Our emergency desk and intensive care unit are available round the clock. Call the hospital directly or
            send us a message and we will guide you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="emergency">
              <a href={site.emergencyHref}>
                <FiPhone /> Call Now
              </a>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a href={site.whatsappHref} target="_blank" rel="noreferrer">
                <FaWhatsapp /> WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="onDark">
              <a href={site.mapsLink} target="_blank" rel="noreferrer">
                <FiMapPin /> Get Directions
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
