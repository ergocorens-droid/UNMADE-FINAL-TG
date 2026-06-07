import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getServerLocale, getServerT } from "@/i18n/server";
import { getCollections } from "@/lib/shopify/api";
import { pickHeroPhotoByIndex } from "@/lib/heroPhotos";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const locale = await getServerLocale();
  const title = `${t("metadata.kolekcjeListTitle")} | UNMADE`;
  const description = t("metadata.kolekcjeListDescription");

  return {
    title,
    description,
    openGraph: {
      title,
      url: "https://unmade.pl/kolekcje",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
  };
}

export default async function KolekcjePage() {
  const collections = await getCollections();
  const t = await getServerT();

  return (
    <div className="bg-white pb-24 pt-16 md:pt-24">
      <div className="mx-auto max-w-[1500px] px-4 md:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-neutral-500">
          {t("pages.limitedSeries")}
        </p>
        <h1 className="mt-4 border-b border-black/[0.06] pb-8 text-4xl font-black uppercase leading-none tracking-normal text-neutral-950 md:text-6xl">
          {t("nav.collections")}
        </h1>
        <div className="mt-12 grid border-l border-t border-black/[0.06] md:grid-cols-3">
          {collections.map((c, index) => {
            const img =
              c.image?.url ??
              pickHeroPhotoByIndex(index * 13 + c.handle.length);
            return (
              <Link
                key={c.id}
                href={`/kolekcje/${encodeURIComponent(c.handle)}`}
                className="group block border-b border-r border-black/[0.06] bg-white transition hover:bg-neutral-50"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={img}
                    alt={c.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="border-t border-black/[0.06] p-5">
                  <h2 className="text-sm font-black uppercase tracking-normal text-neutral-950">
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
            {t("collection.storeEmpty")}
          </p>
        ) : null}
      </div>
    </div>
  );
}
