import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCard } from "@/components/ProductCard";
import { FiltersDrawer } from "@/components/shop/FiltersDrawer";
import {
  ShopSidebar,
  type ShopFilterState,
} from "@/components/shop/ShopSidebar";
import { SortSelect } from "@/components/shop/SortSelect";
import { getServerLocale, getServerT } from "@/i18n/server";
import { getShopPageProducts, getSidebarCollectionCounts } from "@/lib/shopify/api";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const locale = await getServerLocale();
  const title = `${t("shop.title").trim()} | UNMADE`;
  const description = t("metadata.shopDescription");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://unmade.pl/sklep",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
  };
}

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

  const [products, counts, t] = await Promise.all([
    getShopPageProducts({
      kolor: active.kolor,
      typ: active.typ,
      sort: sortParam,
      q: searchQuery,
    }),
    getSidebarCollectionCounts(),
    getServerT(),
  ]);

  return (
    <div className="bg-white pb-20">
      <div className="mx-auto max-w-[1500px] px-4 py-16 md:px-8 md:py-24">
        <header className="text-center lg:text-left">
          <h1 className="text-4xl font-black uppercase leading-none tracking-normal text-neutral-950 md:text-6xl">
            {t("shop.title")}
          </h1>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-neutral-500 md:text-xs">
            {t("shop.subtitle")}
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
                  <div className="h-10 w-full max-w-xs animate-pulse bg-black/[0.06] lg:ml-auto" />
                }
              >
                <div className="w-full sm:w-auto lg:ml-auto">
                  <SortSelect />
                </div>
              </Suspense>
            </div>

            {products.length === 0 ? (
              <p className="mt-12 text-center text-sm text-neutral-600">
                {t("shop.noProductsFiltered")}
              </p>
            ) : (
              <div className="overflow-hidden border-l border-t border-black/[0.06]">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
