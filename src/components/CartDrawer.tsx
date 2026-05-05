"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { FREE_SHIPPING_THRESHOLD_PLN } from "@/data/products";
import { bulkDiscountPercent } from "@/data/pricingPromos";
import { useCart } from "@/context/CartContext";
import { useRegion } from "@/context/RegionContext";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { lines, subtotal, compareSubtotal, updateQuantity, removeLine } =
    useCart();
  const { formatMoney, t, formatColorLabel } = useRegion();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const itemPieces = useMemo(
    () => lines.reduce((acc, l) => acc + l.quantity, 0),
    [lines],
  );
  const bulkPct = bulkDiscountPercent(itemPieces);
  const bulkSaving =
    bulkPct > 0 ? Math.round((subtotal * bulkPct) / 100) : 0;
  const netAfterBulk = subtotal - bulkSaving;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD_PLN - netAfterBulk);
  const progressTowardsShip = Math.min(
    100,
    (netAfterBulk / FREE_SHIPPING_THRESHOLD_PLN) * 100,
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[250]">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label={t("cart_close")}
        onClick={onClose}
      />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-neutral-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
          <h2
            id="cart-drawer-title"
            className="text-sm font-bold uppercase tracking-widest text-neutral-900"
          >
            {t("cart_title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--unmade-accent)]"
            aria-label={t("a11y_close")}
          >
            ✕
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm text-neutral-600">{t("cart_empty")}</p>
            <p className="text-xs text-neutral-500">
              {t("cart_login_hint")}{" "}
              <Link href="/logowanie" className="text-neutral-900 underline">
                {t("cart_login")}
              </Link>
            </p>
            <Link
              href="/sklep"
              onClick={onClose}
              className="border border-neutral-900 px-6 py-3 text-xs font-bold uppercase tracking-wide text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
            >
              {t("cart_continue")}
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-4 py-4">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex gap-3 border-b border-neutral-100 py-4 last:border-0"
                >
                  <Link
                    href={`/sklep/${line.productSlug}`}
                    onClick={onClose}
                    className="relative h-20 w-20 shrink-0 overflow-hidden bg-neutral-100"
                  >
                    <Image
                      src={line.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/sklep/${line.productSlug}`}
                      onClick={onClose}
                      className="line-clamp-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-900 hover:text-[var(--unmade-accent)]"
                    >
                      {line.name}
                    </Link>
                    <p className="mt-1 text-[11px] text-neutral-500">
                      {t("cart_size")} {line.size}
                      {line.color ? (
                        <>
                          {" "}
                          · {formatColorLabel(line.color)}
                        </>
                      ) : null}
                    </p>
                    <p className="mt-1 text-xs font-medium text-neutral-900">
                      {formatMoney(line.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={t("a11y_dec_qty")}
                        className="h-7 w-7 border border-neutral-300 text-sm text-neutral-900 hover:border-neutral-900"
                        onClick={() =>
                          updateQuantity(line.id, line.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="min-w-[1.5rem] text-center text-xs text-neutral-900">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={t("a11y_inc_qty")}
                        className="h-7 w-7 border border-neutral-300 text-sm text-neutral-900 hover:border-neutral-900"
                        onClick={() =>
                          updateQuantity(line.id, line.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-auto text-[11px] text-neutral-500 hover:text-[var(--unmade-accent)]"
                        onClick={() => removeLine(line.id)}
                        aria-label={t("a11y_remove")}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-5">
              {remaining > 0 ? (
                <div className="mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-800">
                    🔥{" "}
                    {t("cart_free_ship_progress", {
                      remaining: formatMoney(remaining),
                    })}
                  </p>
                  <div className="mt-2 h-1.5 w-full bg-neutral-200">
                    <div
                      className="h-full bg-[var(--unmade-accent)] transition-[width]"
                      style={{ width: `${progressTowardsShip}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="mb-4 text-[11px] font-semibold uppercase text-[#2e7d32]">
                  🔥 {t("cart_free_ship_done")}
                </p>
              )}
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs uppercase tracking-wide text-neutral-500">
                  {t("cart_subtotal")}
                </span>
                <div className="text-right">
                  {compareSubtotal > subtotal && (
                    <p className="text-xs text-neutral-400 line-through">
                      {formatMoney(compareSubtotal)}
                    </p>
                  )}
                  <p className="text-lg font-semibold text-neutral-900">
                    {formatMoney(subtotal)}
                  </p>
                </div>
              </div>
              {bulkPct > 0 && bulkSaving > 0 && (
                <div className="mt-3 flex items-baseline justify-between gap-2 border-t border-neutral-200 pt-3">
                  <span className="text-xs uppercase tracking-wide text-neutral-600">
                    {t("cart_bulk_saving", { pct: bulkPct })}
                  </span>
                  <span className="text-sm font-semibold text-[var(--unmade-accent)]">
                    −{formatMoney(bulkSaving)}
                  </span>
                </div>
              )}
              {bulkPct > 0 && bulkSaving > 0 && (
                <div className="mt-2 flex items-baseline justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-neutral-900">
                    {t("cart_net")}
                  </span>
                  <span className="text-xl font-semibold text-neutral-900">
                    {formatMoney(netAfterBulk)}
                  </span>
                </div>
              )}
              <Link
                href="/kasa"
                onClick={onClose}
                className="mt-4 flex w-full justify-center bg-neutral-900 py-4 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[var(--unmade-accent-hover)]"
              >
                {t("cart_checkout")}
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
