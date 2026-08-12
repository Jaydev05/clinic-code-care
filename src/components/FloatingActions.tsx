import { useEffect, useState } from "react";
import { FiArrowUp, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { site } from "@/data/site";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3">
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-primary shadow-card transition-transform hover:-translate-y-0.5"
        >
          <FiArrowUp className="size-5" />
        </button>
      )}
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex size-13 items-center justify-center rounded-full bg-whatsapp p-3.5 text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5"
      >
        <FaWhatsapp className="size-6" />
      </a>
      <a
        href={site.phoneHref}
        aria-label="Call the hospital now"
        className="flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5"
      >
        <FiPhone className="size-5" />
        <span className="hidden sm:inline">Call Now</span>
      </a>
    </div>
  );
}
