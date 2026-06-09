"use client";

import { useEffect, useMemo, useState } from "react";
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

export function VariantSelector({
  product,
  onVariantChange,
}: {
  product: Product;
  onVariantChange: (variant: ProductVariant | null) => void;
}) {
  const { t } = useT();
  const sizeOption =
    product.options.find((option) =>
      ["rozmiar", "size"].includes(option.name.toLowerCase()),
    ) ?? product.options.find((option) => option.values.length > 1);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {};
      for (const option of product.options) {
        if (option.values.length === 1) {
          initial[option.name] = option.values[0];
        }
      }
      return initial;
    },
  );
  const [openOptionId, setOpenOptionId] = useState<string | null>(null);

  const matched = findVariantForOptions(product, selectedOptions);
  const combinationUnavailable =
    matched !== null && !matched.availableForSale;
  const missingSelection = product.options.some(
    (option) => option.values.length > 1 && !selectedOptions[option.name],
  );

  useEffect(() => {
    if (matched && !missingSelection) {
      onVariantChange(matched);
    } else {
      onVariantChange(null);
    }
  }, [matched, missingSelection, onVariantChange]);

  const optionAvailability = useMemo(() => {
    const map = new Map<string, Map<string, ProductVariant | null>>();
    for (const option of product.options) {
      const values = new Map<string, ProductVariant | null>();
      for (const value of option.values) {
        values.set(
          value,
          findVariantForOptions(product, {
            ...selectedOptions,
            [option.name]: value,
          }),
        );
      }
      map.set(option.id, values);
    }
    return map;
  }, [product, selectedOptions]);

  if (product.options.length === 0) {
    return null;
  }

  const multiOption = product.options.some((o) => o.values.length > 1);
  if (!multiOption) {
    return null;
  }

  return (
    <div className="space-y-4">
      {product.options
        .filter((option) => option.values.length > 1)
        .map((option) => {
          const selectedValue = selectedOptions[option.name];
          const isOpen = openOptionId === option.id;
          const label =
            option.id === sizeOption?.id
              ? t("product.chooseSize")
              : option.name;

          return (
            <div key={option.id} className="relative">
              <button
                type="button"
                onClick={() => setOpenOptionId(isOpen ? null : option.id)}
                className={`flex min-h-12 w-full items-center justify-between border px-5 text-left text-sm transition ${
                  isOpen
                    ? "border-neutral-900 border-b-transparent"
                    : "border-neutral-400 hover:border-neutral-900"
                }`}
                aria-expanded={isOpen}
              >
                <span className="text-neutral-900">
                  {selectedValue || label}
                </span>
                <span
                  className={`text-xl leading-none transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  ˅
                </span>
              </button>

              {isOpen ? (
                <div className="border border-t-0 border-neutral-900 bg-white">
                  {option.values.map((value) => {
                    const v = optionAvailability.get(option.id)?.get(value) ?? null;
                    const unavailable = v !== null && !v.availableForSale;
                    const active = selectedValue === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        disabled={v === null}
                        onClick={() => {
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [option.name]: value,
                          }));
                          setOpenOptionId(null);
                        }}
                        className={`flex min-h-12 w-full items-center px-5 text-left text-sm transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-30 ${
                          active ? "font-bold text-neutral-950" : "text-neutral-700"
                        } ${unavailable ? "line-through opacity-50" : ""}`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      {combinationUnavailable ? (
        <p className="text-sm font-medium text-[var(--unmade-accent)]">
          {t("product.unavailable")}
        </p>
      ) : null}
    </div>
  );
}
