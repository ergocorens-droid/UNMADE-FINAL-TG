import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { getServerT } from "@/i18n/server";
import { getCollectionByHandle } from "@/lib/shopify/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = await getServerT();
  const col = await getCollectionByHandle(slug, 1);
  if (!col) return { title: `${t("metadata.collectionFallback")} | UNMADE` };
  const desc =
    col.description.replace(/<[^>]+>/g, "").trim().slice(0, 160) ||
    t("metadata.kolekcjeFallbackDescription");
  return {
    title: col.title,
    description: desc,
  };
}

export default async function CollectionSlugPage({ params }: Props) {
  const { slug } = await params;
  const [col, t] = await Promise.all([
    getCollectionByHandle(slug, 48),
    getServerT(),
  ]);

  if (!col) notFound();

  return (
    <div className="bg-white pb-24 pt-10 md:pt-14">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <nav className="text-[11px] uppercase tracking-wide text-neutral-500">
          <Link href="/kolekcje" className="hover:text-neutral-900">
            {t("nav.collections")}
          </Link>
          <span className="mx-2 text-neutral-300">/</span>
          <span className="text-neutral-900">{col.title}</span>
        </nav>
        <h1 className="mt-6 text-2xl font-bold uppercase tracking-[0.18em] text-neutral-900 md:text-3xl">
          {col.title}
        </h1>
        {col.description ? (
          <div
            className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 [&_p]:mb-2"
            dangerouslySetInnerHTML={{ __html: col.description }}
          />
        ) : null}

        {col.products.length === 0 ? (
          <p className="mt-12 text-center text-sm text-neutral-600">
            {t("collection.emptySlug")}
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {col.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
