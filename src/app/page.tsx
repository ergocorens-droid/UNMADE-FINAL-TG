import type { Metadata } from "next";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { getServerLocale, getServerT } from "@/i18n/server";

export const revalidate = 60;

const socialPreviewImage = {
  url: "/hero-desktop-white.png",
  width: 1680,
  height: 945,
  alt: "UNMADE - Need Money For Porsche Tee",
};

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
      images: [socialPreviewImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialPreviewImage.url],
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
