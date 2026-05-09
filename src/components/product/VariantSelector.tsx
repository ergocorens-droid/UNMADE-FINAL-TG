"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/I18nContext";
import type { Product, ProductVariant } from "@/lib/shopify/types";

function matchesVariant(
  variant: ProductVariant,
  selected: Record<string, string>,
): boolean {
  return variant.selectedOptions.every(
    (opt) => selected[opt.name] === opt.value,
  );
}

function findVariantForOptions(
  product: Product,
  selected: Record<string, string>,
): ProductVariant | null {
  return product.variants.find((v) => matchesVariant(v, selected)) ?? null;
}

function initialOptionsFromProduct(product: Product): Record<string, string> {
  const firstAvail =
    product.variants.find((v) => v.availableForSale) ?? product.variants[0];
  const rec: Record<string, string> = {};
  if (firstAvail) {
    for (const o of firstAvail.selectedOptions) {
      rec[o.name] = o.value;
    }
  }
  return rec;
}

export function VariantSelector({
  product,
  onVariantChange,
}: {
  product: Product;
  onVariantChange: (variant: ProductVariant) => void;
}) {
  const { t } = useT();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => initialOptionsFromProduct(product),
  );

  const matched = findVariantForOptions(product, selectedOptions);
  const combinationUnavailable =
    matched !== null && !matched.availableForSale;

  useEffect(() => {
    if (matched) {
      onVariantChange(matched);
    }
  }, [matched, onVariantChange]);

  if (product.options.length === 0) {
    return null;
  }

  const multiOption = product.options.some((o) => o.values.length > 1);
  if (!multiOption) {
    return null;
  }

  return (
    <div className="space-y-6">
      {product.options.map((option) => (
        <div key={option.id}>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-neutral-600">
            {option.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const next = { ...selectedOptions, [option.name]: value };
              const v = findVariantForOptions(product, next);
              const disabledCombo = v !== null && !v.availableForSale;
              const active = selectedOptions[option.name] === value;
              return (
                <button
                  key={value}
                  type="button"
                  disabled={v === null}
                  onClick={() =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [option.name]: value,
                    }))
                  }
                  className={`min-w-[2.5rem] rounded border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    active
                      ? "border-neutral-900 ring-2 ring-neutral-900"
                      : "border-neutral-300 text-neutral-800"
                  } ${
                    disabledCombo
                      ? "line-through opacity-50"
                      : "hover:border-neutral-900"
                  } disabled:cursor-not-allowed disabled:opacity-30`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {combinationUnavailable ? (
        <p className="text-sm font-medium text-[var(--unmade-accent)]">
          {t("product.unavailable")}
        </p>
      ) : null}
    </div>
  );
}
