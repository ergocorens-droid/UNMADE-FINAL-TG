"use client";

import { useState } from "react";

const SIZE_ROWS = [
  { size: "S", length: "68 cm", chest: "48 cm", shoulders: "43 cm", sleeve: "19 cm" },
  { size: "M", length: "70 cm", chest: "52 cm", shoulders: "45 cm", sleeve: "20 cm" },
  { size: "L", length: "72 cm", chest: "56 cm", shoulders: "47 cm", sleeve: "21 cm" },
  { size: "XL", length: "74 cm", chest: "60 cm", shoulders: "49 cm", sleeve: "22 cm" },
  { size: "XXL", length: "76 cm", chest: "64 cm", shoulders: "51 cm", sleeve: "23 cm" },
] as const;

export function SizeGuideAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-b border-black/[0.08]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between py-6 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-black uppercase tracking-[0.18em] text-neutral-950 underline decoration-black/30 underline-offset-4 md:text-base">
          Tabela rozmiarów
        </span>
        <span className="text-sm font-black uppercase tracking-[0.16em]" aria-hidden="true">
          {open ? "Zwin" : "Rozwin"}
        </span>
      </button>

      {open ? (
        <div className="pb-8">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-950">
              T-shirt uniwersalny
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              Wymiary w cm. Tolerancja rozmiaru +/- 2 cm.
            </p>
          </div>

          <div className="grid gap-3 md:hidden">
            {SIZE_ROWS.map((row) => (
              <div key={row.size} className="border border-black/[0.08] bg-white p-4">
                <div className="mb-3 text-lg font-black text-neutral-950">
                  {row.size}
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <dt className="font-bold text-neutral-500">Dlugosc calkowita</dt>
                  <dd className="text-right font-black text-neutral-950">{row.length}</dd>
                  <dt className="font-bold text-neutral-500">Szerokosc pod pachami</dt>
                  <dd className="text-right font-black text-neutral-950">{row.chest}</dd>
                  <dt className="font-bold text-neutral-500">Szerokosc ramion</dt>
                  <dd className="text-right font-black text-neutral-950">{row.shoulders}</dd>
                  <dt className="font-bold text-neutral-500">Dlugosc rekawa</dt>
                  <dd className="text-right font-black text-neutral-950">{row.sleeve}</dd>
                </dl>
              </div>
            ))}
          </div>

          <div className="hidden border border-black/[0.08] bg-white md:block">
            <table className="min-w-[680px] w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-white text-neutral-950">
                  <th className="border-r border-b border-black/[0.08] px-4 py-4 text-xs font-black uppercase tracking-[0.12em]">
                    Rozmiar
                  </th>
                  <th className="border-r border-b border-black/[0.08] px-4 py-4 text-xs font-black uppercase tracking-[0.12em]">
                    Dlugosc calkowita
                  </th>
                  <th className="border-r border-b border-black/[0.08] px-4 py-4 text-xs font-black uppercase tracking-[0.12em]">
                    Szerokosc pod pachami
                  </th>
                  <th className="border-r border-b border-black/[0.08] px-4 py-4 text-xs font-black uppercase tracking-[0.12em]">
                    Szerokosc ramion
                  </th>
                  <th className="border-b border-black/[0.08] px-4 py-4 text-xs font-black uppercase tracking-[0.12em]">
                    Dlugosc rekawa
                  </th>
                </tr>
              </thead>
              <tbody>
                {SIZE_ROWS.map((row) => (
                  <tr key={row.size} className="bg-white">
                    <th className="border-r border-t border-black/[0.06] px-4 py-3 text-base font-black text-neutral-950">
                      {row.size}
                    </th>
                    <td className="border-r border-t border-black/[0.06] px-4 py-3 font-semibold text-neutral-900">
                      {row.length}
                    </td>
                    <td className="border-r border-t border-black/[0.06] px-4 py-3 font-semibold text-neutral-900">
                      {row.chest}
                    </td>
                    <td className="border-r border-t border-black/[0.06] px-4 py-3 font-semibold text-neutral-900">
                      {row.shoulders}
                    </td>
                    <td className="border-t border-black/[0.06] px-4 py-3 font-semibold text-neutral-900">
                      {row.sleeve}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}
