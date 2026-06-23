"use client";

import { useState } from "react";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfoAccordions } from "@/components/product/ProductInfoAccordions";
import type { Product, ProductVariant } from "@/lib/shopify/types";

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function initialVisualVariant(product: Product): ProductVariant | null {
  const colorOption = product.options.find((option) =>
    ["kolor", "color"].includes(normalize(option.name)),
  );
  if (!colorOption) return null;

  const collectionText = product.collections
    .map((collection) => `${collection.handle} ${collection.title}`)
    .join(" ");
  const normalizedCollections = normalize(collectionText);
  const wantsBlack = /\bblack\b|czarn/.test(normalizedCollections);
  const wantsWhite = /\bwhite\b|bial/.test(normalizedCollections);
  const preferredColor =
    colorOption.values.find((value) => {
      const normalized = normalize(value);
      if (wantsBlack) return /black|czarn/.test(normalized);
      if (wantsWhite) return /white|bial/.test(normalized);
      return /white|bial/.test(normalized);
    }) ?? colorOption.values[0];

  return (
    product.variants.find(
      (variant) =>
        variant.availableForSale &&
        variant.selectedOptions.some(
          (option) =>
            option.name === colorOption.name && option.value === preferredColor,
        ),
    ) ??
    product.variants.find((variant) =>
      variant.selectedOptions.some(
        (option) =>
          option.name === colorOption.name && option.value === preferredColor,
      ),
    ) ??
    null
  );
}

function ProductTrustSection({ className = "" }: { className?: string }) {
  const items = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M20 6 9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Kup teraz",
      accent: "wysy&#x142;amy z Polski w 24-48h",
      tone: "text-emerald-600",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M3 7h11v10H3V7Zm11 3h4l3 3v4h-7v-7Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      ),
      title: "InPost",
      accent: "kurier i paczkomaty InPost",
      tone: "text-neutral-950",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M4 12a8 8 0 0 1 13.66-5.66L20 8.68M20 4v4.68h-4.68M20 12a8 8 0 0 1-13.66 5.66L4 15.32M4 20v-4.68h4.68"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "&#x141;atwe zwroty",
      accent: "14 dni na zwrot",
      tone: "text-neutral-950",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="m12 3 2.75 5.57 6.15.9-4.45 4.34 1.05 6.12L12 17.04l-5.5 2.89 1.05-6.12L3.1 9.47l6.15-.9L12 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Wysoka jako&#x15B;&#x107;",
      accent: "",
      tone: "text-neutral-950",
    },
  ];

  return (
    <section
      className={`mt-6 border-y border-black/[0.08] py-5 md:mt-8 md:max-w-[620px] ${className}`}
    >
      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current ${item.tone}`}
              aria-hidden
            >
              {item.icon}
            </span>
            <p className="text-sm font-black uppercase tracking-[0.04em] text-neutral-950">
              <span dangerouslySetInnerHTML={{ __html: item.title }} />
              {item.accent ? (
                <>
                  <span> - </span>
                  <span
                    className={item.tone}
                    dangerouslySetInnerHTML={{ __html: item.accent }}
                  />
                </>
              ) : null}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProductPageClient({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant | null>(() => initialVisualVariant(product));

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div>
        <ProductGallery
          images={product.images}
          variants={product.variants}
          selectedVariant={selectedVariant}
          alt={product.title}
        />
        <ProductTrustSection className="hidden md:block" />
      </div>
      <div>
        <h1 className="border-b border-black/[0.06] pb-5 text-2xl font-black uppercase leading-tight tracking-normal text-neutral-950 sm:text-3xl lg:text-[34px]">
          {product.title}
        </h1>

        <ProductBuyBox
          key={product.id}
          product={product}
          onSelectedVariantChange={setSelectedVariant}
        />

        <ProductInfoAccordions html={product.descriptionHtml} />
        <ProductTrustSection className="md:hidden" />
      </div>
    </div>
  );
}
