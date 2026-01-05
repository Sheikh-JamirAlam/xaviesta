"use client";

import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PencilIcon } from "lucide-react";
import { ImageMultiPicker } from "../ImageMultiPicker";

type Props = {
  slides: string[];
};

export default function SportsCarouselClient({ slides }: Props) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5500 })]);

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const res = await fetch("/api/admin/sport-images", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      setFiles([]);
      location.reload();
    }
  }

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

      {/* Admin Edit Button */}
      <div className="absolute z-10 top-4 right-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button aria-label="Edit" className="dark w-20 h-20 cursor-pointer hover:bg-blue-200 [&_svg:not([class*='size-'])]:size-10">
              <PencilIcon />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Edit sports events images</DialogTitle>
              <DialogDescription className="sr-only">Edit sports events images</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <ImageMultiPicker files={files} setFiles={setFiles} />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={save} disabled={loading}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
