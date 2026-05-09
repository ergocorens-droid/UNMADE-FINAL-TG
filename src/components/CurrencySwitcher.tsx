"use client";

import { useEffect, useRef, useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { CURRENCIES, type CurrencyCode } from "@/lib/shopify/markets";

const ORDER: CurrencyCode[] = ["PLN", "EUR", "GBP", "USD"];

export function CurrencySwitcher({
  variant,
  onPicked,
}: {
  variant: "light" | "dark";
  onPicked?: () => void;
}) {
  const { currency, setCurrency, isChanging } = useCurrency();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const trigger =
    variant === "light"
      ? "text-sm text-white hover:bg-white/10"
      : "text-sm text-neutral-900 hover:bg-neutral-100";

  const menu =
    variant === "light"
      ? "border border-white/20 bg-neutral-900 text-white shadow-xl"
      : "border border-neutral-200 bg-white text-neutral-900 shadow-xl";

  const itemBase =
    variant === "light"
      ? "hover:bg-white/10"
      : "hover:bg-neutral-50";

  const cur = CURRENCIES[currency];

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        disabled={isChanging}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-md px-3 py-2 ${trigger} disabled:opacity-50`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span aria-hidden>{cur.flag}</span>
        <span className="font-medium tabular-nums">{cur.code}</span>
        <span className="text-[10px] opacity-80" aria-hidden>
          ▾
        </span>
      </button>
      {open ? (
        <ul
          className={`absolute right-0 top-full z-[120] mt-1 min-w-[10rem] rounded-md py-1 ${menu}`}
          role="listbox"
        >
          {ORDER.map((code) => {
            const c = CURRENCIES[code];
            const selected = code === currency;
            return (
              <li key={code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm ${itemBase} ${
                    selected ? "font-bold" : "font-normal"
                  }`}
                  onClick={() => {
                    setCurrency(code);
                    setOpen(false);
                    onPicked?.();
                  }}
                >
                  <span>
                    <span aria-hidden className="mr-2">
                      {c.flag}
                    </span>
                    {c.code}
                  </span>
                  {selected ? <span aria-hidden>✓</span> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
