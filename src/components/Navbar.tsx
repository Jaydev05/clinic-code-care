import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FiChevronDown, FiMenu, FiPhone, FiX } from "react-icons/fi";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { serviceGroups } from "@/data/services";

const mainLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Doctors", to: "/doctors" },
];

const endLinks = [
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass =
    "rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-primary";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-shadow duration-300 ${
        scrolled ? "border-border bg-background/95 shadow-soft backdrop-blur" : "border-transparent bg-background"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-md focus:bg-primary focus:px-3 focus:py-1 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {mainLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={linkClass}
              activeProps={{ className: "rounded-full px-3 py-2 text-sm font-semibold text-primary bg-accent" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={`${linkClass} flex items-center gap-1`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services <FiChevronDown className="size-4" />
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2">
                <div className="card-surface overflow-hidden p-2">
                  <Link
                    to="/services"
                    onClick={() => setServicesOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-primary hover:bg-accent"
                  >
                    All Services
                  </Link>
                  {serviceGroups.map((s) => (
                    <Link
                      key={s.path}
                      to={s.path}
                      onClick={() => setServicesOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-primary"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {endLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={linkClass}
              activeProps={{ className: "rounded-full px-3 py-2 text-sm font-semibold text-primary bg-accent" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <a href={site.phoneHref}>
              <FiPhone /> {site.phone}
            </a>
          </Button>
          <Button asChild variant="hero">
            <Link to="/contact">Book Appointment</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-border text-primary lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <FiX className="size-5" /> : <FiMenu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex max-h-[calc(100vh-5rem)] flex-col gap-1 overflow-y-auto py-4" aria-label="Mobile navigation">
            {mainLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium hover:bg-accent">
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setMobileServices((v) => !v)}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium hover:bg-accent"
              aria-expanded={mobileServices}
            >
              Services
              <FiChevronDown className={`size-4 transition-transform ${mobileServices ? "rotate-180" : ""}`} />
            </button>
            {mobileServices && (
              <div className="ml-3 flex flex-col border-l border-border pl-3">
                <Link to="/services" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-primary hover:bg-accent">
                  All Services
                </Link>
                {serviceGroups.map((s) => (
                  <Link key={s.path} to={s.path} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-sm text-foreground/80 hover:bg-accent">
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
            {endLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium hover:bg-accent">
                {l.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2 pb-2">
              <Button asChild variant="emergency">
                <a href={site.emergencyHref}>Emergency</a>
              </Button>
              <Button asChild variant="hero">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Book Appointment
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
