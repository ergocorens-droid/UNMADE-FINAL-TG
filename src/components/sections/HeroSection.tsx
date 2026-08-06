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
        href="/sklep-t-shirts"
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
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex flex-col items-center px-5 pb-8 pt-28 text-center text-white md:px-10 md:pb-10"
        >
          <div className="absolute inset-x-0 bottom-0 h-[28rem] bg-gradient-to-t from-black/80 via-black/35 to-transparent md:h-80" />
          <div className="relative flex w-[calc(100vw-2.5rem)] max-w-5xl flex-col items-center md:w-full">
            <p className="text-[12px] font-black uppercase tracking-[0.18em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] md:text-sm">
              {t("home.heroPromoLabel")}
            </p>
            <h1 className="mt-3 w-full text-[clamp(25px,7.4vw,58px)] font-black uppercase leading-[0.95] tracking-[-0.025em] drop-shadow-[0_5px_22px_rgba(0,0,0,0.55)] md:mt-4 md:text-[clamp(48px,5.2vw,92px)]">
              <span className="block">{t("home.heroPromoTitleLineOne")}</span>
              <span className="block">{t("home.heroPromoTitleLineTwo")}</span>
            </h1>
            <p className="mt-4 w-full max-w-xl text-[13px] font-semibold leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] sm:text-base md:max-w-2xl md:text-lg">
              <span className="block sm:inline">{t("home.heroPromoSubtitleLead")}</span>{" "}
              <span className="block sm:inline">{t("home.heroPromoSubtitleMix")}</span>
            </p>
            <span className="mt-5 border border-white bg-white px-6 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-black shadow-[0_8px_28px_rgba(0,0,0,0.25)] md:px-8 md:text-xs">
              {t("home.heroPromoCta")}
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
