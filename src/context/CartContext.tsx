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
  PRODUCT_BY_SLUG,
  type ProductColorSlug,
  type Size,
  SIZES,
} from "@/data/products";

const STORAGE_KEY = "unmade_cart";

export interface CartLine {
  id: string;
  productSlug: string;
  name: string;
  image: string;
  price: number;
  compareAt: number;
  size: Size;
  /** undefined = bluza lub legacy wpis */
  color?: ProductColorSlug;
  quantity: number;
}

function cartLineId(
  slug: string,
  size: Size,
  color?: ProductColorSlug,
): string {
  if (color) return `${slug}__${size}__${color}`;
  return `${slug}__${size}`;
}

function migrateCartLine(line: CartLine): CartLine {
  if (line.color !== undefined) return line;
  const parts = line.id.split("__");
  if (parts.length !== 2) return line;
  const [slug, sizeStr] = parts;
  if (!SIZES.includes(sizeStr as Size)) return line;
  const size = sizeStr as Size;
  const p = PRODUCT_BY_SLUG[slug];
  const color =
    p && p.category !== "bluzy" ? ("black" as ProductColorSlug) : undefined;
  return {
    ...line,
    id: cartLineId(slug, size, color),
    color,
  };
}

interface CartContextValue {
  lines: CartLine[];
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  compareSubtotal: number;
  addLine: (input: {
    productSlug: string;
    name: string;
    image: string;
    price: number;
    compareAt: number;
    size: Size;
    color?: ProductColorSlug;
    quantity?: number;
  }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeLine: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadFromStorage(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((line) => migrateCartLine(line));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let hydratedTimer: number | undefined;

    const raf = requestAnimationFrame(() => {
      setLines(loadFromStorage());
      hydratedTimer = window.setTimeout(() => setHydrated(true), 0);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (hydratedTimer !== undefined) window.clearTimeout(hydratedTimer);
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addLine = useCallback(
    (input: {
      productSlug: string;
      name: string;
      image: string;
      price: number;
      compareAt: number;
      size: Size;
      color?: ProductColorSlug;
      quantity?: number;
    }) => {
      const qty = input.quantity ?? 1;
      const id = cartLineId(input.productSlug, input.size, input.color);
      setLines((prev) => {
        const idx = prev.findIndex((l) => l.id === id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + qty,
          };
          return next;
        }
        return [
          ...prev,
          {
            id,
            productSlug: input.productSlug,
            name: input.name,
            image: input.image,
            price: input.price,
            compareAt: input.compareAt,
            size: input.size,
            color: input.color,
            quantity: qty,
          },
        ];
      });
    },
    [],
  );

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setLines((prev) => prev.filter((l) => l.id !== id));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, quantity } : l)),
    );
  }, []);

  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((acc, l) => acc + l.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () => lines.reduce((acc, l) => acc + l.price * l.quantity, 0),
    [lines],
  );

  const compareSubtotal = useMemo(
    () => lines.reduce((acc, l) => acc + l.compareAt * l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      hydrated,
      itemCount,
      subtotal,
      compareSubtotal,
      addLine,
      updateQuantity,
      removeLine,
      clear,
    }),
    [
      lines,
      hydrated,
      itemCount,
      subtotal,
      compareSubtotal,
      addLine,
      updateQuantity,
      removeLine,
      clear,
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
