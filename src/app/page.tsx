import type { Metadata } from "next";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { getServerLocale, getServerT } from "@/i18n/server";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const locale = await getServerLocale();

  const title = t("metadata.homeTitle");
  const description = t("metadata.homeDescription");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://unmade.pl",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProductsSection />
    </>
  );
}
