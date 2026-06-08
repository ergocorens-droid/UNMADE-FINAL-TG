import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductGallery } from "@/components/product/ProductGallery";
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
    <section className="mt-12 border-y border-black/[0.08]">
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
          <ProductGallery images={product.images} alt={product.title} />
          <div>
            <h1 className="border-b border-black/[0.06] pb-6 text-3xl font-black uppercase leading-none tracking-normal text-neutral-950 md:text-5xl">
              {product.title}
            </h1>

            <ProductBuyBox key={product.id} product={product} />

            <ProductDescriptionSections html={product.descriptionHtml} />

            {(product.tags.length > 0 || product.collections.length > 0) && (
              <div className="mt-10 border-t border-black/[0.06] pt-6 text-xs text-neutral-600">
                {product.tags.length > 0 ? (
                  <p>
                    <span className="font-bold uppercase tracking-wider text-neutral-500">
                      {t("product.tagsLabel")}{" "}
                    </span>
                    {product.tags.join(", ")}
                  </p>
                ) : null}
                {product.collections.length > 0 ? (
                  <p className="mt-2">
                    <span className="font-bold uppercase tracking-wider text-neutral-500">
                      {t("product.collectionsLabel")}{" "}
                    </span>
                    {product.collections.map((c) => c.title).join(", ")}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
