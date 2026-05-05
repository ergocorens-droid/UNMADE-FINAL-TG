import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

export function CollectionGrid2026() {
  return (
    <section className="border-t border-neutral-200 bg-white px-4 py-16 md:px-6 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-neutral-900 md:text-xl">
            2026 COLLECTION
          </h2>
          <Link
            href="/sklep"
            className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Link
            href="/sklep"
            className="border border-neutral-900 px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </section>
  );
}
