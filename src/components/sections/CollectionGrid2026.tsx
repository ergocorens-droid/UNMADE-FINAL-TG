import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";

const IMAGE_SIZES =
  "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

export async function CollectionGrid2026() {
  const products = await getFeaturedProducts();

  return (
    <section className="border-t border-neutral-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 className="mb-10 text-lg font-bold uppercase tracking-[0.2em] text-neutral-900 md:text-xl">
          2026 COLLECTION
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href="/sklep"
              className="group flex flex-col overflow-hidden rounded-2xl bg-neutral-100 outline-none transition hover:opacity-[0.98] focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              <div className="relative aspect-square overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes={IMAGE_SIZES}
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-900">
                    <span className="text-sm font-medium uppercase tracking-widest text-white">
                      UNMADE
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1 px-4 py-4">
                <span className="text-sm uppercase tracking-wide text-neutral-900">
                  {product.title}
                </span>
                <span className="text-sm font-medium text-neutral-700">
                  {product.price} zł
                </span>
              </div>
            </Link>
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
