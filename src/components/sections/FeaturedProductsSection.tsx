import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getServerT } from "@/i18n/server";
import { isTshirtProduct } from "@/lib/product-pricing";
import { getProducts } from "@/lib/shopify/api";
import type { Product } from "@/lib/shopify/types";

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

  const tshirtProducts = products
    .filter((product) => product.availableForSale && isTshirtProduct(product))
    .slice(0, 16);

  return (
    <section className="bg-white text-neutral-950">
      <ProductCollectionBlock
        products={tshirtProducts}
        href="/sklep-t-shirts"
        label={t("home.viewCollection")}
      />
    </section>
  );
}
