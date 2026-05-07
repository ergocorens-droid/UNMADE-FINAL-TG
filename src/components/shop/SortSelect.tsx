"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const OPTIONS: { value: string; label: string }[] = [
  { value: "najnowsze", label: "Najnowsze" },
  { value: "cena-rosnaco", label: "Cena rosnąco" },
  { value: "cena-malejaco", label: "Cena malejąco" },
  { value: "popularne", label: "Popularne" },
];

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const current = searchParams.get("sort") ?? "najnowsze";

  return (
    <label className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
        Sortowanie
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
            router.push(q ? `/sklep?${q}` : "/sklep", { scroll: false });
          });
        }}
        className="border border-neutral-300 bg-white px-3 py-2 text-xs uppercase tracking-wide text-neutral-900"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
