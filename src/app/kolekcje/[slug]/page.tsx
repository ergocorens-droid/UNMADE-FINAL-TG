import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import type { CollectionSlug } from "@/data/products";
import { PRODUCTS } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

const SLUGS: CollectionSlug[] = ["porsche", "jdm", "drift"];

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUGS.includes(slug as CollectionSlug))
    return { title: "Kolekcja" };

  const label =
    slug === "porsche" ? "PORSCHE" : slug === "jdm" ? "JDM" : "DRIFT";

  return {
    title: `Kolekcja ${label}`,
    description: `Produkty z kolekcji ${label} — UNMADE streetwear.`,
  };
}

export default async function CollectionSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as CollectionSlug)) notFound();

  const comingSoon = slug === "jdm" || slug === "drift";

  const list = PRODUCTS.filter((p) => p.collection === slug);

  const heading =
    slug === "porsche" ? "PORSCHE" : slug === "jdm" ? "JDM" : "DRIFT";

  return (
    <div className="bg-white pb-24 pt-10 md:pt-14">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <nav className="text-[11px] uppercase tracking-wide text-neutral-500">
          <Link href="/kolekcje" className="hover:text-neutral-900">
            Kolekcje
          </Link>
          <span className="mx-2 text-neutral-300">/</span>
          <span className="text-neutral-900">{heading}</span>
        </nav>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold uppercase tracking-[0.18em] text-neutral-900 md:text-3xl">
            {heading}
          </h1>
          {comingSoon && (
            <span className="bg-[var(--unmade-accent)] px-3 py-1 text-[10px] font-bold uppercase text-white">
              WKRÓTCE
            </span>
          )}
        </div>
        <p className="mt-4 max-w-2xl text-sm text-neutral-600">
          🔥 Drop z kodem IGNITION -15% na wybrane pozycje. Nie przegap limitowanych serii.
        </p>

        {comingSoon && (
          <p className="mt-10 rounded border border-neutral-200 bg-neutral-50 p-8 text-center text-sm text-neutral-600">
            Kolekcja {heading} w przygotowaniu — zapisz się na newsletter i bądź pierwszy.
            {" "}
            <Link href="/#newsletter" className="font-semibold text-neutral-900 underline">
              Newsletter
            </Link>
          </p>
        )}

        {!comingSoon && (
          <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
