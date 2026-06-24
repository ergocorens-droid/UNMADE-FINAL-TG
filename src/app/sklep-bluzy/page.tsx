import type { Metadata } from "next";
import { ShopPageContent } from "@/components/shop/ShopPageContent";
import { getServerLocale, getServerT } from "@/i18n/server";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const locale = await getServerLocale();
  const title = `${t("nav.hoodies")} | CLTH.PL`;
  const description = t("metadata.shopDescription");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://clth.pl/sklep-bluzy",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
  };
}

export default async function HoodiesPage() {
  return (
    <ShopPageContent
      basePath="/sklep-bluzy"
      active={{
        typ: "bluzy",
      }}
    />
  );
}
