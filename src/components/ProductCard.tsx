"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useT } from "@/i18n/I18nContext";
import { formatPrice } from "@/lib/format";
import type { Image as ShopifyImage, Product, ProductOption } from "@/lib/shopify/types";

const SIZES =
  "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isColorOption(option: ProductOption): boolean {
  return ["kolor", "color"].includes(normalize(option.name));
}

function isBlackValue(value: string): boolean {
  return /black|czarn/.test(normalize(value));
}

function isWhiteValue(value: string): boolean {
  return /white|bial/.test(normalize(value));
}

function colorLabel(value: string): string {
  if (isBlackValue(value)) return "Czarny";
  if (isWhiteValue(value)) return "Bialy";
  return value;
}

function colorDotClass(value: string): string {
  if (isBlackValue(value)) return "bg-neutral-950";
  if (isWhiteValue(value)) return "bg-white";
  return "bg-neutral-300";
}

function productImageForColor(product: Product, color: string): ShopifyImage | null {
  const colorIndex = isBlackValue(color) ? 1 : 0;
  const imageByPosition = product.images[colorIndex];
  if (imageByPosition?.url) return imageByPosition;

  const variantImage = product.variants.find((variant) =>
    variant.selectedOptions.some(
      (option) =>
        ["kolor", "color"].includes(normalize(option.name)) &&
        normalize(option.value) === normalize(color),
    ),
  )?.image;

  return variantImage ?? product.featuredImage;
}

export function ProductCard({ product }: { product: Product }) {
  const { t } = useT();
  const colorOption = product.options.find(
    (option) => isColorOption(option) && option.values.length > 1,
  );
  const colors = colorOption?.values ?? [];
  const defaultColor =
    colors.find((value) => isWhiteValue(value)) ?? colors[0] ?? null;
  const [selectedColor, setSelectedColor] = useState<string | null>(defaultColor);
  const selectedImage = useMemo(
    () =>
      selectedColor
        ? productImageForColor(product, selectedColor)
        : product.featuredImage,
    [product, selectedColor],
  );
  const img = selectedImage?.url ?? product.featuredImage?.url;
  const price = product.priceRange.minVariantPrice;
  const showPrice = Boolean(price);
  const href = `/produkt/${product.handle}`;

  return (
    <article
      className="group block border-b border-r border-black/[0.06] bg-white outline-none transition-colors duration-300 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
    >
      <Link href={href} className="block">
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
      </Link>
      <div className="min-h-[88px] border-t border-black/[0.06] bg-white px-3 py-3 md:px-4">
        <Link
          href={href}
          className="flex items-start justify-between gap-4 hover:text-neutral-700"
        >
          <p className="line-clamp-2 text-xs font-black uppercase leading-tight tracking-normal text-neutral-950 md:text-sm">
            {product.title}
          </p>
          <div className="flex shrink-0 flex-wrap items-baseline justify-end gap-2 text-right">
            {!showPrice ? (
              <span className="text-xs font-semibold uppercase text-neutral-500 md:text-sm">
                {t("product.unavailableInRegion")}
              </span>
            ) : (
              <span className="text-xs font-semibold uppercase text-neutral-950 md:text-sm">
                {formatPrice(price!)}
              </span>
            )}
          </div>
        </Link>
        {colors.length > 1 ? (
          <div
            className="mt-3 flex items-center gap-1.5"
            aria-label="Dostępne kolory"
          >
            {colors.map((color) => {
              const active = selectedColor === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
                    active
                      ? "border-neutral-950 bg-white"
                      : isWhiteValue(color)
                        ? "border-neutral-950 bg-white hover:border-neutral-700"
                        : "border-black/10 hover:border-neutral-500"
                  }`}
                  aria-label={`Kolor: ${colorLabel(color)}`}
                  title={colorLabel(color)}
                >
                  <span
                    className={`h-3.5 w-3.5 rounded-full ${
                      isWhiteValue(color)
                        ? "border border-neutral-950 bg-white"
                        : `border border-black/10 ${colorDotClass(color)}`
                    }`}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </article>
  );
}
