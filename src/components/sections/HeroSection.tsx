"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/i18n/I18nContext";

const HERO_DESKTOP_SRC = "/hero-desktop-16x9.png";
const HERO_MOBILE_SRC = "/hero-mobile.png";

export function HeroSection() {
  const { t } = useT();

  return (
    <section className="relative aspect-[1122/1402] w-full md:h-[min(100svh,56.25vw)] md:aspect-auto">
      <Link
        href="/sklep"
        className="absolute inset-0 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--unmade-accent)]"
        aria-label={t("home.heroCtaAria")}
      >
        <div className="absolute inset-0 z-0 md:hidden">
          <Image
            src={HERO_MOBILE_SRC}
            alt={t("home.heroImageAlt")}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src={HERO_DESKTOP_SRC}
            alt={t("home.heroImageAlt")}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="pointer-events-none absolute bottom-4 left-1/2 z-[2] hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            {t("home.scrollHint")}
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
