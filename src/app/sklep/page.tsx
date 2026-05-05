import Image from "next/image";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { filterProducts } from "@/lib/filterProducts";
import { parseShopSearchParams } from "@/lib/shopQuery";

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
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShopPage({ searchParams }: Props) {
  const raw = await searchParams;
  const parsed = parseShopSearchParams(raw);
  const list = filterProducts(parsed);

  return (
    <div className="bg-white pb-20 pt-0">
      <div className="relative aspect-[21/9] min-h-[220px] w-full md:min-h-[320px]">
        {/* TODO: podmienić na własną grafikę — Unsplash placeholder */}
        <Image
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=85"
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
        <div className="relative mb-10 overflow-hidden border border-neutral-200 bg-neutral-50">
          <div className="aspect-video flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-neutral-100 to-neutral-200">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
              Video placeholder
            </p>
            <p className="max-w-md px-6 text-center text-xs text-neutral-600">
              {/* TODO: podmienić na własne wideo jak apexero */}
              Tutaj trafi teaser kolekcji / lookbook (własne media).
            </p>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="mb-10 h-40 animate-pulse rounded bg-neutral-100" />
          }
        >
          <ShopToolbar />
        </Suspense>

        {list.length === 0 ? (
          <p className="mt-12 text-center text-sm text-neutral-600">
            Brak produktów dla wybranych filtrów.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
