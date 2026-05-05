"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import type { ProductCategory, CollectionSlug } from "@/data/products";
import type { SortKey } from "@/lib/filterProducts";
import { buildShopQuery } from "@/lib/shopQuery";

function gatherParams(sp: URLSearchParams) {
  const o: Record<string, string> = {};
  sp.forEach((v, k) => {
    o[k] = v;
  });
  return o;
}

export function ShopToolbar() {
  const sp = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const current = useMemo(() => gatherParams(new URLSearchParams(sp.toString())), [sp]);

  function href(patch: Record<string, string | undefined>) {
    const next = { ...current, ...patch };
    Object.keys(next).forEach((k) => {
      if (next[k] === undefined || next[k] === "all" || next[k] === "") {
        delete next[k];
      }
    });
    return `/sklep${buildShopQuery(next)}`;
  }

  const cat = (current.category as ProductCategory | "all") ?? "all";
  const coll = (current.collection as CollectionSlug | "all") ?? "all";
  const avail = current.availability ?? "all";
  const sort = (current.sort as SortKey) ?? "newest";

  return (
    <div className="space-y-8 border-b border-neutral-200 pb-10">
      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          Kategoria
        </p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "Wszystkie"],
              ["koszulki", "Koszulki"],
              ["bluzy", "Bluzy"],
              ["longsleeve", "Longsleeve"],
            ] as const
          ).map(([v, label]) => (
            <FilterLink
              key={v}
              active={cat === v || (v === "all" && !current.category)}
              href={href({
                category: v === "all" ? undefined : v,
              })}
            >
              {label}
            </FilterLink>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          Kolekcja
        </p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "Wszystkie"],
              ["porsche", "PORSCHE"],
              ["jdm", "JDM"],
              ["drift", "DRIFT"],
            ] as const
          ).map(([v, label]) => (
            <FilterLink
              key={v}
              active={coll === v || (v === "all" && !current.collection)}
              href={href({
                collection: v === "all" ? undefined : v,
              })}
            >
              {label}
            </FilterLink>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          Dostępność
        </p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "Wszystkie"],
              ["in_stock", "W magazynie"],
              ["sold_out", "Wyprzedane"],
            ] as const
          ).map(([v, label]) => (
            <FilterLink
              key={v}
              active={avail === v || (v === "all" && !current.availability)}
              href={href({
                availability: v === "all" ? undefined : v,
              })}
            >
              {label}
            </FilterLink>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          Cena (zł)
        </p>
        <form
          className="flex flex-wrap items-end gap-3"
          action="/sklep"
          method="get"
        >
          {Object.entries(current).map(([k, v]) =>
            k !== "min" && k !== "max" ? (
              <input type="hidden" key={k} name={k} value={v} />
            ) : null,
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="min-price" className="text-[10px] text-neutral-600">
              Od
            </label>
            <input
              id="min-price"
              name="min"
              type="number"
              min={0}
              defaultValue={current.min}
              placeholder="0"
              className="w-28 border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="max-price" className="text-[10px] text-neutral-600">
              Do
            </label>
            <input
              id="max-price"
              name="max"
              type="number"
              min={0}
              defaultValue={current.max}
              placeholder="9999"
              className="w-28 border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900"
            />
          </div>
          <button
            type="submit"
            className="border border-neutral-900 px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
          >
            Filtruj
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor="sort-select" className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
          Sortowanie
        </label>
        <select
          id="sort-select"
          value={sort}
          onChange={(e) => {
            const v = e.target.value as SortKey;
            startTransition(() => {
              router.push(href({ sort: v === "newest" ? undefined : v }));
            });
          }}
          className="max-w-xs border border-neutral-300 bg-white px-3 py-2 text-xs uppercase tracking-wide text-neutral-900"
        >
          <option value="newest">Najnowsze</option>
          <option value="price-asc">Cena rosnąco</option>
          <option value="price-desc">Cena malejąco</option>
          <option value="bestsellers">Bestsellery</option>
        </select>
      </div>
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`rounded border px-3 py-2 text-[10px] font-bold uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--unmade-accent)] ${
        active
          ? "border-neutral-900 bg-neutral-900 text-white"
          : "border-neutral-300 bg-transparent text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
      }`}
    >
      {children}
    </Link>
  );
}
