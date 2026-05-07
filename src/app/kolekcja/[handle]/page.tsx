import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CollectionHeader } from "@/components/sections/CollectionHeader";
import { SortSelect } from "@/components/shop/SortSelect";
import { formatProductCountPl } from "@/lib/format";
import { getCollectionByHandle } from "@/lib/shopify/api";

export const revalidate = 60;

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const col = await getCollectionByHandle(handle, 1);
  if (!col) {
    return { title: "Kolekcja — UNMADE" };
  }
  const description = col.description
    ? col.description.replace(/<[^>]*>/g, "").trim()
    : undefined;
  return {
    title: `${col.title} — UNMADE`,
    description: description || undefined,
  };
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { handle } = await params;
  const sp = await searchParams;
  const sort = sp.sort;
  const collection = await getCollectionByHandle(handle, 100, sort);
  if (!collection) notFound();

  const products = collection.products;
  const count = products.length;

  return (
    <div className="bg-white pb-20">
      <CollectionHeader collection={collection} size="xl" />
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8 md:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-600">
            {formatProductCountPl(count)}
          </p>
          <Suspense
            fallback={
              <div className="h-10 w-full max-w-xs animate-pulse rounded bg-neutral-100 sm:ml-auto" />
            }
          >
            <SortSelect basePath={`/kolekcja/${handle}`} />
          </Suspense>
        </div>

        {count === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-neutral-600">
              Brak produktów w tej kolekcji.
            </p>
            <Link
              href="/sklep"
              className="mt-6 inline-block text-sm font-bold uppercase tracking-wide text-neutral-900 underline-offset-4 hover:underline"
            >
              Przejdź do sklepu
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
