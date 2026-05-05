import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kolekcje | UNMADE — Porsche, JDM, Drift",
  description:
    "Przeglądaj kolekcje UNMADE — streetwear inspirowany Porsche, japońskimi legendami i kulturą driftu.",
  openGraph: {
    title: "Kolekcje | UNMADE — Porsche, JDM, Drift",
    url: "https://unmade.pl/kolekcje",
  },
};

const CARDS = [
  {
    slug: "porsche",
    title: "PORSCHE",
    desc:
      "Feed money for Porsche. 911, GT3, Turbo — kolekcja inspirowana Stuttgartem.",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
    comingSoon: false,
  },
  {
    slug: "jdm",
    title: "JDM",
    desc:
      "Silvia, Supra, GT-R — japońskie ikony na streetwearze.",
    img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80",
    comingSoon: true,
  },
  {
    slug: "drift",
    title: "DRIFT",
    desc:
      "Boczkiem przez życie. Kolekcja dla tych co palą gumę.",
    img: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80",
    comingSoon: true,
  },
];

export default function KolekcjePage() {
  return (
    <div className="bg-white pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--unmade-accent)]">
          🔥 Limitowane serie • Kod IGNITION -15%
        </p>
        <h1 className="mt-4 text-3xl font-bold uppercase tracking-[0.2em] text-neutral-900 md:text-4xl">
          KOLEKCJE
        </h1>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {CARDS.map((c) => (
            <Link
              key={c.slug}
              href={`/kolekcje/${c.slug}`}
              className="group block overflow-hidden border border-neutral-200 bg-white shadow-sm transition hover:border-neutral-400"
            >
              <div className="relative aspect-[4/5] bg-neutral-100">
                {/* TODO: podmienić na własną grafikę — Unsplash placeholder */}
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
              <div className="border-t border-neutral-100 p-6">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-lg font-bold uppercase tracking-[0.15em] text-neutral-900">
                    {c.title}
                  </h2>
                  {c.comingSoon && (
                    <span className="shrink-0 bg-[var(--unmade-accent)] px-2 py-1 text-[9px] font-bold uppercase text-white">
                      WKRÓTCE
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
