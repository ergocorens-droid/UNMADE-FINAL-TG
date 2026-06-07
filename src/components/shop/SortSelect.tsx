"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import { useT } from "@/i18n/I18nContext";
import type { TranslationKey } from "@/i18n/translate";

const OPTION_DEF: { value: string; key: TranslationKey }[] = [
  { value: "najnowsze", key: "shop.sortNewest" },
  { value: "cena-rosnaco", key: "shop.sortPriceAsc" },
  { value: "cena-malejaco", key: "shop.sortPriceDesc" },
  { value: "popularne", key: "shop.sortPopular" },
];

export type SortSelectProps = {
  /** Pełna ścieżka bez query, np. `/sklep` lub `/kolekcja/czarne`. */
  basePath?: string;
};

export function SortSelect({ basePath = "/sklep" }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const { t } = useT();

  const current = searchParams.get("sort") ?? "najnowsze";

  const options = useMemo(
    () => OPTION_DEF.map((o) => ({ value: o.value, label: t(o.key) })),
    [t],
  );

  return (
    <label className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500">
        {t("sortSelect.label")}
      </span>
      <select
        value={current}
        disabled={pending}
        onChange={(e) => {
          const value = e.target.value;
          const next = new URLSearchParams(searchParams.toString());
          if (value === "najnowsze") {
            next.delete("sort");
          } else {
            next.set("sort", value);
          }
          const q = next.toString();
          startTransition(() => {
            router.push(q ? `${basePath}?${q}` : basePath, { scroll: false });
          });
        }}
        className="border border-black/[0.12] bg-transparent px-3 py-2 text-xs uppercase tracking-wide text-neutral-950 outline-none transition focus:border-neutral-950"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
