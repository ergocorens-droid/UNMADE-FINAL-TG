import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getServerT } from "@/i18n/server";
import { getProducts, shopSortFromParam } from "@/lib/shopify/api";
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

export async function FeaturedProductsSection() {
  const { sortKey, reverse } = shopSortFromParam("najnowsze");
  const [shopifyProducts, t] = await Promise.all([
    getProducts({
      first: 48,
      sortKey,
      reverse,
      cache: "no-store",
    }),
    getServerT(),
  ]);

  const blackProducts = pickColorProducts(shopifyProducts, "black");
  const whiteProducts = pickColorProducts(shopifyProducts, "white");
  const groupedProducts = [...blackProducts, ...whiteProducts];
  const productsToShow =
    groupedProducts.length > 0 ? groupedProducts : shopifyProducts.slice(0, 8);

  return (
    <section className="bg-white text-neutral-950">
      <div className="overflow-hidden border-l border-t border-black/[0.06]">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {productsToShow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link
          href="/sklep-need-money"
          className="flex min-h-14 items-center justify-center border-b border-r border-black/[0.06] bg-white px-4 text-center text-xs font-black uppercase tracking-[0.22em] text-neutral-950 transition hover:bg-neutral-50 md:text-sm"
        >
          {t("home.viewCollection")}
        </Link>
      </div>
    </section>
  );
}
