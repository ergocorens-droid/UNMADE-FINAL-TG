"use client";

import Link from "next/link";
import { COLLECTION_LABELS } from "@/lib/shopify/collection-labels";
import { sklepHref } from "@/lib/shop/shop-url";
import { useT } from "@/i18n/I18nContext";

export type ShopFilterState = {
  kolor?: string;
  typ?: string;
  kolekcja?: string;
  sort?: string;
  q?: string;
};

function hrefToggleKind(
  active: ShopFilterState,
  kind: "kolor" | "typ" | "kolekcja",
  handle: string,
): string {
  const key = kind;
  if (active[key] === handle) {
    return sklepHref({ sort: active.sort });
  } else {
    return sklepHref({ [key]: handle, sort: active.sort });
  }
}

function FilterRow({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`group flex items-center gap-3 border-b border-black/[0.06] px-0 py-2.5 text-xs uppercase transition hover:text-neutral-950 ${
        active ? "font-bold" : "font-medium text-neutral-800"
      }`}
    >
      {active ? (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900"
          aria-hidden
        />
      ) : (
        <span className="inline-block w-1.5 shrink-0" aria-hidden />
      )}
      <span
        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center border text-[9px] ${
          active ? "border-neutral-900 bg-neutral-900 text-white" : "border-black/20 bg-transparent"
        }`}
      >
        {active ? "✓" : ""}
      </span>
      <span>
        {label} ({count})
      </span>
    </Link>
  );
}

function FilterBlock({
  title,
  entries,
  counts,
  kind,
  active,
  localeIsPl,
}: {
  title: string;
  entries: [string, { pl: string; en: string; type: "color" | "type" | "collection" }][];
  counts: Record<string, number>;
  kind: "kolor" | "typ" | "kolekcja";
  active: ShopFilterState;
  localeIsPl: boolean;
}) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500">
        {title}
      </p>
      <nav className="flex flex-col gap-0.5">
        {entries.map(([handle, def]) => (
          <FilterRow
            key={handle}
            href={hrefToggleKind(active, kind, handle)}
            label={localeIsPl ? def.pl : def.en}
            count={counts[handle] ?? 0}
            active={
              kind === "kolor"
                ? active.kolor === handle
                : kind === "typ"
                  ? active.typ === handle
                  : active.kolekcja === handle
            }
          />
        ))}
      </nav>
    </div>
  );
}

export function ShopSidebar({
  counts,
  active,
}: {
  counts: Record<string, number>;
  active: ShopFilterState;
}) {
  const { t, locale } = useT();
  const localeIsPl = locale === "pl";

  const colorEntries = Object.entries(COLLECTION_LABELS).filter(
    ([, v]) => v.type === "color",
  );
  const typeEntries = Object.entries(COLLECTION_LABELS).filter(
    ([, v]) => v.type === "type",
  );
  const collectionEntries = Object.entries(COLLECTION_LABELS).filter(
    ([, v]) => v.type === "collection",
  );

  const anyFilter = Boolean(active.kolor || active.typ || active.kolekcja);

  return (
    <div className="space-y-10 border-y border-black/[0.06] py-6">
      <FilterBlock
        title={t("shop.color")}
        entries={colorEntries}
        counts={counts}
        kind="kolor"
        active={active}
        localeIsPl={localeIsPl}
      />
      <FilterBlock
        title={t("shop.type")}
        entries={typeEntries}
        counts={counts}
        kind="typ"
        active={active}
        localeIsPl={localeIsPl}
      />
      <FilterBlock
        title={t("shop.collectionFilter")}
        entries={collectionEntries}
        counts={counts}
        kind="kolekcja"
        active={active}
        localeIsPl={localeIsPl}
      />
      {anyFilter ? (
        <Link
          href="/sklep"
          scroll={false}
          className="inline-block text-sm font-medium uppercase tracking-wide text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline"
        >
          {t("shop.clearFilters")}
        </Link>
      ) : null}
    </div>
  );
}
