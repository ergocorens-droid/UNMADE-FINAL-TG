"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

function variantLabel(
  merch: { title: string; selectedOptions: { name: string; value: string }[] },
): string {
  if (merch.selectedOptions.length > 0) {
    return merch.selectedOptions.map((o) => `${o.name}: ${o.value}`).join(" · ");
  }
  return merch.title;
}

export function CartDrawer() {
  const {
    isOpen,
    cart,
    closeCart,
    updateItem,
    removeItem,
  } = useCart();

  const [mounted, setMounted] = useState(false);
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const id = requestAnimationFrame(() => {
        setMounted(true);
        requestAnimationFrame(() => setSlideIn(true));
      });
      return () => cancelAnimationFrame(id);
    }
    const closeSlide = requestAnimationFrame(() => setSlideIn(false));
    const unmountLater = window.setTimeout(() => setMounted(false), 300);
    return () => {
      cancelAnimationFrame(closeSlide);
      window.clearTimeout(unmountLater);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const lines = cart?.lines ?? [];

  return (
    <div className="fixed inset-0 z-[250]">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Zamknij koszyk"
        onClick={closeCart}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-neutral-200 bg-white shadow-2xl transition-transform duration-300 ease-out ${
          slideIn ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
          <h2
            id="cart-drawer-title"
            className="text-sm font-bold uppercase tracking-widest text-neutral-900"
          >
            Koszyk
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--unmade-accent)]"
            aria-label="Zamknij"
          >
            ✕
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="text-sm text-neutral-600">Twój koszyk jest pusty</p>
            <Link
              href="/sklep"
              onClick={closeCart}
              className="border border-neutral-900 px-6 py-3 text-xs font-bold uppercase tracking-wide text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
            >
              WRÓĆ DO SKLEPU
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-4 py-4">
              {lines.map((line) => {
                const img =
                  line.merchandise.image?.url ??
                  line.merchandise.product.featuredImage?.url;
                const href = `/produkt/${line.merchandise.product.handle}`;
                return (
                  <li
                    key={line.id}
                    className="flex gap-3 border-b border-neutral-100 py-4 last:border-0"
                  >
                    <Link
                      href={href}
                      onClick={closeCart}
                      className="relative h-20 w-20 shrink-0 overflow-hidden bg-neutral-100"
                    >
                      {img ? (
                        <Image
                          src={img}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center text-[10px] text-neutral-400">
                          —
                        </span>
                      )}
                    </Link>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={href}
                        onClick={closeCart}
                        className="line-clamp-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-900 hover:text-[var(--unmade-accent)]"
                      >
                        {line.merchandise.product.title}
                      </Link>
                      <p className="mt-1 text-[11px] text-neutral-500">
                        {variantLabel(line.merchandise)}
                      </p>
                      <p className="mt-1 text-xs font-medium text-neutral-900">
                        {formatPrice(line.cost.totalAmount)}
                        <span className="font-normal text-neutral-500">
                          {" "}
                          · {line.quantity} szt.
                        </span>
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="Zmniejsz ilość"
                          className="h-7 w-7 border border-neutral-300 text-sm text-neutral-900 hover:border-neutral-900"
                          onClick={() =>
                            void updateItem(line.id, line.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className="min-w-[1.5rem] text-center text-xs text-neutral-900">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Zwiększ ilość"
                          className="h-7 w-7 border border-neutral-300 text-sm text-neutral-900 hover:border-neutral-900"
                          onClick={() =>
                            void updateItem(line.id, line.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className="ml-auto text-[11px] text-neutral-500 hover:text-[var(--unmade-accent)]"
                          onClick={() => void removeItem(line.id)}
                          aria-label="Usuń"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs uppercase tracking-wide text-neutral-500">
                  Suma
                </span>
                <p className="text-lg font-semibold text-neutral-900">
                  {cart
                    ? formatPrice(cart.cost.subtotalAmount)
                    : "—"}
                </p>
              </div>
              {cart?.checkoutUrl ? (
                <a
                  href={cart.checkoutUrl}
                  className="mt-4 flex w-full justify-center bg-neutral-900 py-4 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-neutral-800"
                >
                  PRZEJDŹ DO KASY
                </a>
              ) : null}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
