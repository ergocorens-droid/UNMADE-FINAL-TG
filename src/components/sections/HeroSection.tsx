"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/i18n/I18nContext";

const HERO_DESKTOP_SRC = "/hero-desktop-summer-sale-city-21x9.png";
const HERO_MOBILE_SRC = "/hero-mobile-summer-sale-city-4x5.png";

export function HeroSection() {
  const { t } = useT();

  return (
    <section className="relative aspect-[4/5] min-h-[520px] w-full md:h-auto md:min-h-0 md:aspect-auto">
      <Link
        href="/sklep"
        className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--unmade-accent)] md:h-auto"
        aria-label={t("home.heroCtaAria")}
      >
        <div className="absolute inset-0 z-0 md:hidden">
          <Image
            src={HERO_MOBILE_SRC}
            alt={t("home.heroImageAlt")}
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>

        <div className="relative z-0 hidden md:block">
          <Image
            src={HERO_DESKTOP_SRC}
            alt={t("home.heroImageAlt")}
            width={1916}
            height={821}
            priority
            className="h-auto w-full"
            sizes="100vw"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex flex-col items-center px-5 pb-10 pt-20 text-center text-white md:px-10 md:pb-10"
          aria-hidden
        >
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
          <div className="relative flex flex-col items-center">
            <span className="text-[13px] font-black lowercase tracking-[0.16em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] md:text-[15px]">
              clth
            </span>
            <span className="mt-3 rounded-full border border-white/80 px-5 py-2 text-[11px] font-black uppercase tracking-[0.12em] shadow-[0_8px_28px_rgba(0,0,0,0.22)] backdrop-blur-sm md:px-7 md:py-3 md:text-[12px]">
              Sprawd&#x17A; ofert&#x119;
            </span>
            <span className="mt-5 max-w-[94vw] text-[clamp(34px,9.6vw,82px)] font-black uppercase leading-[1] tracking-[0.02em] drop-shadow-[0_5px_22px_rgba(0,0,0,0.45)] md:mt-6 md:max-w-[90vw] md:text-[clamp(64px,6.3vw,118px)] md:leading-[0.9]">
              Wakacyjna wyprzeda&#x17C;
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
