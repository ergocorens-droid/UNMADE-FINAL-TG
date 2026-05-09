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
import { useT } from "@/i18n/I18nContext";

export function AnnouncementBar() {
  if (!PROMO_CONFIG.enabled) return null;
  return <AnnouncementBarActive />;
}

function AnnouncementBarActive() {
  const { t } = useT();
  const endDate = getPromoEndDate();
  const time = useCountdown(endDate);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!isPromoActive()) return null;
  if (time.isExpired) return null;

  if (!mounted) {
    return (
      <div
        className="w-full min-h-[2.75rem] shrink-0 bg-gradient-to-r from-red-900 via-red-800 to-red-900"
        aria-hidden
      />
    );
  }

  const percent = getDiscountPercent();
  const label = t("promo.label");
  const discount = t("promo.discount", { percent });
  const endsIn = t("promo.endsIn");
  const dLabel = t("promo.days");
  const hLabel = t("promo.hours");
  const mLabel = t("promo.minutes");
  const sLabel = t("promo.seconds");

  const labelParts = label.split(" — ");
  const labelShort =
    labelParts.length > 1 ? (labelParts[0] ?? label) : label;

  return (
    <div className="shrink-0 bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white">
      <Link
        href="/sklep"
        className="flex min-h-[2.75rem] items-center justify-center gap-3 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] transition-opacity hover:opacity-90 md:gap-6 md:text-xs"
      >
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden">{labelShort}</span>

        <span className="font-bold text-amber-300">{discount}</span>

        <span className="hidden opacity-70 md:inline" aria-hidden>
          •
        </span>

        <span className="flex flex-wrap items-center justify-center gap-2">
          <span className="hidden opacity-90 md:inline">{endsIn}</span>
          <span className="whitespace-nowrap font-mono tabular-nums tracking-tight">
            {String(time.days).padStart(2, "0")}
            {dLabel}{" "}
            {String(time.hours).padStart(2, "0")}
            {hLabel}{" "}
            {String(time.minutes).padStart(2, "0")}
            {mLabel}{" "}
            <span className="opacity-70">
              {String(time.seconds).padStart(2, "0")}
              {sLabel}
            </span>
          </span>
        </span>
      </Link>
    </div>
  );
}
