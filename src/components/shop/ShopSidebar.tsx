import Link from "next/link";
import { COLLECTION_LABELS } from "@/lib/shopify/collection-labels";
import { sklepHref } from "@/lib/shop/shop-url";

export type ShopFilterState = {
  kolor?: string;
  typ?: string;
  sort?: string;
  q?: string;
};

function hrefToggleKind(
  active: ShopFilterState,
  kind: "kolor" | "typ",
  handle: string,
): string {
  const next: ShopFilterState = { ...active };
  const key = kind;
  if (active[key] === handle) {
    delete next[key];
  } else {
    next[key] = handle;
  }
  return sklepHref(next);
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
      className={`group flex items-center gap-3 rounded-xl px-2 py-2 text-sm transition hover:bg-neutral-100 ${
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
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border border-neutral-400 text-[10px] ${
          active ? "border-neutral-900 bg-neutral-900 text-white" : "bg-white"
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
}: {
  title: string;
  entries: [string, { pl: string; type: "color" | "type" }][];
  counts: Record<string, number>;
  kind: "kolor" | "typ";
  active: ShopFilterState;
}) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
        {title}
      </p>
      <nav className="flex flex-col gap-0.5">
        {entries.map(([handle, def]) => (
          <FilterRow
            key={handle}
            href={hrefToggleKind(active, kind, handle)}
            label={def.pl}
            count={counts[handle] ?? 0}
            active={
              kind === "kolor"
                ? active.kolor === handle
                : active.typ === handle
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
  const colorEntries = Object.entries(COLLECTION_LABELS).filter(
    ([, v]) => v.type === "color",
  );
  const typeEntries = Object.entries(COLLECTION_LABELS).filter(
    ([, v]) => v.type === "type",
  );

  const anyFilter = Boolean(active.kolor || active.typ);

  return (
    <div className="space-y-10">
      <FilterBlock
        title="Kolor"
        entries={colorEntries}
        counts={counts}
        kind="kolor"
        active={active}
      />
      <FilterBlock
        title="Typ"
        entries={typeEntries}
        counts={counts}
        kind="typ"
        active={active}
      />
      {anyFilter ? (
        <Link
          href="/sklep"
          scroll={false}
          className="inline-block text-sm font-medium uppercase tracking-wide text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline"
        >
          × Wyczyść filtry
        </Link>
      ) : null}
    </div>
  );
}
