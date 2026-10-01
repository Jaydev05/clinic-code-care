import { Link } from "@tanstack/react-router";

export function PageHero({
  title,
  subtitle,
  image,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  image: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-8 pt-4 lg:pt-8">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        width={1600}
        height={600}
        className="absolute inset-0 size-full scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-hero-veil" />
      <div className="container-page relative py-20 lg:py-28">
        <div className="max-w-4xl rounded-xl border border-primary-foreground/20 bg-primary/35 p-7 shadow-lift backdrop-blur-md sm:p-10">
        <nav className="text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/70">
          <Link to="/" className="hover:text-primary-foreground">
            Home
          </Link>
          {breadcrumb && <span> / {breadcrumb}</span>}
        </nav>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold text-primary-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/85 lg:text-lg">{subtitle}</p>
        )}
        </div>
      </div>
    </section>
  );
}
