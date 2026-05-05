import { CollectionCarousel } from "@/components/CollectionCarousel";

export function ShopByCollectionSection() {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50 py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <h2 className="mb-10 text-center text-lg font-bold uppercase tracking-[0.25em] text-neutral-900 md:text-xl">
          SHOP BY COLLECTION
        </h2>
        <CollectionCarousel />
      </div>
    </section>
  );
}
