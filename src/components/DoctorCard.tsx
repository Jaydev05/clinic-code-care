import { Link } from "@tanstack/react-router";
import { FiAward, FiClock, FiGlobe } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@/data/doctors";

function initials(name: string) {
  const clean = name.replace(/Dr\.?\s*/i, "").replace(/[[\]]/g, "");
  return clean
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "DR";
}

export function DoctorCard({ doctor, detailed = false }: { doctor: Doctor; detailed?: boolean }) {
  return (
    <article className="card-surface hover-lift flex h-full flex-col overflow-hidden">
      <div className="flex aspect-4/3 items-center justify-center bg-soft-gradient">
        <div className="flex size-24 items-center justify-center rounded-full bg-brand-gradient font-display text-2xl font-semibold text-primary-foreground">
          {initials(doctor.name)}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">{doctor.specialization}</span>
        <h3 className="mt-2 text-xl font-semibold text-primary">{doctor.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{doctor.qualification}</p>

        {detailed && (
          <div className="mt-5 space-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <FiClock className="mt-0.5 size-4 shrink-0 text-teal" />
              <span>Experience: {doctor.experience}</span>
            </p>
            <p className="flex items-start gap-2">
              <FiGlobe className="mt-0.5 size-4 shrink-0 text-teal" />
              <span>Languages: {doctor.languages.join(", ")}</span>
            </p>
            <div className="flex items-start gap-2">
              <FiAward className="mt-0.5 size-4 shrink-0 text-teal" />
              <div>
                <span className="font-medium text-foreground">Areas of expertise</span>
                <ul className="mt-1.5 list-disc space-y-1 pl-4">
                  {doctor.expertise.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-xs italic">{doctor.about}</p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2 pt-1">
          <Button asChild variant="hero" size="sm">
            <Link to="/contact">Book Appointment</Link>
          </Button>
          {!detailed && (
            <Button asChild variant="outline" size="sm">
              <Link to="/doctors">View Profile</Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
