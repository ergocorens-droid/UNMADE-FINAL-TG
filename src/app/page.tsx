import { CollectionGrid2026 } from "@/components/sections/CollectionGrid2026";
import { HeroSection } from "@/components/sections/HeroSection";
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
    </>
  );
}
