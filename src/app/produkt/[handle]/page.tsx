import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductGallery } from "@/components/product/ProductGallery";
import { getProductByHandle } from "@/lib/shopify/api";
import type { Product as ShopifyProduct } from "@/lib/shopify/types";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) {
    return { title: "Produkt" };
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
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images.map((i) => i.url).filter(Boolean),
    description: product.description,
    brand: { "@type": "Brand", name: "UNMADE" },
    offers: {
      "@type": "Offer",
      url: `https://unmade.pl/produkt/${product.handle}`,
      priceCurrency: price.currencyCode,
      price: price.amount,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const jsonLd = buildJsonLd(product);

  return (
    <div className="min-h-screen bg-white pb-20 pt-6 md:pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mx-auto max-w-[1400px] px-4 text-[11px] uppercase tracking-wide text-neutral-500 md:px-6">
        <Link href="/sklep" className="transition hover:text-neutral-900">
          Sklep
        </Link>
        <span className="mx-2 text-neutral-300">/</span>
        <span className="text-neutral-900">{product.title}</span>
      </nav>

      <div className="mx-auto mt-8 max-w-[1400px] px-4 md:mt-12 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} alt={product.title} />
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-[0.12em] text-neutral-900 md:text-3xl">
              {product.title}
            </h1>

            <ProductBuyBox key={product.id} product={product} />

            <div
              className="mt-10 max-w-none text-sm leading-relaxed text-neutral-800 [&_img]:max-w-full [&_p]:mb-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            {(product.tags.length > 0 || product.collections.length > 0) && (
              <div className="mt-10 border-t border-neutral-200 pt-6 text-xs text-neutral-600">
                {product.tags.length > 0 ? (
                  <p>
                    <span className="font-bold uppercase tracking-wider text-neutral-500">
                      Tagi:{" "}
                    </span>
                    {product.tags.join(", ")}
                  </p>
                ) : null}
                {product.collections.length > 0 ? (
                  <p className="mt-2">
                    <span className="font-bold uppercase tracking-wider text-neutral-500">
                      Kolekcje:{" "}
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
