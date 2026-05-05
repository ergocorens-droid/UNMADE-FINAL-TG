import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full">
      <Link
        href="/sklep"
        className="absolute inset-0 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--unmade-accent)]"
        aria-label="Przejdź do sklepu — 2026 Collection"
      >
        {/* TODO: podmienić na własną grafikę — Unsplash placeholder */}
        <Image
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=85"
          alt="UNMADE — car culture streetwear"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
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
          <span className="block h-8 w-px animate-pulse bg-white/40" aria-hidden />
        </div>
      </Link>
    </section>
  );
}
