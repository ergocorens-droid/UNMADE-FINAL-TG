import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductGallery } from "@/components/product/ProductGallery";
import { getServerT } from "@/i18n/server";
import { getProductByHandle } from "@/lib/shopify/api";
import type { Product as ShopifyProduct } from "@/lib/shopify/types";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const t = await getServerT();
  const product = await getProductByHandle(handle);
  if (!product) {
    return { title: `${t("metadata.productFallback")} | UNMADE` };
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
        url: `https://unmade.pl/produkt/${product.handle}`,
        priceCurrency: price.currencyCode,
        price: price.amount,
        availability,
      }
    : {
        "@type": "Offer" as const,
        url: `https://unmade.pl/produkt/${product.handle}`,
        availability,
      };
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images.map((i) => i.url).filter(Boolean),
    description: product.description,
    brand: { "@type": "Brand", name: "UNMADE" },
    offers,
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const t = await getServerT();
  const jsonLd = buildJsonLd(product);

  return (
    <div className="min-h-screen bg-[#f5f1ea] pb-20 pt-8 md:pt-12">
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

            <div
              className="mt-10 max-w-none border-t border-black/[0.06] pt-8 text-sm leading-relaxed text-neutral-800 [&_img]:max-w-full [&_p]:mb-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

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
