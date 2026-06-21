import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getServerT } from "@/i18n/server";
import { getProducts } from "@/lib/shopify/api";
import type { Product } from "@/lib/shopify/types";

function seededRandom(seed: number): () => number {
  let state = seed || 1;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function hourlyShuffle(products: Product[], limit: number): Product[] {
  const currentHourSeed = Math.floor(Date.now() / 3_600_000);
  const random = seededRandom(currentHourSeed);
  const shuffled = [...products];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, limit);
}

function ProductCollectionBlock({
  products,
  href,
  label,
}: {
  products: Product[];
  href: string;
  label: string;
}) {
  if (products.length === 0) return null;

  return (
    <div className="overflow-hidden border-l border-t border-black/[0.06]">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href={href}
        className="group flex min-h-16 items-center justify-center border-b border-r border-neutral-950 bg-neutral-950 px-4 text-center text-xs font-black uppercase tracking-[0.24em] text-white transition hover:bg-neutral-800 md:text-sm"
      >
        <span>{label}</span>
        <span
          className="ml-3 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        >
          →
        </span>
      </Link>
    </div>
  );
}

export async function FeaturedProductsSection() {
  const [products, t] = await Promise.all([
    getProducts({ first: 80, sortKey: "CREATED_AT", reverse: true }),
    getServerT(),
  ]);

  const mixedProducts = hourlyShuffle(
    products.filter((product) => product.availableForSale),
    16,
  );

  return (
    <section className="bg-white text-neutral-950">
      <ProductCollectionBlock
        products={mixedProducts}
        href="/sklep"
        label={t("home.viewCollection")}
      />
    </section>
  );
}
