import type { Metadata } from "next";
import { ShopPageContent } from "@/components/shop/ShopPageContent";
import { getServerLocale, getServerT } from "@/i18n/server";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const locale = await getServerLocale();
  const title = `Christian | CLTH.PL`;
  const description = t("metadata.shopDescription");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://clth.pl/sklep-christian",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
  };
}

type Props = {
  searchParams: Promise<{
    sort?: string;
  }>;
};

export default async function ChristianPage({ searchParams }: Props) {
  const sp = await searchParams;

  return (
    <ShopPageContent
      basePath="/sklep-christian"
      active={{
        kolekcja: "christian",
        sort: typeof sp.sort === "string" ? sp.sort : "najnowsze",
      }}
    />
  );
}
