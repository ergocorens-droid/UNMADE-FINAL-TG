import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getCollections } from "@/lib/shopify/api";
import { pickHeroPhotoByIndex } from "@/lib/heroPhotos";

export const metadata: Metadata = {
  title: "Kolekcje | UNMADE — Streetwear",
  description:
    "Przeglądaj kolekcje UNMADE — limitowane serie i autorskie grafiki.",
  openGraph: {
    title: "Kolekcje | UNMADE",
    url: "https://unmade.pl/kolekcje",
  },
};

export default async function KolekcjePage() {
  const collections = await getCollections();

  return (
    <div className="bg-white pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--unmade-accent)]">
          Limitowane serie
        </p>
        <h1 className="mt-4 text-3xl font-bold uppercase tracking-[0.2em] text-neutral-900 md:text-4xl">
          KOLEKCJE
        </h1>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {collections.map((c, index) => {
            const img =
              c.image?.url ??
              pickHeroPhotoByIndex(index * 13 + c.handle.length);
            return (
              <Link
                key={c.id}
                href={`/kolekcje/${encodeURIComponent(c.handle)}`}
                className="group block overflow-hidden border border-neutral-200 bg-white shadow-sm transition hover:border-neutral-400"
              >
                <div className="relative aspect-[4/5] bg-neutral-100">
                  <Image
                    src={img}
                    alt={c.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="border-t border-neutral-100 p-6">
                  <h2 className="text-lg font-bold uppercase tracking-[0.15em] text-neutral-900">
                    {c.title}
                  </h2>
                  {c.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-4">
                      {c.description.replace(/<[^>]+>/g, "")}
                    </p>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
        {collections.length === 0 ? (
          <p className="mt-12 text-center text-sm text-neutral-600">
            Brak kolekcji w sklepie.
          </p>
        ) : null}
      </div>
    </div>
  );
}
