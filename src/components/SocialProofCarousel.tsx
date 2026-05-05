"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useMemo } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80",
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80",
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&q=80",
  "https://images.unsplash.com/photo-1525609004556-c46c6c5104b8?w=400&q=80",
  "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=400&q=80",
];

export function SocialProofCarousel() {
  const plugins = useMemo(
    () => [
      Autoplay({
        delay: 2200,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
    [],
  );

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: false,
    },
    plugins,
  );

  const slides = [...IMAGES, ...IMAGES];

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="-ml-2 flex">
        {slides.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="min-w-[min(36vw,200px)] shrink-0 pl-2 md:min-w-[200px]"
          >
            <div className="relative aspect-square overflow-hidden border border-neutral-200 bg-neutral-100">
              {/* TODO: podmienić na własną grafikę — Unsplash placeholder */}
              <Image
                src={src}
                alt="Zdjęcie społeczności UNMADE"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
