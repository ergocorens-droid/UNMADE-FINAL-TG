"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { currencyCartBridge } from "@/context/currency-cart-bridge";
import { CURRENCY_COOKIE, type CurrencyCode } from "@/lib/shopify/markets";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  isChanging: boolean;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const YEAR_SEC = 60 * 60 * 24 * 365;

export function CurrencyProvider({
  initialCurrency,
  children,
}: {
  initialCurrency: CurrencyCode;
  children: ReactNode;
}) {
  const router = useRouter();
  const [currency, setCurrencyState] = useState<CurrencyCode>(initialCurrency);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setCurrencyState(initialCurrency);
  }, [initialCurrency]);

  const setCurrency = useCallback(
    (newCurrency: CurrencyCode) => {
      if (newCurrency === currency) return;

      const api = currencyCartBridge.current;
      if (api && api.totalQuantity > 0) {
        const ok = window.confirm(
          "Zmiana waluty wyczyści koszyk. Kontynuować?",
        );
        if (!ok) return;
        api.clear();
      }

      document.cookie = `${CURRENCY_COOKIE}=${newCurrency}; path=/; max-age=${YEAR_SEC}; SameSite=Lax`;

      setCurrencyState(newCurrency);
      setIsChanging(true);

      router.refresh();

      window.setTimeout(() => {
        setIsChanging(false);
      }, 400);
    },
    [currency, router],
  );

  const value = useMemo(
    () => ({ currency, setCurrency, isChanging }),
    [currency, setCurrency, isChanging],
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx)
    throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
