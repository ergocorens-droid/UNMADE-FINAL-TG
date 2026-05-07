"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRegion } from "@/context/RegionContext";
import { formatPrice } from "@/lib/format";
import { clientSearchProducts } from "@/lib/shopify/api";
import type { Product } from "@/lib/shopify/types";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useRegion();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeAndClear = useCallback(() => {
    setQ("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAndClear();
    }
    window.addEventListener("keydown", onKey);
    const tmr = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(tmr);
    };
  }, [open, closeAndClear]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const tmr = window.setTimeout(async () => {
      setLoading(true);
      try {
        const list = await clientSearchProducts(q, 12);
        if (!cancelled) setResults(list);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 260);
    return () => {
      cancelled = true;
      window.clearTimeout(tmr);
    };
  }, [q, open]);

  if (!open) return null;

  const summaryHref =
    q.trim().length > 0
      ? `/sklep?q=${encodeURIComponent(q.trim())}`
      : "/sklep";

  return (
    <div
      className="fixed inset-0 z-[240] flex flex-col bg-white/98 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Wyszukiwarka"
    >
      <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-4">
        <svg
          className="h-5 w-5 shrink-0 text-neutral-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
          />
        </svg>
        <label htmlFor="site-search" className="sr-only">
          Szukaj produktów
        </label>
        <input
          ref={inputRef}
          id="site-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Szukaj..."
          className="flex-1 bg-transparent text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={closeAndClear}
          className="rounded px-3 py-2 text-sm uppercase tracking-wide text-neutral-500 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--unmade-accent)]"
          aria-label={t("search_close")}
        >
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          Produkty {loading ? "…" : ""}
        </p>
        <ul className="mt-4 space-y-3">
          {results.map((p) => {
            const img = p.featuredImage?.url;
            const price = p.priceRange.minVariantPrice;
            return (
              <li key={p.id}>
                <Link
                  href={`/produkt/${p.handle}`}
                  onClick={closeAndClear}
                  className="flex gap-3 rounded border border-transparent p-2 hover:border-neutral-200 hover:bg-neutral-50"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-neutral-100">
                    {img ? (
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-900">
                      {p.title}
                    </p>
                    <p className="mt-1 text-xs text-neutral-600">
                      {formatPrice(price)}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href={summaryHref}
          onClick={closeAndClear}
          className="mt-6 inline-block text-xs font-semibold uppercase tracking-wide text-[var(--unmade-accent)] underline"
        >
          Zobacz wszystkie
        </Link>
      </div>
    </div>
  );
}
