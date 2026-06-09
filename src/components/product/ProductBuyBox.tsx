"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { VariantSelector } from "@/components/product/VariantSelector";
import { useT } from "@/i18n/I18nContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { trackEvent } from "@/lib/meta-pixel";
import type { Product, ProductVariant } from "@/lib/shopify/types";

const PAYMENT_METHODS = [
  { src: "/payments/blik.png", alt: "BLIK" },
  { src: "/payments/klarna.png", alt: "Klarna" },
  { src: "/payments/apple-pay.png", alt: "Apple Pay" },
  { src: "/payments/google-pay.png", alt: "Google Pay" },
] as const;

export function ProductBuyBox({ product }: { product: Product }) {
  const { t } = useT();
  const { addItem, openCart, isLoading } = useCart();

  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant | null>(null);
  const displayVariant =
    selectedVariant ??
    product.variants.find((v) => v.availableForSale) ??
    product.variants[0] ??
    null;

  const onVariantChange = useCallback((v: ProductVariant | null) => {
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
    <div className="space-y-8">
      <div className="border-b border-black/[0.06] py-6">
        {displayVariant ? (
          <div className="flex flex-wrap items-baseline gap-3">
            {displayVariant.compareAtPrice &&
            Number.parseFloat(displayVariant.compareAtPrice.amount) >
              Number.parseFloat(displayVariant.price.amount) ? (
              <span className="text-xl font-semibold text-neutral-500 line-through">
                {formatPrice(displayVariant.compareAtPrice)}
              </span>
            ) : null}
            <span className="text-3xl font-black text-neutral-950">
              {formatPrice(displayVariant.price)}
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

      <div className="space-y-1 border-y border-black/[0.06] py-3 text-xs uppercase tracking-[0.18em] text-neutral-700">
        <p className="font-black text-neutral-950">Made in Poland</p>
        <p>{t("product.shippingInfo")}</p>
        <p>{t("product.freeShippingInfo")}</p>
      </div>

      <button
        type="button"
        disabled={!canAdd}
        onClick={() => {
          if (!selectedVariant) return;
          void (async () => {
            await addItem(selectedVariant.id, 1);
            trackEvent("AddToCart", {
              content_ids: [selectedVariant.id],
              content_name: product.title,
              content_type: "product",
              value: Number.parseFloat(selectedVariant.price.amount),
              currency: selectedVariant.price.currencyCode,
            });
            openCart();
          })();
        }}
        className="w-full bg-neutral-950 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t("product.addToCart")}
      </button>

      <div
        className="grid grid-cols-4 items-center border-y border-black/[0.06] bg-white"
        aria-label="Dostępne metody płatności"
      >
        {PAYMENT_METHODS.map((method) => (
          <div
            key={method.alt}
            className="flex h-14 items-center justify-center border-r border-black/[0.06] last:border-r-0"
          >
            <Image
              src={method.src}
              alt={method.alt}
              width={140}
              height={44}
              className="h-9 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
