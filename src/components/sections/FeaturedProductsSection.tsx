import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getServerT } from "@/i18n/server";
import {
  getCollectionByHandle,
  getProducts,
  shopSortFromParam,
} from "@/lib/shopify/api";
import type { Product } from "@/lib/shopify/types";

function productText(product: Product): string {
  return `${product.title} ${product.handle} ${product.tags.join(" ")}`.toLowerCase();
}

function pickColorProducts(products: Product[], color: "black" | "white") {
  const colorNeedle = color === "black" ? "black" : "white";
  return products
    .filter((product) => {
      const text = productText(product);
      return text.includes("need money") && text.includes(colorNeedle);
    })
    .slice(0, 4);
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
  const { sortKey, reverse } = shopSortFromParam("najnowsze");
  const [shopifyProducts, quotesCollection, t] = await Promise.all([
    getProducts({
      first: 48,
      sortKey,
      reverse,
      cache: "no-store",
    }),
    getCollectionByHandle("cytaty", 8, "najnowsze"),
    getServerT(),
  ]);

  const blackProducts = pickColorProducts(shopifyProducts, "black");
  const whiteProducts = pickColorProducts(shopifyProducts, "white");
  const groupedProducts = [...blackProducts, ...whiteProducts];
  const productsToShow =
    groupedProducts.length > 0 ? groupedProducts : shopifyProducts.slice(0, 8);
  const quoteProducts = quotesCollection?.products.slice(0, 8) ?? [];

  return (
    <section className="space-y-10 bg-white text-neutral-950 md:space-y-14">
      <ProductCollectionBlock
        products={quoteProducts}
        href="/sklep-cytaty"
        label={t("home.viewCollection")}
      />
      <ProductCollectionBlock
        products={productsToShow}
        href="/sklep-need-money"
        label={t("home.viewCollection")}
      />
    </section>
  );
}
