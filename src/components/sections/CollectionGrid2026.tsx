import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export async function CollectionGrid2026() {
  const products = await getFeaturedProducts(16);

  return (
    <section className="border-t border-neutral-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 className="mb-10 text-lg font-bold uppercase tracking-[0.2em] text-neutral-900 md:text-xl">
          2026 COLLECTION
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <Link
            href="/sklep"
            className="rounded-none border border-neutral-900 bg-transparent px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
          >
            ZOBACZ KOLEKCJĘ
          </Link>
        </div>
      </div>
    </section>
  );
}
