"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import {
  PROMO_CONFIG,
  getDiscountPercent,
  getPromoEndDate,
  isPromoActive,
} from "@/lib/promo";

export function AnnouncementBar() {
  if (!PROMO_CONFIG.enabled) return null;
  return <AnnouncementBarActive />;
}

function AnnouncementBarActive() {
  const endDate = getPromoEndDate();
  const time = useCountdown(endDate);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!isPromoActive()) return null;
  if (time.isExpired) return null;

  if (!mounted) {
    return (
      <div
        className="min-h-[2.5rem] w-full shrink-0 bg-black"
        aria-hidden
      />
    );
  }

  const code = PROMO_CONFIG.code.toUpperCase();
  const percent = getDiscountPercent();
  const countdown = `${String(time.days).padStart(2, "0")}D ${String(
    time.hours,
  ).padStart(2, "0")}H ${String(time.minutes).padStart(2, "0")}M ${String(
    time.seconds,
  ).padStart(2, "0")}S`;

  return (
    <div className="shrink-0 overflow-hidden border-b border-white/10 bg-black text-white">
      <Link
        href="/sklep"
        className="group relative flex min-h-[2.5rem] items-center overflow-hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] md:min-h-[2.75rem] md:text-xs"
        aria-label={`Promocja ${percent}% z kodem ${code}`}
      >
        <PromoMarquee code={code} percent={percent} countdown={countdown} />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent" />
      </Link>
    </div>
  );
}

function PromoMarquee({
  code,
  percent,
  countdown,
}: {
  code: string;
  percent: number;
  countdown: string;
}) {
  const item = (
    <span className="inline-flex items-center gap-4 px-4 md:gap-6 md:px-6">
      <span>Letnia promocja</span>
      <span className="h-1 w-1 rounded-full bg-white/45" aria-hidden />
      <span>
        Kod{" "}
        <span className="rounded-sm border border-white/35 bg-white px-2 py-0.5 font-black tracking-[0.16em] text-black">
          {code}
        </span>
      </span>
      <span className="h-1 w-1 rounded-full bg-white/45" aria-hidden />
      <span>-{percent}% na zamowienie</span>
      <span className="h-1 w-1 rounded-full bg-white/45" aria-hidden />
      <span>
        Koniec za{" "}
        <span className="font-mono font-bold tabular-nums tracking-[0.06em]">
          {countdown}
        </span>
      </span>
    </span>
  );

  return (
    <div className="flex min-w-max animate-unmade-marquee group-hover:[animation-play-state:paused]">
      <div className="flex min-w-max">{item}{item}{item}</div>
      <div className="flex min-w-max" aria-hidden>{item}{item}{item}</div>
    </div>
  );
}
