import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="inline-block rounded-lg border border-teal/15 bg-teal-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal shadow-soft">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-4xl font-normal text-primary sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  );
}
