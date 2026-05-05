import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { RegionProvider } from "@/context/RegionContext";
import { SiteChrome } from "@/components/SiteChrome";
import { resolveRegion } from "@/lib/regions";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unmade.pl"),
  title: {
    default:
      "UNMADE — Car Culture Streetwear | Koszulki i Bluzy z Grafikami Aut",
    template: "%s | UNMADE",
  },
  description:
    "Streetwear inspirowany car culture. Koszulki, bluzy i longsleeve'y z autorskimi grafikami aut — Porsche, JDM, drift. Limitowane dropy. Darmowa dostawa od 300 zł.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "UNMADE",
    title:
      "UNMADE — Car Culture Streetwear | Koszulki i Bluzy z Grafikami Aut",
    description:
      "Streetwear inspirowany car culture. Limitowane dropy. Darmowa dostawa od 300 zł.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const countryCode =
    h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry") ?? "PL";
  const region = resolveRegion(countryCode);

  return (
    <html
      lang={region.locale === "pl" ? "pl" : "en"}
      className={`${inter.variable} h-full antialiased`}
    >
      <body
        className={`${inter.className} min-h-full flex flex-col bg-white text-neutral-900`}
      >
        <CartProvider>
          <RegionProvider
            locale={region.locale}
            currency={region.currency}
            country={region.country}
          >
            <SiteChrome>{children}</SiteChrome>
          </RegionProvider>
        </CartProvider>
      </body>
    </html>
  );
}
