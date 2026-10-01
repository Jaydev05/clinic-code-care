import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { testimonials } from "@/data/content";
import { api } from "@/lib/api";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  const { data } = useQuery({
    queryKey: ["approved-feedback"],
    queryFn: api.listApprovedFeedback,
    staleTime: 60_000,
    retry: false,
  });

  const hasRealFeedback = Boolean(data && data.length > 0);
  const items = hasRealFeedback && data
    ? data.map((f) => ({ quote: f.message, name: f.name, detail: `${"\u2605".repeat(f.rating)}` }))
    : testimonials;

  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <SectionHeading
          eyebrow="Patient Voices"
          title="What patients say"
          description={
            hasRealFeedback
              ? "Feedback shared by patients and families, published after review by the hospital team."
              : "Placeholder entries only. Genuine, consented patient reviews will replace these before launch."
          }
        />
        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            speed={700}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="!pb-12"
          >
            {items.map((t, i) => (
              <SwiperSlide key={i} className="h-auto">
                <figure className="card-surface flex h-full flex-col gap-4 p-7">
                  <FaQuoteLeft className="size-6 text-teal" />
                  <blockquote className="text-sm leading-relaxed text-muted-foreground">{t.quote}</blockquote>
                  <figcaption className="mt-auto">
                    <p className="font-display text-sm font-semibold text-primary">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.detail}</p>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
