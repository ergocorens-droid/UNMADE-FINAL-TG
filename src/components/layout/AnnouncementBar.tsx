"use client";

import Link from "next/link";
import { useT } from "@/i18n/I18nContext";

export function AnnouncementBar() {
  const { t } = useT();

  return (
    <div className="shrink-0 border-b border-white/10 bg-black text-white">
      <Link
        href="/sklep-t-shirts"
        className="flex min-h-[2.65rem] items-center justify-center gap-2.5 px-3 py-2 text-center text-[10px] font-black uppercase leading-tight tracking-[0.1em] transition hover:bg-white/10 sm:text-[11px] md:min-h-[2.75rem] md:gap-3 md:text-xs md:tracking-[0.14em]"
        aria-label={t("announcement.full")}
      >
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-400 px-2 py-1 text-[8px] tracking-[0.08em] text-black sm:text-[9px]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-950" aria-hidden />
          {t("announcement.active")}
        </span>
        <span className="sm:hidden">{t("announcement.short")}</span>
        <span className="hidden sm:inline">{t("announcement.full")}</span>
      </Link>
    </div>
  );
}
