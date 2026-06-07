import { ProductCard } from "@/components/ProductCard";
import { getProducts, shopSortFromParam } from "@/lib/shopify/api";

export async function FeaturedProductsSection() {
  const { sortKey, reverse } = shopSortFromParam("najnowsze");
  const shopifyProducts = await getProducts({
    first: 48,
    sortKey,
    reverse,
    cache: "no-store",
  });

  return (
    <section className="bg-[#f5f1ea] text-neutral-950">
      <div className="overflow-hidden border-l border-t border-black/[0.06]">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {shopifyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
