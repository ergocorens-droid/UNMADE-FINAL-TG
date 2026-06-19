"use client";

import { useEffect, useMemo, useState } from "react";
import { useT } from "@/i18n/I18nContext";
import type { Product, ProductOption, ProductVariant } from "@/lib/shopify/types";

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

function matchesPartialSelection(
  variant: ProductVariant,
  selected: Record<string, string>,
): boolean {
  return Object.entries(selected).every(([name, value]) =>
    variant.selectedOptions.some((opt) => opt.name === name && opt.value === value),
  );
}

function findVariantForPartialOptions(
  product: Product,
  selected: Record<string, string>,
): ProductVariant | null {
  return (
    product.variants.find(
      (variant) =>
        variant.availableForSale && matchesPartialSelection(variant, selected),
    ) ??
    product.variants.find((variant) => matchesPartialSelection(variant, selected)) ??
    null
  );
}

function isSizeOption(option: ProductOption): boolean {
  return ["rozmiar", "size"].includes(option.name.toLowerCase());
}

function isColorOption(option: ProductOption): boolean {
  return ["kolor", "color"].includes(option.name.toLowerCase());
}

function isWhiteValue(value: string): boolean {
  const v = value.toLowerCase();
  return (
    ["bialy", "biale", "white", "bia"].some((x) => v.includes(x)) &&
    !v.includes("black")
  );
}

function colorClass(value: string): string {
  const v = value.toLowerCase();
  if (["bialy", "biale", "white", "biały", "białe"].some((x) => v.includes(x))) {
    return "bg-white";
  }
  if (["czarny", "czarne", "black"].some((x) => v.includes(x))) {
    return "bg-neutral-950";
  }
  if (["blue", "niebieski", "baby"].some((x) => v.includes(x))) {
    return "bg-[#b7d8ef]";
  }
  if (["pink", "roz", "róż"].some((x) => v.includes(x))) {
    return "bg-[#f0a9c0]";
  }
  return "bg-neutral-200";
}

function colorLabel(value: string): string {
  const v = value.toLowerCase();
  if (
    ["bialy", "biale", "white", "bia", "bi"].some((x) => v.includes(x)) &&
    !v.includes("black")
  ) {
    return "BIAŁY";
  }
  if (["czarny", "czarne", "black"].some((x) => v.includes(x))) {
    return "CZARNY";
  }
  return value.toUpperCase();
}

export function VariantSelector({
  product,
  enableColorOptions = true,
  onVariantChange,
}: {
  product: Product;
  enableColorOptions?: boolean;
  onVariantChange: (variant: ProductVariant | null) => void;
}) {
  const { t } = useT();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {};
      for (const option of product.options) {
        if (option.values.length === 1) {
          initial[option.name] = option.values[0];
        } else if (enableColorOptions && isColorOption(option)) {
          initial[option.name] =
            option.values.find((value) => isWhiteValue(value)) ??
            option.values[0];
        }
      }
      return initial;
    },
  );

  const matched = findVariantForOptions(product, selectedOptions);
  const combinationUnavailable =
    matched !== null && !matched.availableForSale;
  const visibleOptions = product.options.filter(
    (option) =>
      option.values.length > 1 && (enableColorOptions || !isColorOption(option)),
  );
  const missingSelection = visibleOptions.some(
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
          findVariantForPartialOptions(product, {
            ...selectedOptions,
            [option.name]: value,
          }),
        );
      }
      map.set(option.id, values);
    }
    return map;
  }, [product, selectedOptions]);

  if (visibleOptions.length === 0) return null;

  return (
    <div className="space-y-5">
      {visibleOptions.map((option) => {
        const selectedValue = selectedOptions[option.name];
        const color = isColorOption(option);
        const size = isSizeOption(option);
        const label = size ? t("product.chooseSize") : option.name;

        return (
          <div key={option.id}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                {color ? "Kolor" : label}
              </p>
              {selectedValue ? (
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-950">
                  {color ? colorLabel(selectedValue) : selectedValue}
                </p>
              ) : null}
            </div>

            <div className={color ? "flex flex-wrap gap-2.5" : "grid grid-cols-4 gap-2 sm:flex sm:flex-wrap"}>
              {option.values.map((value) => {
                const v = optionAvailability.get(option.id)?.get(value) ?? null;
                const unavailable = v !== null && !v.availableForSale;
                const active = selectedValue === value;

                if (color) {
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
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-30 ${
                        active
                          ? "border-[#89bedd] bg-[#d9ecf8] shadow-[0_0_0_3px_rgba(217,236,248,0.95)]"
                          : "border-black/15 bg-white hover:border-[#89bedd] hover:bg-[#eef8fd]"
                      } ${unavailable ? "opacity-50" : ""}`}
                      aria-label={`${option.name}: ${value}`}
                    >
                      <span
                        className={`h-7 w-7 rounded-full border border-black/10 ${colorClass(value)}`}
                        aria-hidden
                      />
                    </button>
                  );
                }

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
                    className={`min-h-11 rounded-xl border px-4 text-sm font-bold uppercase transition disabled:cursor-not-allowed disabled:opacity-30 ${
                      active
                        ? "border-neutral-950 bg-[#d9ecf8] text-neutral-950"
                        : "border-black/15 bg-white text-neutral-900 hover:border-neutral-500"
                    } ${unavailable ? "line-through opacity-50" : ""}`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
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
