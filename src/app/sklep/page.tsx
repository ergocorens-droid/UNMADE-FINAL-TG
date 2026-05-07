import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SortSelect } from "@/components/shop/SortSelect";
import {
  getCollectionByHandle,
  getCollections,
  getProducts,
  shopSortFromParam,
} from "@/lib/shopify/api";
import { pickRandomHeroPhoto } from "@/lib/heroPhotos";

export const metadata: Metadata = {
  title: "Sklep | UNMADE — Streetwear z Motywem Samochodowym",
  description:
    "Wszystkie produkty UNMADE — koszulki, bluzy i longsleeve'y z grafikami aut. Limitowane serie, autorskie projekty.",
  openGraph: {
    title: "Sklep | UNMADE — Streetwear z Motywem Samochodowym",
    description:
      "Wszystkie produkty UNMADE — koszulki, bluzy i longsleeve'y z grafikami aut.",
    url: "https://unmade.pl/sklep",
  },
};

type Props = {
  searchParams: Promise<{ kolekcja?: string; sort?: string; q?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const sp = await searchParams;
  const kolekcja = sp.kolekcja;
  const sortParam = sp.sort ?? "najnowsze";
  const searchQuery = typeof sp.q === "string" ? sp.q : undefined;

  const collections = await getCollections();

  let products;
  if (kolekcja) {
    const col = await getCollectionByHandle(kolekcja, 48, sortParam);
    products = col?.products ?? [];
  } else {
    const { sortKey, reverse } = shopSortFromParam(sortParam);
    products = await getProducts({
      first: 48,
      sortKey,
      reverse,
      query: searchQuery,
    });
  }

  const sortQuery =
    sortParam && sortParam !== "najnowsze"
      ? `sort=${encodeURIComponent(sortParam)}`
      : "";

  function shopHref(k?: string) {
    const parts: string[] = [];
    if (k) parts.push(`kolekcja=${encodeURIComponent(k)}`);
    if (sortQuery) parts.push(sortQuery);
    return parts.length ? `/sklep?${parts.join("&")}` : "/sklep";
  }

  const bannerImage = pickRandomHeroPhoto();

  return (
    <div className="bg-white pb-20 pt-0">
      <div className="relative aspect-[21/9] min-h-[220px] w-full md:min-h-[320px]">
        <Image
          src={bannerImage}
          alt="Sklep UNMADE — baner"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-[0.25em] text-white md:text-5xl">
            SKLEP
          </h1>
          <p className="mt-4 text-xs uppercase tracking-[0.35em] text-[#ccc] md:text-sm">
            WSZYSTKIE PRODUKTY
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14">
        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="lg:w-56 lg:shrink-0">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              Kolekcje
            </p>
            <nav className="flex flex-col gap-1">
              <CollectionLink
                href={shopHref()}
                label="Wszystkie"
                active={!kolekcja}
              />
              {collections.map((c) => (
                <CollectionLink
                  key={c.id}
                  href={shopHref(c.handle)}
                  label={c.title}
                  active={kolekcja === c.handle}
                />
              ))}
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            <Suspense
              fallback={
                <div className="mb-8 h-10 animate-pulse rounded bg-neutral-100" />
              }
            >
              <div className="mb-10 flex justify-end">
                <SortSelect />
              </div>
            </Suspense>

            {products.length === 0 ? (
              <p className="mt-12 text-center text-sm text-neutral-600">
                Brak produktów w tej kategorii
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function CollectionLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`rounded border px-3 py-2 text-left text-[11px] font-bold uppercase tracking-wide transition ${
        active
          ? "border-neutral-900 bg-neutral-900 text-white"
          : "border-neutral-300 text-neutral-800 hover:border-neutral-900"
      }`}
    >
      {label}
    </Link>
  );
}
