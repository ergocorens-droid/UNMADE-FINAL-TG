import { CollectionCarousel } from "@/components/CollectionCarousel";
import { getCollections } from "@/lib/shopify/api";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80";

export async function ShopByCollectionSection() {
  const collections = await getCollections();
  const items = collections.slice(0, 12).map((c) => ({
    title: c.title.toUpperCase(),
    sub: c.handle.toUpperCase(),
    href: `/sklep?kolekcja=${encodeURIComponent(c.handle)}`,
    img: c.image?.url ?? PLACEHOLDER_IMG,
  }));

  return (
    <section className="border-t border-neutral-200 bg-neutral-50 py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <h2 className="mb-10 text-center text-lg font-bold uppercase tracking-[0.25em] text-neutral-900 md:text-xl">
          SHOP BY COLLECTION
        </h2>
        <CollectionCarousel items={items} />
      </div>
    </section>
  );
}
