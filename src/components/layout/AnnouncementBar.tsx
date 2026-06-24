"use client";

import Link from "next/link";

const ITEMS = [
  { icon: "flag-pl", text: "Wysyłka z Polski", tone: "flag" },
  { icon: "★", text: "500+ zadowolonych klientów", tone: "star" },
  { icon: "🚚", text: "Darmowa wysyłka od 150 zł", tone: "delivery" },
] as const;

export function AnnouncementBar() {
  return (
    <div className="shrink-0 overflow-hidden border-b border-white/10 bg-black text-white">
      <Link
        href="/sklep"
        className="group relative flex min-h-[2.35rem] items-center overflow-hidden whitespace-nowrap text-[11px] font-black uppercase tracking-[0.14em] md:min-h-[2.5rem] md:text-xs"
        aria-label="Informacje sklepu: wysyłka z Polski, ponad 500 zadowolonych klientów, darmowa wysyłka od 150 zł"
      >
        <InfoMarquee />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent" />
      </Link>
    </div>
  );
}

function InfoMarquee() {
  const item = (
    <span className="inline-flex items-center gap-16 px-10 md:gap-28 md:px-16">
      {ITEMS.map((entry) => (
        <span key={entry.text} className="inline-flex items-center gap-4">
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[13px] font-black leading-none tracking-normal ${
              entry.tone === "star"
                ? "bg-yellow-400 text-black"
                : entry.tone === "flag"
                  ? "bg-transparent text-white"
                : "bg-white text-black"
            }`}
          >
            {entry.tone === "flag" ? (
              <span className="flex h-3.5 w-5 flex-col overflow-hidden rounded-[2px] border border-black/15 shadow-sm">
                <span className="block flex-1 bg-white" />
                <span className="block flex-1 bg-[#dc143c]" />
              </span>
            ) : (
              entry.icon
            )}
          </span>
          <span>{entry.text}</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="flex min-w-max animate-unmade-marquee group-hover:[animation-play-state:paused]">
      <div className="flex min-w-max">
        {item}
        {item}
        {item}
      </div>
      <div className="flex min-w-max" aria-hidden>
        {item}
        {item}
        {item}
      </div>
    </div>
  );
}
