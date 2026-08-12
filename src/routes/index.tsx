import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiActivity, FiArrowRight, FiCheck, FiHeart, FiPhone, FiShield, FiUsers } from "react-icons/fi";
import { GiBoneKnife, GiSpineArrow, GiKneeCap } from "react-icons/gi";
import { MdOutlineHealthAndSafety, MdBiotech, MdMonitorHeart } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { EmergencyCta } from "@/components/EmergencyCta";
import { Testimonials } from "@/components/Testimonials";
import { DoctorCard } from "@/components/DoctorCard";
import { usePublicDoctors } from "@/hooks/usePublicDoctors";
import { keyServices } from "@/data/services";
import { facilities } from "@/data/content";
import { site } from "@/data/site";
import hero from "@/assets/hero-hospital.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kshirsagar Orthopaedic Care & ICU | Orthopaedic & Critical Care Hospital" },
      {
        name: "description",
        content:
          "Kshirsagar Orthopaedic Care & ICU offers trauma care, fracture fixation, joint replacement, spine surgery, arthroscopy, pain management and 24x7 intensive care.",
      },
      { property: "og:title", content: "Kshirsagar Orthopaedic Care & ICU | Orthopaedic & Critical Care Hospital" },
      {
        property: "og:description",
        content: "Kshirsagar Orthopaedic Care & ICU offers trauma care, fracture fixation, joint replacement, spine surgery, arthroscopy, pain management and 24x7 intensive care.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const serviceIcons: Record<string, React.ReactNode> = {
  trauma: <FiActivity />,
  bone: <GiBoneKnife />,
  joint: <GiKneeCap />,
  pain: <MdOutlineHealthAndSafety />,
  spine: <GiSpineArrow />,
  scope: <MdBiotech />,
  medicine: <FiHeart />,
  icu: <MdMonitorHeart />,
};

const whyUs = [
  { title: "Experienced Medical Team", text: "Orthopaedic and critical care doctors working together on one plan.", icon: <FiUsers /> },
  { title: "Advanced Orthopaedic Care", text: "Trauma, joint replacement, spine and arthroscopy services.", icon: <GiBoneKnife /> },
  { title: "Critical Care Unit", text: "Monitored ICU beds with round-the-clock cover.", icon: <MdMonitorHeart /> },
  { title: "Modern Equipment", text: "Digital X-ray, laboratory support and a sterile operation theatre.", icon: <MdBiotech /> },
  { title: "Patient-Centered Care", text: "Clear explanations, transparent guidance and structured follow-up.", icon: <FiShield /> },
];

function Home() {
  const doctors = usePublicDoctors();
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={hero}
          alt="Kshirsagar Orthopaedic Care & ICU hospital interior"
          width={1600}
          height={1104}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-veil" />
        <div className="container-page relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground backdrop-blur">
              Emergency &amp; ICU · 24 × 7
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              KSHIRSAGAR
              <span className="mt-2 block text-xl font-medium tracking-[0.08em] text-primary-foreground/90 sm:text-2xl">
                Orthopaedic Care &amp; ICU
              </span>
            </h1>
            <p className="mt-5 font-display text-lg italic text-primary-foreground/90 sm:text-xl">{site.tagline}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/80">
              Orthopaedic surgery, spine care, arthroscopy, pain management and intensive care, supported by modern
              imaging and a sterile operation theatre.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="teal">
                <Link to="/contact">
                  Book an Appointment <FiArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="onDark">
                <Link to="/contact">Contact Hospital</Link>
              </Button>
              <Button asChild size="lg" variant="emergency">
                <a href={site.emergencyHref}>
                  <FiPhone /> Emergency
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="hidden items-center justify-center lg:flex"
          >
            <div className="rounded-4xl border border-primary-foreground/20 bg-primary-foreground/95 p-10 shadow-lift backdrop-blur">
              <img
                src="/favicon.png"
                alt="Kshirsagar Orthopaedic Care & ICU logo"
                width={320}
                height={320}
                className="mx-auto w-64 object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Doctors preview */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Doctors"
            title="Meet the treating team"
            description="Profiles are shown with placeholder details until the hospital shares verified qualifications."
          />
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {doctors.slice(0, 2).map((d) => (
              <DoctorCard key={d.slug} doctor={d} />
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="Key Services"
            title="Comprehensive orthopaedic & medical care"
            description="From accident-related trauma to planned joint replacement and intensive care."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {keyServices.map((s) => (
              <Link
                key={s.title}
                to={s.path}
                className="card-surface hover-lift group flex flex-col gap-4 p-6"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-soft text-xl text-teal transition-colors group-hover:bg-teal group-hover:text-teal-foreground">
                  {serviceIcons[s.icon]}
                </span>
                <h3 className="font-display text-base font-semibold text-primary">{s.title}</h3>
                <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-teal">
                  Learn more <FiArrowRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/services">
                View All Services <FiArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Why Choose Us" title="Care built around the patient" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w) => (
              <div key={w.title} className="card-surface flex gap-4 p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-lg text-primary-foreground">
                  {w.icon}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-primary">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs italic text-muted-foreground">
            Final wording of hospital claims will be confirmed by the hospital before publishing.
          </p>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading eyebrow="Facilities" title="Infrastructure that supports recovery" />
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
          <p className="mt-8 text-center text-xs italic text-muted-foreground">
            Representative images. Actual hospital photographs will replace these once provided.
          </p>
        </div>
      </section>

      <Testimonials />

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Appointments"
              title="Planning a consultation?"
              description="Share a few details and the front desk will confirm a suitable slot. For emergencies, please call directly."
            />
            <ul className="mt-7 space-y-3">
              {["Orthopaedic & spine consultation", "Pre-operative assessment", "Second opinion on reports", "Follow-up review"].map(
                (i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <FiCheck className="size-4 text-teal" /> {i}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Book Appointment</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/doctors">Our Doctors</Link>
              </Button>
            </div>
          </div>
          <div className="card-surface bg-soft-gradient p-8">
            <h3 className="font-display text-lg font-semibold text-primary">Hospital hours</h3>
            <dl className="mt-5 divide-y divide-border text-sm">
              {site.hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 py-3">
                  <dt className="font-medium text-foreground">{h.day}</dt>
                  <dd className="text-right text-muted-foreground">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <EmergencyCta />
    </>
  );
}
