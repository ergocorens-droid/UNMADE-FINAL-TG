import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfoAccordions } from "@/components/product/ProductInfoAccordions";
import { ViewContentTracker } from "@/components/product/ViewContentTracker";
import { getServerT } from "@/i18n/server";
import { getProductByHandle } from "@/lib/shopify/api";
import type { Product as ShopifyProduct } from "@/lib/shopify/types";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const t = await getServerT();
  const product = await getProductByHandle(handle, undefined, "no-store");
  if (!product) {
    return { title: `${t("metadata.productFallback")} | CLTH.PL` };
  }
  return {
    title: product.title,
    description:
      product.description.replace(/\s+/g, " ").trim().slice(0, 160) ||
      product.title,
    openGraph: product.featuredImage?.url
      ? { images: [{ url: product.featuredImage.url }] }
      : undefined,
  };
}

function buildJsonLd(product: ShopifyProduct) {
  const price = product.priceRange.minVariantPrice;
  const availability = product.availableForSale
    ? ("https://schema.org/InStock" as const)
    : ("https://schema.org/OutOfStock" as const);
  const offers = price
    ? {
        "@type": "Offer" as const,
        url: `https://clth.pl/produkt/${product.handle}`,
        priceCurrency: price.currencyCode,
        price: price.amount,
        availability,
      }
    : {
        "@type": "Offer" as const,
        url: `https://clth.pl/produkt/${product.handle}`,
        availability,
      };
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images.map((i) => i.url).filter(Boolean),
    description: product.description,
    brand: { "@type": "Brand", name: "CLTH.PL" },
    offers,
  };
}

function stripHeading(html: string, heading: string): string {
  return html
    .replace(
      new RegExp(
        `<p[^>]*>\\s*<strong[^>]*>\\s*${heading}\\s*</strong>\\s*</p>`,
        "i",
      ),
      "",
    )
    .replace(
      new RegExp(`<p[^>]*>\\s*${heading}\\s*</p>`, "i"),
      "",
    )
    .trim();
}

function splitProductDescription(html: string): {
  detailsHtml: string;
  careHtml: string;
} {
  const careHeading = /<p[^>]*>\s*<strong[^>]*>\s*Pielęgnacja\s*<\/strong>\s*<\/p>/i;
  const careMatch = html.match(careHeading);

  if (!careMatch || careMatch.index === undefined) {
    return {
      detailsHtml: stripHeading(html, "Szczegóły produktu"),
      careHtml: "",
    };
  }

  const detailsPart = html.slice(0, careMatch.index);
  const carePart = html.slice(careMatch.index);

  return {
    detailsHtml: stripHeading(detailsPart, "Szczegóły produktu"),
    careHtml: stripHeading(carePart, "Pielęgnacja"),
  };
}

function ProductDescriptionSections({ html }: { html: string }) {
  const { detailsHtml, careHtml } = splitProductDescription(html);
  if (!detailsHtml && !careHtml) return null;

  const contentClass =
    "mt-5 text-base leading-8 text-neutral-900 md:text-lg md:leading-9 [&_br]:block [&_p]:mb-0 [&_strong]:font-black";

  return (
    <section className="mt-6 border-y border-black/[0.08] md:mt-12">
      <div className="grid md:grid-cols-2">
        {detailsHtml ? (
          <article className="py-8 md:pr-10">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-neutral-950 md:text-base">
              Szczegóły produktu
            </h2>
            <div
              className={contentClass}
              dangerouslySetInnerHTML={{ __html: detailsHtml }}
            />
          </article>
        ) : null}

        {careHtml ? (
          <article className="border-t border-black/[0.08] py-8 md:border-l md:border-t-0 md:pl-10">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-neutral-950 md:text-base">
              Pielęgnacja
            </h2>
            <div
              className={contentClass}
              dangerouslySetInnerHTML={{ __html: careHtml }}
            />
          </article>
        ) : null}
      </div>
    </section>
  );
}

function ProductTrustSection({ className = "" }: { className?: string }) {
  const items = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M20 6 9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Kup teraz",
      accent: "wysy&#x142;amy z Polski w 24-48h",
      tone: "text-emerald-600",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M3 7h11v10H3V7Zm11 3h4l3 3v4h-7v-7Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      ),
      title: "InPost",
      accent: "kurier i paczkomaty InPost",
      tone: "text-neutral-950",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M4 12a8 8 0 0 1 13.66-5.66L20 8.68M20 4v4.68h-4.68M20 12a8 8 0 0 1-13.66 5.66L4 15.32M4 20v-4.68h4.68"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "&#x141;atwe zwroty",
      accent: "14 dni na zwrot",
      tone: "text-neutral-950",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="m12 3 2.75 5.57 6.15.9-4.45 4.34 1.05 6.12L12 17.04l-5.5 2.89 1.05-6.12L3.1 9.47l6.15-.9L12 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Wysoka jako&#x15B;&#x107;",
      accent: "",
      tone: "text-neutral-950",
    },
  ];

  return (
    <section
      className={`mt-6 border-y border-black/[0.08] py-5 md:mt-8 md:max-w-[620px] ${className}`}
    >
      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current ${item.tone}`}
              aria-hidden
            >
              {item.icon}
            </span>
            <p className="text-sm font-black uppercase tracking-[0.04em] text-neutral-950">
              <span dangerouslySetInnerHTML={{ __html: item.title }} />
              {item.accent ? (
                <>
                  <span> - </span>
                  <span
                    className={item.tone}
                    dangerouslySetInnerHTML={{ __html: item.accent }}
                  />
                </>
              ) : null}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle, undefined, "no-store");
  if (!product) notFound();

  const t = await getServerT();
  const jsonLd = buildJsonLd(product);
  const trackingPrice = product.priceRange.minVariantPrice;

  return (
    <div className="min-h-screen bg-white pb-20 pt-8 md:pt-12">
      {trackingPrice ? (
        <ViewContentTracker
          id={product.id}
          name={product.title}
          price={Number.parseFloat(trackingPrice.amount)}
          currency={trackingPrice.currencyCode}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mx-auto max-w-[1500px] px-4 text-[11px] uppercase tracking-wide text-neutral-500 md:px-8">
        <Link href="/sklep" className="transition hover:text-neutral-900">
          {t("shop.breadcrumbShop")}
        </Link>
        <span className="mx-2 text-neutral-300">/</span>
        <span className="text-neutral-900">{product.title}</span>
      </nav>

      <div className="mx-auto mt-8 max-w-[1500px] px-4 md:mt-12 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <ProductGallery images={product.images} alt={product.title} />
            <ProductTrustSection className="hidden md:block" />
          </div>
          <div>
            <h1 className="border-b border-black/[0.06] pb-5 text-2xl font-black uppercase leading-tight tracking-normal text-neutral-950 sm:text-3xl lg:text-[34px]">
              {product.title}
            </h1>

            <ProductBuyBox key={product.id} product={product} />

            <ProductInfoAccordions html={product.descriptionHtml} />
            <ProductTrustSection className="md:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
