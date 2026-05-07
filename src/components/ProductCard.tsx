import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/shopify/types";

function shouldShowCompare(product: Product): boolean {
  const price = Number.parseFloat(product.priceRange.minVariantPrice.amount);
  const compare = Number.parseFloat(
    product.compareAtPriceRange.minVariantPrice.amount,
  );
  return Number.isFinite(compare) && Number.isFinite(price) && compare > price;
}

const SIZES =
  "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

export function ProductCard({ product }: { product: Product }) {
  const img = product.featuredImage?.url;
  const price = product.priceRange.minVariantPrice;
  const compare = product.compareAtPriceRange.minVariantPrice;
  const showCompare = shouldShowCompare(product);

  return (
    <Link
      href={`/produkt/${product.handle}`}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        {img ? (
          <Image
            src={img}
            alt={product.title}
            fill
            sizes={SIZES}
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-neutral-400">
            Brak zdjęcia
          </div>
        )}
        {!product.availableForSale ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/65 backdrop-blur-[1px]">
            <span className="rounded bg-neutral-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
              WYPRZEDANE
            </span>
          </div>
        ) : null}
      </div>
      <div className="mt-3 px-0.5">
        <p className="text-sm font-medium uppercase tracking-wide text-black line-clamp-2">
          {product.title}
        </p>
        <div className="mt-1 flex flex-wrap items-baseline gap-2">
          {showCompare ? (
            <>
              <span className="text-sm text-neutral-500 line-through">
                {formatPrice(compare)}
              </span>
              <span className="text-sm font-semibold text-black">
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold text-black">
              {formatPrice(price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
