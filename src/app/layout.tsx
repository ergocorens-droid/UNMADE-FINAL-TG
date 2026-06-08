import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MetaPixel } from "@/components/shared/meta-pixel";
import { SiteChrome } from "@/components/SiteChrome";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { I18nProvider } from "@/i18n/I18nContext";
import { getServerLocale, getServerT } from "@/i18n/server";
import { getServerCurrency } from "@/lib/shopify/get-currency";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const staticIconsAndRobots = {
  metadataBase: new URL("https://clth.pl"),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
} satisfies Partial<Metadata>;

const socialPreviewImage = {
  url: "/hero-desktop-white.png",
  width: 1680,
  height: 945,
  alt: "CLTH.PL - Need Money For Porsche Tee",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const locale = await getServerLocale();

  const titleDefault = t("metadata.homeTitle");
  const description = t("metadata.homeDescription");
  const ogLocale = locale === "pl" ? "pl_PL" : "en_US";

  return {
    ...staticIconsAndRobots,
    title: {
      default: titleDefault,
      template: "%s | CLTH.PL",
    },
    description,
    openGraph: {
      type: "website",
      locale: ogLocale,
      siteName: "CLTH.PL",
      title: titleDefault,
      description,
      images: [socialPreviewImage],
    },
    twitter: {
      card: "summary_large_image",
      title: titleDefault,
      description,
      images: [socialPreviewImage.url],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialCurrency = await getServerCurrency();
  const locale = await getServerLocale();

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <body
        className={`${inter.className} min-h-full flex flex-col bg-white text-neutral-900`}
      >
        <MetaPixel />
        <CurrencyProvider initialCurrency={initialCurrency}>
          <I18nProvider>
            <CartProvider>
              <SiteChrome>{children}</SiteChrome>
            </CartProvider>
          </I18nProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
