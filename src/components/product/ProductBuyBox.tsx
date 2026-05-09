"use client";

import { useCallback, useState } from "react";
import { VariantSelector } from "@/components/product/VariantSelector";
import { useT } from "@/i18n/I18nContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import type { Product, ProductVariant } from "@/lib/shopify/types";

export function ProductBuyBox({ product }: { product: Product }) {
  const { t } = useT();
  const { addItem, openCart, isLoading } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    () =>
      product.variants.find((v) => v.availableForSale) ??
      product.variants[0] ??
      null,
  );

  const onVariantChange = useCallback((v: ProductVariant) => {
    setSelectedVariant(v);
  }, []);

  const showSelector = product.options.some((o) => o.values.length > 1);

  const qtyAvail = selectedVariant?.quantityAvailable;
  const lowStock =
    qtyAvail !== null &&
    qtyAvail !== undefined &&
    qtyAvail > 0 &&
    qtyAvail < 10;

  const canAdd =
    selectedVariant !== null &&
    selectedVariant.availableForSale &&
    !isLoading;

  return (
    <div className="mt-8 space-y-8 border-t border-neutral-200 pt-8">
      <div>
        {selectedVariant ? (
          <div className="flex flex-wrap items-baseline gap-3">
            {selectedVariant.compareAtPrice &&
            Number.parseFloat(selectedVariant.compareAtPrice.amount) >
              Number.parseFloat(selectedVariant.price.amount) ? (
              <span className="text-lg text-neutral-500 line-through">
                {formatPrice(selectedVariant.compareAtPrice)}
              </span>
            ) : null}
            <span className="text-2xl font-semibold text-neutral-900">
              {formatPrice(selectedVariant.price)}
            </span>
          </div>
        ) : null}
        {lowStock ? (
          <p className="mt-2 text-sm font-medium text-[var(--unmade-accent)]">
            {t("product.lowStock", { count: qtyAvail })}
          </p>
        ) : null}
      </div>

      {showSelector ? (
        <VariantSelector
          key={product.id}
          product={product}
          onVariantChange={onVariantChange}
        />
      ) : null}

      <button
        type="button"
        disabled={!canAdd}
        onClick={() => {
          if (!selectedVariant) return;
          void (async () => {
            await addItem(selectedVariant.id, 1);
            openCart();
          })();
        }}
        className="w-full bg-neutral-900 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t("product.addToCart")}
      </button>
    </div>
  );
}
