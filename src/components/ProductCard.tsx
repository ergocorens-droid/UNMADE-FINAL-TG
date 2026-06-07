"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/i18n/I18nContext";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/shopify/types";

function shouldShowCompare(product: Product): boolean {
  const price = product.priceRange.minVariantPrice;
  const compare = product.compareAtPriceRange.minVariantPrice;
  if (!price || !compare) return false;
  const p = Number.parseFloat(price.amount);
  const c = Number.parseFloat(compare.amount);
  return Number.isFinite(c) && Number.isFinite(p) && c > p;
}

const SIZES =
  "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

export function ProductCard({ product }: { product: Product }) {
  const { t } = useT();
  const img = product.featuredImage?.url;
  const price = product.priceRange.minVariantPrice;
  const compare = product.compareAtPriceRange.minVariantPrice;
  const showCompare = shouldShowCompare(product);
  const showPrice = Boolean(price);

  return (
    <Link
      href={`/produkt/${product.handle}`}
      className="group block border-b border-r border-black/[0.06] bg-[#f8f5ef] outline-none transition-colors duration-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-square overflow-hidden">
        {img ? (
          <Image
            src={img}
            alt={product.title}
            fill
            sizes={SIZES}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-neutral-400">
            {t("common.noPhoto")}
          </div>
        )}
        {!product.availableForSale ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/65 backdrop-blur-[1px]">
            <span className="bg-neutral-900 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
              {t("product.outOfStock")}
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex min-h-[72px] items-center justify-between gap-4 border-t border-black/[0.06] bg-white px-3 py-3 md:px-4">
        <p className="text-xs font-black uppercase leading-tight tracking-normal text-neutral-950 line-clamp-2 md:text-sm">
          {product.title}
        </p>
        <div className="flex shrink-0 flex-wrap items-baseline justify-end gap-2 text-right">
          {!showPrice ? (
            <span className="text-xs font-semibold uppercase text-neutral-500 md:text-sm">
              {t("product.unavailableInRegion")}
            </span>
          ) : showCompare && compare && price ? (
            <>
              <span className="text-xs text-neutral-500 line-through md:text-sm">
                {formatPrice(compare)}
              </span>
              <span className="text-xs font-semibold uppercase text-neutral-950 md:text-sm">
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="text-xs font-semibold uppercase text-neutral-950 md:text-sm">
              {formatPrice(price!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
