"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = Array.from(Array(5).keys());

export default function SportsCarouselSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5500 })]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((index) => (
            <div className="min-w-0 flex-[0_0_100%]" key={index}>
              <div className="h-110 border flex items-center justify-center bg-green-400">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
