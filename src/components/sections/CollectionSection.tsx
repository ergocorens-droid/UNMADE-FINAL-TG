import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getServerT } from "@/i18n/server";
import { getCollectionByHandle } from "@/lib/shopify/api";
import { CollectionHeader } from "./CollectionHeader";

type Props = {
  handle: string;
  productLimit?: number;
};

export async function CollectionSection({ handle, productLimit = 8 }: Props) {
  const collection = await getCollectionByHandle(handle, productLimit);
  if (!collection || collection.products.length === 0) return null;

  const t = await getServerT();

  return (
    <section className="w-full bg-[#f5f1ea]">
      <CollectionHeader collection={collection} size="lg" />
      <div className="mx-auto max-w-[1500px] px-4 py-12 md:px-8 md:py-16">
        <div className="overflow-hidden border-l border-t border-black/[0.06]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {collection.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href={`/kolekcja/${handle}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 hover:underline"
          >
            {t("collection.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
