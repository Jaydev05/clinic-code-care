import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";

export function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`} aria-label={`${site.name} — home`}>
      <img
        src="/favicon.png"
        alt={`${site.name} logo`}
        width={64}
        height={64}
        className={compact ? "h-10 w-10 rounded-md object-contain" : "h-12 w-12 rounded-md object-contain"}
      />
      <span className="leading-tight">
        <span className="block font-display text-base font-semibold tracking-tight text-primary sm:text-lg">
          KSHIRSAGAR
        </span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-teal sm:text-[11px]">
          Orthopaedic Care &amp; ICU
        </span>
      </span>
    </Link>
  );
}
