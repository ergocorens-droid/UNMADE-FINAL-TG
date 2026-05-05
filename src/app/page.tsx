import { CollectionGrid2026 } from "@/components/sections/CollectionGrid2026";
import { HeroSection } from "@/components/sections/HeroSection";
import { InstagramCta } from "@/components/sections/InstagramCta";
import { JoinCustomersSection } from "@/components/sections/JoinCustomersSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { ShopByCollectionSection } from "@/components/sections/ShopByCollectionSection";
import { TrustBadges } from "@/components/sections/TrustBadges";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "UNMADE — Car Culture Streetwear | Koszulki i Bluzy z Grafikami Aut",
  description:
    "Streetwear inspirowany car culture. Koszulki, bluzy i longsleeve'y z autorskimi grafikami aut — Porsche, JDM, drift. Limitowane dropy. Darmowa dostawa od 300 zł.",
  openGraph: {
    title:
      "UNMADE — Car Culture Streetwear | Koszulki i Bluzy z Grafikami Aut",
    description:
      "Streetwear inspirowany car culture. Limitowane dropy. Darmowa dostawa od 300 zł.",
    url: "https://unmade.pl",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CollectionGrid2026 />
      <ShopByCollectionSection />
      <JoinCustomersSection />
      <InstagramCta />
      <NewsletterSection />
      <TrustBadges />
    </>
  );
}
