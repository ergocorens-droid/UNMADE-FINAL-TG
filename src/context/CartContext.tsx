"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  cartCreate,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
  getCart,
} from "@/lib/shopify/api";
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
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const id = readStoredCartId();
      if (!id) return;

      setIsLoading(true);
      try {
        const next = await getCart(id);
        if (cancelled) return;
        if (!next) {
          writeStoredCartId(null);
          setCart(null);
        } else {
          setCart(next);
        }
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
  }, []);

  const resolveCartId = useCallback(() => {
    return cart?.id ?? readStoredCartId();
  }, [cart?.id]);

  const addItem = useCallback(
    async (variantId: string, quantity: number) => {
      setIsLoading(true);
      try {
        const cid = resolveCartId();
        if (!cid) {
          const newCart = await cartCreate([
            { merchandiseId: variantId, quantity },
          ]);
          setCart(newCart);
          writeStoredCartId(newCart.id);
          return;
        }
        const next = await cartLinesAdd(cid, [
          { merchandiseId: variantId, quantity },
        ]);
        setCart(next);
      } finally {
        setIsLoading(false);
      }
    },
    [resolveCartId],
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      const cid = resolveCartId();
      if (!cid) return;

      setIsLoading(true);
      try {
        if (quantity < 1) {
          const next = await cartLinesRemove(cid, [lineId]);
          setCart(next);
          return;
        }
        const next = await cartLinesUpdate(cid, [{ id: lineId, quantity }]);
        setCart(next);
      } finally {
        setIsLoading(false);
      }
    },
    [resolveCartId],
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      const cid = resolveCartId();
      if (!cid) return;

      setIsLoading(true);
      try {
        const next = await cartLinesRemove(cid, [lineId]);
        setCart(next);
      } finally {
        setIsLoading(false);
      }
    },
    [resolveCartId],
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
