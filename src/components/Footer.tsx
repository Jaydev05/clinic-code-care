import { Link } from "@tanstack/react-router";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Logo } from "./Logo";
import { site } from "@/data/site";
import { serviceGroups } from "@/data/services";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {site.tagline} Orthopaedic, spine and critical care under one roof.
          </p>
          <div className="mt-5 flex gap-2">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-teal hover:text-teal"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {[
              { label: "Home", to: "/" },
              { label: "About Us", to: "/about" },
              { label: "Our Doctors", to: "/doctors" },
              { label: "Gallery", to: "/gallery" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-teal">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {serviceGroups.map((s) => (
              <li key={s.path}>
                <Link to={s.path} className="transition-colors hover:text-teal">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">Reach Us</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2.5">
              <FiMapPin className="mt-0.5 size-4 shrink-0 text-teal" />
              <span>{site.addressLines.join(", ")}</span>
            </li>
            <li className="flex gap-2.5">
              <FiPhone className="mt-0.5 size-4 shrink-0 text-teal" />
              <a href={site.phoneHref} className="hover:text-teal">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <FiMail className="mt-0.5 size-4 shrink-0 text-teal" />
              <a href={`mailto:${site.email}`} className="hover:text-teal">
                {site.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <FiClock className="mt-0.5 size-4 shrink-0 text-teal" />
              <span>Emergency &amp; ICU: 24 × 7</span>
            </li>
          </ul>
          <a
            href={site.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-teal hover:underline"
          >
            Get Directions →
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-teal">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-teal">
              Terms &amp; Conditions
            </Link>
            <Link to="/admin" className="hover:text-teal">
              Staff Login
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
}
