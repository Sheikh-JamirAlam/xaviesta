"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = Array.from(Array(5).keys());

export default function EventsCarouselSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5000 })]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((index) => (
            <div className="min-w-0 flex-[0_0_100%]" key={index}>
              <div className="h-110 border flex items-center justify-center">
                <Image src={`https://afrwytnbszqpceznbxzj.supabase.co/storage/v1/object/public/event-images/business/pic${index}.png`} alt="Image" width={1920} height={1080} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
