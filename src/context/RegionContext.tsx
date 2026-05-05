"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { ProductColorSlug } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD_PLN } from "@/data/products";
import {
  colorLabel as colorLabelFn,
  translate,
  type MsgKey,
} from "@/i18n/strings";
import { formatMoneyAmount } from "@/lib/money";
import type { Currency, Locale } from "@/lib/regions";

interface RegionContextValue {
  locale: Locale;
  currency: Currency;
  country: string;
  /** Kod języka dla Intl / atrybutów */
  intlLocale: string;
  formatMoney: (amountPln: number) => string;
  t: (key: MsgKey, vars?: Record<string, string | number>) => string;
  formatColorLabel: (color?: ProductColorSlug) => string;
  freeShippingThresholdPln: number;
}

const RegionContext = createContext<RegionContextValue | null>(null);

export function RegionProvider({
  locale,
  currency,
  country,
  children,
}: {
  locale: Locale;
  currency: Currency;
  country: string;
  children: ReactNode;
}) {
  const intlLocale = locale === "pl" ? "pl-PL" : "en-US";

  const value = useMemo<RegionContextValue>(
    () => ({
      locale,
      currency,
      country,
      intlLocale,
      formatMoney: (amountPln: number) =>
        formatMoneyAmount(amountPln, currency, intlLocale),
      t: (key, vars) => translate(locale, key, vars),
      formatColorLabel: (color) => colorLabelFn(locale, color),
      freeShippingThresholdPln: FREE_SHIPPING_THRESHOLD_PLN,
    }),
    [locale, currency, country, intlLocale],
  );

  return (
    <RegionContext.Provider value={value}>{children}</RegionContext.Provider>
  );
}

export function useRegion(): RegionContextValue {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within RegionProvider");
  return ctx;
}
