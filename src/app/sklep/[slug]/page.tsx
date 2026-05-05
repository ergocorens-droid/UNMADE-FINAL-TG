import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/app/sklep/[slug]/ProductDetail";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { getRelatedProducts } from "@/lib/filterProducts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produkt" };

  return {
    title: product.name,
    description: `${product.name} — koszulka UNMADE. WANNA BE MY CARDIO? Nadruk na plecach, czarna lub biała. Darmowa dostawa od 300 zł.`,
    openGraph: {
      title: product.name,
      images: [{ url: product.img1, width: 800, height: 1000, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [
      product.img1,
      product.imgWhite1 ?? product.img2,
    ].filter((url, i, arr) => arr.indexOf(url) === i),
    description: `${product.name} — UNMADE streetwear. Wybierz kolor czarny lub biały.`,
    brand: { "@type": "Brand", name: "UNMADE" },
    offers: {
      "@type": "Offer",
      url: `https://unmade.pl/sklep/${product.slug}`,
      priceCurrency: "PLN",
      price: product.price,
      availability: product.soldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mx-auto max-w-[1400px] px-4 pt-6 text-[11px] uppercase tracking-wide text-neutral-500 md:px-6">
        <Link href="/sklep" className="transition hover:text-neutral-900">
          Sklep
        </Link>
        <span className="mx-2 text-neutral-300">/</span>
        <span className="text-neutral-900">{product.name}</span>
      </nav>
      <ProductDetail key={product.slug} product={product} related={related} />
    </div>
  );
}
