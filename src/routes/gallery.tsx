import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { EmergencyCta } from "@/components/EmergencyCta";
import { gallery } from "@/data/content";
import reception from "@/assets/facility-reception.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Kshirsagar Orthopaedic Care & ICU" },
      {
        name: "description",
        content:
          "Photo gallery of Kshirsagar Orthopaedic Care & ICU — reception, operation theatre, ICU, ward, laboratory and equipment.",
      },
      { property: "og:title", content: "Hospital Gallery | Kshirsagar Orthopaedic Care & ICU" },
      { property: "og:description", content: "A look inside the hospital's facilities and equipment." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

const categories = ["All", "Hospital", "Facilities", "Equipment"];

function Gallery() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const items = gallery.filter((g) => filter === "All" || g.category === filter);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, items.length]);

  return (
    <>
      <PageHero
        title="Hospital Gallery"
        subtitle="Representative images of the hospital environment. Actual hospital photographs will replace these once shared."
        image={reception}
        breadcrumb="Gallery"
      />

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Photos" title="Inside the hospital" />

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setFilter(c);
                  setActive(null);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === c
                    ? "bg-brand-gradient text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((g, i) => (
              <button
                key={g.caption}
                type="button"
                onClick={() => setActive(i)}
                className="card-surface hover-lift group overflow-hidden text-left"
                aria-label={`Open image: ${g.caption}`}
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="block px-5 py-4 text-sm font-medium text-primary">{g.caption}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active !== null && items[active] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={items[active].caption}
          className="fixed inset-0 z-60 flex items-center justify-center bg-primary/95 p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full border border-primary-foreground/30 p-2.5 text-primary-foreground"
          >
            <FiX className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? i : (i - 1 + items.length) % items.length));
            }}
            className="absolute left-3 rounded-full border border-primary-foreground/30 p-2.5 text-primary-foreground sm:left-8"
          >
            <FiChevronLeft className="size-5" />
          </button>
          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[active].src}
              alt={items[active].caption}
              className="max-h-[75vh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-primary-foreground/85">
              {items[active].caption}
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i === null ? i : (i + 1) % items.length));
            }}
            className="absolute right-3 rounded-full border border-primary-foreground/30 p-2.5 text-primary-foreground sm:right-8"
          >
            <FiChevronRight className="size-5" />
          </button>
        </div>
      )}

      <EmergencyCta />
    </>
  );
}
