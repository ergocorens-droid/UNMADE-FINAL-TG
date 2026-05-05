"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/products";
import {
  defaultCartColor,
  getFomoStock,
  type Size,
} from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useRegion } from "@/context/RegionContext";

const DEFAULT_ADD_SIZE: Size = "M";

export function ProductCard({ product }: { product: Product }) {
  const { addLine } = useCart();
  const { formatMoney, formatColorLabel, t } = useRegion();
  const [toast, setToast] = useState<string | null>(null);
  const stock = getFomoStock(product.slug);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (product.soldOut) return;
    const color = defaultCartColor(product);
    addLine({
      productSlug: product.slug,
      name: product.name,
      image: product.img1,
      price: product.price,
      compareAt: product.compareAt,
      size: DEFAULT_ADD_SIZE,
      color,
      quantity: 1,
    });
    const detail = [
      color ? formatColorLabel(color) : null,
      `${t("cart_size")} ${DEFAULT_ADD_SIZE}`,
    ]
      .filter(Boolean)
      .join(", ");
    setToast(t("toast_added", { detail }));
    window.setTimeout(() => setToast(null), 1800);
  }

  return (
    <div className="group relative flex flex-col">
      <Link href={`/sklep/${product.slug}`} className="relative block overflow-hidden bg-neutral-100">
        <div className="relative aspect-[3/4]">
          <Image
            src={product.img1}
            alt={`${product.name} — widok 1`}
            fill
            className="object-cover transition duration-500 group-hover:opacity-0"
            unoptimized
            sizes="(max-width:768px) 50vw, 25vw"
          />
          <Image
            src={product.img2}
            alt={`${product.name} — widok 2`}
            fill
            className="absolute inset-0 object-cover opacity-0 transition duration-500 group-hover:opacity-100"
            unoptimized
            sizes="(max-width:768px) 50vw, 25vw"
          />
          {product.soldOut ? (
            <span className="absolute left-2 top-2 bg-[var(--unmade-accent)] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              SOLD OUT
            </span>
          ) : (
            <span className="absolute left-2 top-2 bg-[var(--unmade-accent)] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              -15%
            </span>
          )}
        </div>
      </Link>
      <div className="mt-3 flex flex-col gap-1">
        <Link
          href={`/sklep/${product.slug}`}
          className="line-clamp-2 text-[11px] font-bold uppercase leading-snug tracking-wide text-neutral-900 hover:text-[var(--unmade-accent)] md:text-xs"
        >
          {product.name}
        </Link>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-xs text-[#666] line-through">
            {formatMoney(product.compareAt)}
          </span>
          <span className="text-sm font-medium text-neutral-900">
            {formatMoney(product.price)}
          </span>
        </div>
        {!product.soldOut && (
          <p className="text-[11px] font-medium text-neutral-700">
            🔥 {t("pdp_fomo", { n: stock })}
          </p>
        )}
        <button
          type="button"
          onClick={handleAdd}
          disabled={product.soldOut}
          className="mt-2 self-start border border-neutral-400 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t("quick_add")}
        </button>
      </div>
      {toast && (
        <p
          className="pointer-events-none absolute bottom-20 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-white px-3 py-1 text-[10px] font-bold uppercase text-black shadow-lg"
          role="status"
        >
          {toast}
        </p>
      )}
    </div>
  );
}
