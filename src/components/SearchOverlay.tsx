"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PRODUCTS } from "@/data/products";
import { useRegion } from "@/context/RegionContext";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { formatMoney, t } = useRegion();
  const [q, setQ] = useState("");
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
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, closeAndClear]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PRODUCTS.slice(0, 8);
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(s)).slice(0, 12);
  }, [q]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[240] flex flex-col bg-white/98 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Wyszukiwarka"
    >
      <div className="flex items-center gap-3 border-b border-neutral-200 px-4 py-4">
        <svg className="h-5 w-5 shrink-0 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
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
          Produkty
        </p>
        <ul className="mt-4 space-y-3">
          {results.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/sklep/${p.slug}`}
                onClick={closeAndClear}
                className="flex gap-3 rounded border border-transparent p-2 hover:border-neutral-200 hover:bg-neutral-50"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-neutral-100">
                  {/* TODO: podmienić na własną grafikę — Unsplash placeholder */}
                  <Image
                    src={p.img1}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-900">
                    {p.name}
                  </p>
                  <p className="mt-1 text-xs text-neutral-600">{formatMoney(p.price)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={q.trim() ? `/sklep?q=${encodeURIComponent(q.trim())}` : "/sklep"}
          onClick={closeAndClear}
          className="mt-6 inline-block text-xs font-semibold uppercase tracking-wide text-[var(--unmade-accent)] underline"
        >
          View all
        </Link>
      </div>
    </div>
  );
}
