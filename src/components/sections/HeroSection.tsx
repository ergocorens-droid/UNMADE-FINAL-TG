"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HERO_PHOTO_PATHS, pickRandomHeroPhoto } from "@/lib/heroPhotos";

export function HeroSection() {
  const [mobileSrc] = useState(() => pickRandomHeroPhoto());
  const [desktopIndex, setDesktopIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setDesktopIndex((i) => (i + 1) % HERO_PHOTO_PATHS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full">
      <Link
        href="/sklep"
        className="absolute inset-0 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--unmade-accent)]"
        aria-label="Przejdź do sklepu — 2026 Collection"
      >
        <div className="absolute inset-0 md:hidden">
          <Image
            src={mobileSrc}
            alt="UNMADE — car culture streetwear"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="absolute inset-0 hidden md:block">
          {HERO_PHOTO_PATHS.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="100vw"
              loading={i === 0 ? "eager" : "lazy"}
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                i === desktopIndex ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
              aria-hidden={i !== desktopIndex}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
        <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
          <span className="text-5xl font-bold tracking-[0.35em] text-white md:text-7xl lg:text-8xl">
            UNMADE
          </span>
          <p className="mt-6 text-[11px] uppercase tracking-[0.45em] text-white/80 md:text-xs">
            2026 COLLECTION
          </p>
        </div>
        <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            Scroll
          </span>
          <span
            className="block h-8 w-px animate-pulse bg-white/40"
            aria-hidden
          />
        </div>
      </Link>
    </section>
  );
}
