"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  cartCreate,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
  getCart,
} from "@/lib/shopify/storefront-cart-client";
import { registerCurrencyCartBridge } from "@/context/currency-cart-bridge";
import { useCurrency } from "@/context/CurrencyContext";
import { CURRENCIES, currencyToCountryCode } from "@/lib/shopify/markets";
import type { Cart } from "@/lib/shopify/types";

const CART_ID_KEY = "unmade_cart_id";

function readStoredCartId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CART_ID_KEY);
}

function writeStoredCartId(id: string | null) {
  if (typeof window === "undefined") return;
  if (id) localStorage.setItem(CART_ID_KEY, id);
  else localStorage.removeItem(CART_ID_KEY);
}

interface CartContextValue {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  totalQuantity: number;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { currency } = useCurrency();
  const country = currencyToCountryCode(currency);

  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clear = useCallback(() => {
    writeStoredCartId(null);
    setCart(null);
  }, []);

  const bridgeApi = useRef({
    totalQuantity: 0,
    clear: () => {},
  });
  bridgeApi.current.totalQuantity = cart?.totalQuantity ?? 0;
  bridgeApi.current.clear = clear;

  useEffect(() => {
    registerCurrencyCartBridge(bridgeApi.current);
    return () => registerCurrencyCartBridge(null);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const id = readStoredCartId();
      if (!id) {
        if (!cancelled) setCart(null);
        return;
      }

      setIsLoading(true);
      try {
        const next = await getCart(id, country);
        if (cancelled) return;
        if (!next) {
          writeStoredCartId(null);
          setCart(null);
          return;
        }
        const expectedCode = CURRENCIES[currency].code;
        if (next.cost.totalAmount.currencyCode !== expectedCode) {
          writeStoredCartId(null);
          setCart(null);
          return;
        }
        setCart(next);
      } catch {
        if (!cancelled) {
          writeStoredCartId(null);
          setCart(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, [currency, country]);

  const resolveCartId = useCallback(() => {
    return cart?.id ?? readStoredCartId();
  }, [cart?.id]);

  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      setIsLoading(true);
      try {
        const cid = resolveCartId();
        if (!cid) {
          const newCart = await cartCreate(country, [
            { merchandiseId: variantId, quantity },
          ]);
          setCart(newCart);
          writeStoredCartId(newCart.id);
          return;
        }
        const next = await cartLinesAdd(
          cid,
          [{ merchandiseId: variantId, quantity }],
          country,
        );
        setCart(next);
      } finally {
        setIsLoading(false);
      }
    },
    [resolveCartId, country],
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      const cid = resolveCartId();
      if (!cid) return;

      setIsLoading(true);
      try {
        if (quantity < 1) {
          const next = await cartLinesRemove(cid, [lineId], country);
          setCart(next);
          return;
        }
        const next = await cartLinesUpdate(
          cid,
          [{ id: lineId, quantity }],
          country,
        );
        setCart(next);
      } finally {
        setIsLoading(false);
      }
    },
    [resolveCartId, country],
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      const cid = resolveCartId();
      if (!cid) return;

      setIsLoading(true);
      try {
        const next = await cartLinesRemove(cid, [lineId], country);
        setCart(next);
      } finally {
        setIsLoading(false);
      }
    },
    [resolveCartId, country],
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((o) => !o), []);

  const totalQuantity = cart?.totalQuantity ?? 0;

  const value = useMemo(
    () => ({
      cart,
      isOpen,
      isLoading,
      totalQuantity,
      addItem,
      updateItem,
      removeItem,
      clear,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      cart,
      isOpen,
      isLoading,
      totalQuantity,
      addItem,
      updateItem,
      removeItem,
      clear,
      openCart,
      closeCart,
      toggleCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
