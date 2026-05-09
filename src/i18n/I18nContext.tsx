"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { localeFromCurrency, type Locale } from "@/i18n/config";
import { translate, type TranslationKey } from "@/i18n/translate";

type I18nContextValue = {
  locale: Locale;
  t: (
    key: TranslationKey,
    vars?: Record<string, string | number>,
  ) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { currency } = useCurrency();
  const locale = localeFromCurrency(currency);
  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: (key, vars) => translate(locale, key, vars),
    }),
    [locale],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useT(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useT must be used within I18nProvider");
  return ctx;
}
