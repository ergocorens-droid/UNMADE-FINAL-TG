import type { Metadata } from "next";
import type { ShopFilterState } from "@/components/shop/ShopSidebar";
import { ShopPageContent } from "@/components/shop/ShopPageContent";
import { getServerLocale, getServerT } from "@/i18n/server";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const locale = await getServerLocale();
  const title = `${t("shop.title").trim()} | CLTH.PL`;
  const description = t("metadata.shopDescription");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://clth.pl/sklep",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
  };
}

type Props = {
  searchParams: Promise<{
    kolor?: string;
    typ?: string;
    kolekcja?: string;
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
    kolekcja: typeof sp.kolekcja === "string" ? sp.kolekcja : undefined,
    sort: sortParam,
    q: searchQuery,
  };

  return <ShopPageContent active={active} />;
}
