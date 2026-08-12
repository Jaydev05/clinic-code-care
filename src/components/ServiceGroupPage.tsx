import { FiCheck } from "react-icons/fi";
import { PageHero } from "./PageHero";
import { SectionHeading } from "./SectionHeading";
import { EmergencyCta } from "./EmergencyCta";
import type { ServiceGroup } from "@/data/services";

export function ServiceGroupPage({ group }: { group: ServiceGroup }) {
  return (
    <>
      <PageHero title={group.title} subtitle={group.intro} image={group.image} breadcrumb={group.title} />

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Treatments" title={`${group.title} we offer`} />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => (
              <article key={item.title} className="card-surface hover-lift flex h-full flex-col overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="aspect-16/10 w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {(group.benefits || group.process) && (
        <section className="section-y bg-surface">
          <div className="container-page grid gap-10 lg:grid-cols-2">
            {group.benefits && (
              <div className="card-surface p-8">
                <h2 className="text-2xl font-semibold text-primary">Benefits</h2>
                <ul className="mt-6 space-y-3">
                  {group.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                      <FiCheck className="mt-0.5 size-4 shrink-0 text-teal" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {group.process && (
              <div className="card-surface p-8">
                <h2 className="text-2xl font-semibold text-primary">Treatment process</h2>
                <ol className="mt-6 space-y-4">
                  {group.process.map((step, i) => (
                    <li key={step} className="flex gap-4 text-sm text-muted-foreground">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-soft font-display text-xs font-semibold text-teal">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      )}

      {group.recovery && (
        <section className="section-y">
          <div className="container-page">
            <div className="rounded-3xl border border-border bg-soft-gradient p-8 sm:p-12">
              <h2 className="text-2xl font-semibold text-primary">Recovery &amp; follow-up</h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{group.recovery}</p>
              <p className="mt-6 text-xs italic text-muted-foreground">
                The information on this page is general in nature and is pending review by the hospital's medical team.
                It does not replace a consultation with a qualified doctor.
              </p>
            </div>
          </div>
        </section>
      )}

      <EmergencyCta />
    </>
  );
}
