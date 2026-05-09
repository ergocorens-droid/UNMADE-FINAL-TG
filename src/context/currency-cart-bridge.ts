"use client";

export type CurrencyCartBridge = {
  totalQuantity: number;
  clear: () => void;
};

/** Rejestrowany przez `CartProvider` — pozwala `CurrencyProvider` (rodzic) ostrzegac i czyścić koszyk. */
export const currencyCartBridge: { current: CurrencyCartBridge | null } = {
  current: null,
};

export function registerCurrencyCartBridge(api: CurrencyCartBridge | null) {
  currencyCartBridge.current = api;
}
