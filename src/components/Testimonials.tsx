import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import { testimonials } from "@/data/content";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <SectionHeading
          eyebrow="Patient Voices"
          title="What patients say"
          description="Placeholder entries only. Genuine, consented patient reviews will replace these before launch."
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
            {testimonials.map((t, i) => (
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
