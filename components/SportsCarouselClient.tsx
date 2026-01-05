"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Props = {
  slides: string[];
};

export default function SportsCarouselClient({ slides }: Props) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnInteraction: false, delay: 5500 })]);

  return (
    <div className="relative">
      <div className="overflow-hidden relative z-0" ref={emblaRef}>
        <div className="flex">
          {slides.map((src) => (
            <div className="min-w-0 flex-[0_0_100%]" key={src}>
              <div className="h-110 border flex items-center justify-center">
                <Image src={src} alt="Sports event" width={1920} height={1080} className="object-cover" unoptimized />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
