"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
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

function isCapProduct(product: Product): boolean {
  const text = `${product.title} ${product.handle} ${product.tags.join(" ")} ${product.collections
    .map((collection) => `${collection.handle} ${collection.title}`)
    .join(" ")}`.toLowerCase();

  return (
    text.includes("baseball-cap") ||
    text.includes("baseball cap") ||
    text.includes("czapka") ||
    text.includes("czapki") ||
    text.includes("cap")
  );
}

function isApparelWithColorProduct(product: Product): boolean {
  const text = `${product.title} ${product.handle} ${product.tags.join(" ")} ${product.collections
    .map((collection) => `${collection.handle} ${collection.title}`)
    .join(" ")}`.toLowerCase();

  return (
    text.includes("t-shirt") ||
    text.includes("tshirt") ||
    text.includes("tee") ||
    text.includes("koszul") ||
    text.includes("hoodie") ||
    text.includes("bluza") ||
    text.includes("bluzy")
  );
}

function hasColorOption(product: Product): boolean {
  return product.options.some((option) =>
    ["kolor", "color"].includes(option.name.toLowerCase()),
  );
}

function savingsPercent(variant: ProductVariant | null): number | null {
  if (!variant?.compareAtPrice) return null;
  const oldPrice = Number.parseFloat(variant.compareAtPrice.amount);
  const price = Number.parseFloat(variant.price.amount);
  if (!Number.isFinite(oldPrice) || !Number.isFinite(price) || oldPrice <= price) {
    return null;
  }
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function ProductBuyBox({
  product,
  onSelectedVariantChange,
}: {
  product: Product;
  onSelectedVariantChange?: (variant: ProductVariant | null) => void;
}) {
  const { t } = useT();
  const { addItem, openCart, isLoading } = useCart();
  const bypassVariantSelection = product.handle === "test1" || isCapProduct(product);
  const allowColorSelection = isApparelWithColorProduct(product);
  const productHasColorOption = allowColorSelection && hasColorOption(product);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    () =>
      bypassVariantSelection
        ? (product.variants.find((variant) => variant.availableForSale) ??
          product.variants[0] ??
          null)
        : null,
  );
  const [quantity, setQuantity] = useState(1);
  const [selectionNotice, setSelectionNotice] = useState(false);
  const displayVariant =
    selectedVariant ??
    product.variants.find((v) => v.availableForSale) ??
    product.variants[0] ??
    null;

  const onVariantChange = useCallback((v: ProductVariant | null) => {
    setSelectedVariant(v);
    if (v) setSelectionNotice(false);
  }, []);

  useEffect(() => {
    if (selectedVariant || bypassVariantSelection) {
      onSelectedVariantChange?.(selectedVariant);
    }
  }, [bypassVariantSelection, onSelectedVariantChange, selectedVariant]);

  const showSelector =
    !bypassVariantSelection && product.options.some((o) => o.values.length > 1);

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
  const needsVariantSelection = selectedVariant === null;
  const percentSaved = savingsPercent(displayVariant);

  return (
    <div className="space-y-6">
      <div className="border-b border-black/[0.06] py-5">
        {displayVariant ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-3xl font-black text-neutral-950">
              {formatPrice(displayVariant.price)}
            </span>
            {displayVariant.compareAtPrice &&
            Number.parseFloat(displayVariant.compareAtPrice.amount) >
              Number.parseFloat(displayVariant.price.amount) ? (
              <span className="text-base font-semibold text-neutral-400 line-through">
                {formatPrice(displayVariant.compareAtPrice)}
              </span>
            ) : null}
            {percentSaved ? (
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-neutral-950">
                Oszczedzasz {percentSaved}%
              </span>
            ) : null}
          </div>
        ) : null}
        {lowStock ? (
          <p className="mt-2 text-sm font-medium text-[var(--unmade-accent)]">
            {t("product.lowStock", { count: qtyAvail })}
          </p>
        ) : null}
      </div>

      {false && !productHasColorOption && !bypassVariantSelection ? (
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
              Kolor
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-950">
              Wariant wkrótce
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white transition hover:border-neutral-500"
              aria-label="Kolor: biały"
            >
              <span className="h-7 w-7 rounded-full border border-black/10 bg-white" />
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white transition hover:border-neutral-500"
              aria-label="Kolor: czarny"
            >
              <span className="h-7 w-7 rounded-full border border-black/10 bg-neutral-950" />
            </button>
          </div>
        </div>
      ) : null}

      {showSelector ? (
        <VariantSelector
          key={product.id}
          product={product}
          enableColorOptions={productHasColorOption}
          onVariantChange={onVariantChange}
          onVisualVariantChange={onSelectedVariantChange}
        />
      ) : null}

      <div className="space-y-1 rounded-2xl border border-black/[0.06] bg-neutral-50 px-4 py-3 text-xs uppercase tracking-[0.18em] text-neutral-700">
        <p className="font-black text-neutral-950">Made in Poland</p>
        <p>{t("product.shippingInfo")}</p>
      </div>

      <div className="space-y-2">
        {selectionNotice ? (
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-red-600 sm:hidden">
            Wybierz najpierw rozmiar
          </p>
        ) : selectedVariant && !selectedVariant.availableForSale ? (
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-red-600 sm:hidden">
            Ten wariant jest niedostępny
          </p>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex h-14 overflow-hidden rounded-2xl border border-black/15 bg-white sm:w-36">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex w-12 items-center justify-center bg-neutral-100 text-xl font-black text-neutral-950 transition hover:bg-neutral-200"
            aria-label="Zmniejsz ilość"
          >
            -
          </button>
          <span className="flex flex-1 items-center justify-center text-sm font-black tabular-nums text-neutral-950">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex w-12 items-center justify-center bg-neutral-100 text-xl font-black text-neutral-950 transition hover:bg-neutral-200"
            aria-label="Zwiększ ilość"
          >
            +
          </button>
        </div>

          <div className="flex-1 space-y-2">
            {selectionNotice ? (
              <p className="hidden text-center text-xs font-semibold uppercase tracking-[0.14em] text-red-600 sm:block">
                Wybierz najpierw rozmiar
              </p>
            ) : selectedVariant && !selectedVariant.availableForSale ? (
              <p className="hidden text-center text-xs font-semibold uppercase tracking-[0.14em] text-red-600 sm:block">
                Ten wariant jest niedostępny
              </p>
            ) : null}

        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            if (needsVariantSelection) {
              setSelectionNotice(true);
              return;
            }
            if (!canAdd || !selectedVariant) return;
            void (async () => {
              await addItem(selectedVariant.id, quantity);
              trackEvent("AddToCart", {
                content_ids: [selectedVariant.id],
                content_name: product.title,
                content_type: "product",
                value:
                  Number.parseFloat(selectedVariant.price.amount) * quantity,
                currency: selectedVariant.price.currencyCode,
              });
              openCart();
            })();
          }}
          className="min-h-14 w-full rounded-2xl bg-neutral-950 px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-neutral-800 disabled:cursor-wait disabled:opacity-80"
        >
          {t("product.addToCart")}
          </button>

            <p className="hidden text-center text-xs uppercase tracking-[0.18em] text-neutral-700 sm:block">
              {t("product.freeShippingInfo")}
            </p>
          </div>
        </div>

        <p className="text-center text-xs uppercase tracking-[0.18em] text-neutral-700 sm:hidden">
          {t("product.freeShippingInfo")}
        </p>
      </div>

      <div className="rounded-2xl border border-black/[0.08] bg-white p-3">
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-neutral-950">
            Dodaj do koszyka minimum
            <span className="text-base leading-none text-neutral-500" aria-hidden>
              ↓
            </span>
          </p>
        </div>
        <div className="grid gap-2 text-xs uppercase tracking-[0.14em] text-neutral-700 sm:grid-cols-3">
          <div className="rounded-xl bg-neutral-100 px-3 py-3">
            <p className="font-black text-neutral-950">2 produkty</p>
            <p className="mt-1">-25% na drugi</p>
          </div>
          <div className="rounded-xl bg-neutral-50 px-3 py-3">
            <p className="font-black text-neutral-950">3 produkty</p>
            <p className="mt-1">-50% na trzeci</p>
          </div>
          <div className="rounded-xl bg-neutral-50 px-3 py-3">
            <p className="font-black text-neutral-950">4 produkty</p>
            <p className="mt-1">czwarty gratis</p>
          </div>
        </div>
        <p className="mt-3 px-1 text-[11px] uppercase leading-relaxed tracking-[0.14em] text-neutral-500">
          Promocja obejmuje koszulki, bluzy i czapki. Rabat nalicza się automatycznie.
        </p>
      </div>

      <div
        className="grid grid-cols-4 items-center overflow-hidden rounded-2xl border border-black/[0.06] bg-white"
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
