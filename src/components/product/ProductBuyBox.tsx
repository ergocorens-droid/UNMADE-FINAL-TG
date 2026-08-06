"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { VariantSelector } from "@/components/product/VariantSelector";
import { useT } from "@/i18n/I18nContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { trackEvent } from "@/lib/meta-pixel";
import { isTshirtProduct } from "@/lib/product-pricing";
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

function isTshirtCartProduct(product: { handle: string; title: string }): boolean {
  const text = `${product.handle} ${product.title}`.toLowerCase();
  return (
    text.includes("t-shirts") ||
    text.includes("t-shirt") ||
    text.includes("tshirt") ||
    text.includes("tee") ||
    text.includes("koszul")
  );
}

export function ProductBuyBox({
  product,
  onSelectedVariantChange,
}: {
  product: Product;
  onSelectedVariantChange?: (variant: ProductVariant | null) => void;
}) {
  const { t } = useT();
  const { addItem, openCart, isLoading, cart } = useCart();
  const bypassVariantSelection = product.handle === "test1" || isCapProduct(product);
  const allowColorSelection = isApparelWithColorProduct(product);
  const productHasColorOption = allowColorSelection && hasColorOption(product);
  const showTshirtPromotion = isTshirtProduct(product);
  const tshirtCartQuantity =
    cart?.lines.reduce((quantity, line) => {
      if (!isTshirtCartProduct(line.merchandise.product)) return quantity;
      return quantity + line.quantity;
    }, 0) ?? 0;
  const activePromoStep =
    tshirtCartQuantity >= 3 ? 3 : tshirtCartQuantity === 2 ? 2 : 1;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    () =>
      bypassVariantSelection
        ? (product.variants.find((variant) => variant.availableForSale) ??
          product.variants[0] ??
          null)
        : null,
  );
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

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="border-b border-black/[0.06] pb-3 pt-0 sm:py-3.5">
        {displayVariant ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl font-black text-neutral-950 sm:text-[28px]">
              {formatPrice(displayVariant.price)}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.07em] sm:text-[9px]"
              style={{
                backgroundColor: "#EAF8F1",
                borderColor: "#B8E6CF",
                color: "#0B7A4B",
              }}
            >
              <span aria-hidden>✓</span>
              {t("product.freeShippingBadge")}
            </span>
          </div>
        ) : null}
        {lowStock ? (
          <p className="mt-2 text-sm font-medium text-[var(--unmade-accent)]">
            {t("product.lowStock", { count: qtyAvail })}
          </p>
        ) : null}
      </div>

      {showTshirtPromotion ? (
        <section
          className="overflow-hidden rounded-xl border border-[#D3D3D3] bg-white sm:rounded-lg"
          style={{
            borderColor: "#D3D3D3",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.07)",
          }}
          aria-label={t("product.promoTitle")}
        >
          <div
            className="border-b px-4 py-3.5 sm:py-2.5"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#D9D9D9" }}
          >
            <div>
              <p className="text-sm font-black uppercase tracking-[0.07em] text-[#111111] sm:tracking-[0.08em]">
                {t("product.promoTitle")}
              </p>
              <p className="mt-1 text-[11px] font-medium leading-relaxed text-[#6B6B6B]">
                {t("product.promoBody")}
              </p>
            </div>
          </div>

          <div
            className="divide-x-2 divide-[#D9D9D9]"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            }}
          >
            <div
              className={`relative flex min-h-[82px] flex-col justify-center px-1.5 py-3 text-center transition-colors sm:min-h-[64px] sm:px-2 sm:py-2.5 ${
                activePromoStep === 1 ? "bg-[#FAFAFA]" : "bg-white"
              }`}
              style={{
                backgroundColor: activePromoStep === 1 ? "#FAFAFA" : "#FFFFFF",
              }}
              aria-current={activePromoStep === 1 ? "step" : undefined}
            >
              <span
                className={`absolute inset-x-0 top-0 h-[3px] sm:h-0.5 ${
                  activePromoStep === 1 ? "bg-[#D2D2D2]" : "bg-[#D9D9D9]"
                }`}
                style={{
                  backgroundColor: activePromoStep === 1 ? "#D2D2D2" : "#D9D9D9",
                }}
                aria-hidden
              />
              <p
                className="text-[11px] font-black uppercase leading-tight text-[#111111]"
                style={{ wordSpacing: "0.18em" }}
              >
                {t("product.promoOne")}
              </p>
              <p
                className={`mt-1.5 whitespace-nowrap text-[8px] font-black uppercase leading-tight tracking-[0.02em] sm:text-[9px] sm:tracking-[0.03em] ${
                  activePromoStep === 1 ? "text-[#6B6B6B]" : "text-[#6B6B6B]"
                }`}
              >
                {tshirtCartQuantity >= 1
                  ? t("product.promoOneSelected")
                  : t("product.promoOneDetail")}
              </p>
            </div>
            <div
              className={`relative flex min-h-[82px] flex-col justify-center px-1.5 py-3 text-center transition-colors sm:min-h-[64px] sm:px-2 sm:py-2.5 ${
                activePromoStep === 2 ? "bg-[#E8F3ED]" : "bg-[#F2F2F2]"
              }`}
              style={{
                backgroundColor: activePromoStep === 2 ? "#E4F2EA" : "#F2F2F2",
              }}
              aria-current={activePromoStep === 2 ? "step" : undefined}
            >
              <span
                className={`absolute inset-x-0 top-0 h-[3px] sm:h-0.5 ${
                  activePromoStep === 2 ? "bg-[#4F8069]" : "bg-[#8A8A8A]"
                }`}
                style={{
                  backgroundColor: activePromoStep === 2 ? "#4F8069" : "#8A8A8A",
                }}
                aria-hidden
              />
              <p
                className="text-[11px] font-black uppercase leading-tight text-[#111111]"
                style={{ wordSpacing: "0.18em" }}
              >
                {t("product.promoTwo")}
              </p>
              <p
                className={`mt-1.5 text-[9px] font-black uppercase leading-tight tracking-[0.03em] ${
                  activePromoStep === 2 ? "text-[#111111]" : "text-[#6B6B6B]"
                }`}
                style={{ color: activePromoStep === 2 ? "#2F5F49" : "#4A4A4A" }}
              >
                {tshirtCartQuantity >= 2
                  ? t("product.promoTwoSelected")
                  : tshirtCartQuantity === 1
                    ? t("product.promoTwoNext")
                    : t("product.promoTwoDetail")}
              </p>
            </div>
            <div
              className={`relative flex min-h-[82px] flex-col justify-center px-1.5 py-3 text-center transition-colors sm:min-h-[64px] sm:px-2 sm:py-2.5 ${
                activePromoStep === 3 ? "bg-[#DDF4E8]" : "bg-[#EAF8F1]"
              }`}
              style={{
                backgroundColor: activePromoStep === 3 ? "#D8F1E4" : "#E5F7EE",
              }}
              aria-current={activePromoStep === 3 ? "step" : undefined}
            >
              <span
                className={`absolute inset-x-0 top-0 h-[3px] sm:h-0.5 ${
                  activePromoStep === 3 ? "bg-[#0B7A4B]" : "bg-[#7FC5A1]"
                }`}
                style={{
                  backgroundColor: activePromoStep === 3 ? "#0B7A4B" : "#7FC5A1",
                }}
                aria-hidden
              />
              <p
                className="text-[11px] font-black uppercase leading-tight text-[#111111]"
                style={{ color: "#0B7A4B", wordSpacing: "0.18em" }}
              >
                {t("product.promoThree")}
              </p>
              <p
                className={`mt-1.5 text-[9px] font-black uppercase leading-tight tracking-[0.03em] transition-colors ${
                  activePromoStep === 3 ? "text-[#0B7A4B]" : "text-[#6B6B6B]"
                }`}
                style={{ color: activePromoStep === 3 ? "#075E3A" : "#0B7A4B" }}
              >
                {tshirtCartQuantity === 2
                  ? t("product.promoThreeNext")
                  : t("product.promoThreeDetail")}
              </p>
            </div>
          </div>
        </section>
      ) : null}

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

      <div className="space-y-2">
        {selectionNotice ? (
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-red-600">
            Wybierz najpierw rozmiar
          </p>
        ) : selectedVariant && !selectedVariant.availableForSale ? (
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-red-600">
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
          className="min-h-12 w-full bg-neutral-950 px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-neutral-800 disabled:cursor-wait disabled:opacity-80"
        >
          {t("product.addToCart")}
        </button>
      </div>

      <div className="space-y-1 border-y border-black/[0.06] py-2.5 text-[11px] uppercase tracking-[0.16em] text-neutral-700">
        <p className="font-black text-neutral-950">Made in Poland</p>
        <p>{t("product.shippingInfo")}</p>
        <p className="flex items-center gap-2 pt-1">
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-black"
            style={{ backgroundColor: "#EAF8F1", color: "#0B7A4B" }}
            aria-hidden
          >
            ✓
          </span>
          <span
            className="font-black tracking-[0.12em]"
            style={{ color: "#0B7A4B" }}
          >
            {t("product.freeShippingInfo")}
          </span>
        </p>
      </div>

      <div
        className="grid grid-cols-4 items-center overflow-hidden border border-black/[0.06] bg-white"
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
