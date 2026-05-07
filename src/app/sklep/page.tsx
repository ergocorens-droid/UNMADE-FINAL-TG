import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCard } from "@/components/ProductCard";
import { FiltersDrawer } from "@/components/shop/FiltersDrawer";
import { ShopSidebar, type ShopFilterState } from "@/components/shop/ShopSidebar";
import { SortSelect } from "@/components/shop/SortSelect";
import { getShopPageProducts, getSidebarCollectionCounts } from "@/lib/shopify/api";

export const revalidate = 60;

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
  searchParams: Promise<{
    kolor?: string;
    typ?: string;
    sort?: string;
    q?: string;
  }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const sp = await searchParams;
  const sortParam = sp.sort ?? "najnowsze";
  const searchQuery = typeof sp.q === "string" ? sp.q : undefined;

  const active: ShopFilterState = {
    kolor: typeof sp.kolor === "string" ? sp.kolor : undefined,
    typ: typeof sp.typ === "string" ? sp.typ : undefined,
    sort: sortParam,
    q: searchQuery,
  };

  const [products, counts] = await Promise.all([
    getShopPageProducts({
      kolor: active.kolor,
      typ: active.typ,
      sort: sortParam,
      q: searchQuery,
    }),
    getSidebarCollectionCounts(),
  ]);

  return (
    <div className="bg-white pb-20">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <header className="text-center lg:text-left">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-neutral-900 md:text-5xl">
            SKLEP
          </h1>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-neutral-500 md:text-sm">
            Wszystkie produkty UNMADE
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:gap-12">
          <aside className="hidden w-64 shrink-0 lg:block">
            <ShopSidebar counts={counts} active={active} />
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="lg:hidden">
                <FiltersDrawer>
                  <ShopSidebar counts={counts} active={active} />
                </FiltersDrawer>
              </div>
              <Suspense
                fallback={
                  <div className="h-10 w-full max-w-xs animate-pulse rounded bg-neutral-100 lg:ml-auto" />
                }
              >
                <div className="w-full sm:w-auto lg:ml-auto">
                  <SortSelect />
                </div>
              </Suspense>
            </div>

            {products.length === 0 ? (
              <p className="mt-12 text-center text-sm text-neutral-600">
                Brak produktów dla wybranych filtrów.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
