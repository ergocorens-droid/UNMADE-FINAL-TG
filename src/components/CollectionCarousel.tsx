"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const ITEMS = [
  {
    title: "KOSZULKI",
    sub: "T-SHIRTS",
    href: "/sklep?category=koszulki",
    img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80",
  },
  {
    title: "BLUZY",
    sub: "HOODIES",
    href: "/sklep?category=bluzy",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
  },
  {
    title: "NOWE",
    sub: "NEW RELEASES",
    href: "/sklep?sort=newest",
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
  },
];

export function CollectionCarousel() {
  const plugins = useMemo(
    () => [
      Autoplay({
        delay: 2800,
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

  const slides = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden px-1" ref={emblaRef}>
      <div className="-ml-2 flex">
        {slides.map((item, i) => (
          <div
            key={`${item.href}-${i}`}
            className="min-w-[min(82vw,420px)] shrink-0 pl-2"
          >
            <Link
              href={item.href}
              className="group relative block aspect-[16/10] overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm"
            >
              {/* TODO: podmienić na własną grafikę — Unsplash placeholder */}
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 82vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xl font-bold uppercase tracking-[0.15em] text-white md:text-2xl">
                  {item.title}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#aaa]">
                  ({item.sub})
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
