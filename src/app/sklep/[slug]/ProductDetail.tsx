"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import {
  SIZES,
  getColorVariants,
  isSizeUnavailable,
  type ProductColorSlug,
  type Size,
} from "@/data/products";
import {
  bulkDiscountPercent,
} from "@/data/pricingPromos";
import { useCart } from "@/context/CartContext";
import { useRegion } from "@/context/RegionContext";
import { ProductCard } from "@/components/ProductCard";
import { convertPlnToCurrency } from "@/lib/money";

function firstAvailableSize(product: Product): Size {
  const ok = SIZES.find((s) => !isSizeUnavailable(product, s));
  return ok ?? "M";
}

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addLine } = useCart();
  const { t, formatMoney, formatColorLabel, currency, intlLocale } = useRegion();
  const colorVariants = useMemo(() => getColorVariants(product), [product]);
  const [colorSlug, setColorSlug] = useState<ProductColorSlug>(() => {
    const v = getColorVariants(product);
    return v?.[0]?.slug ?? "black";
  });
  const activeVariant = useMemo(() => {
    if (!colorVariants?.length) return null;
    return (
      colorVariants.find((v) => v.slug === colorSlug) ?? colorVariants[0]
    );
  }, [colorVariants, colorSlug]);

  const imgs = useMemo(() => {
    const front = activeVariant?.img1 ?? product.img1;
    const back = activeVariant?.img2 ?? product.img2;
    return [front, back] as const;
  }, [activeVariant, product.img1, product.img2]);

  const thumbUrls = useMemo(() => {
    const [front, back] = imgs;
    // Premium gallery slots: front / back / close-up / fit.
    // We reuse available product shots (front/back) while keeping the structure ready for real assets.
    return [front, back, back, front] as const;
  }, [imgs]);

  const galleryThumbLabels = ["Przód", "Tył", "Nadruk", "Fit"] as const;

  const [thumbIdx, setThumbIdx] = useState(0);
  const [size, setSize] = useState<Size>(() => firstAvailableSize(product));
  const [qty, setQty] = useState(1);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const savings = product.compareAt - product.price;
  const bulkPct = bulkDiscountPercent(qty);
  const regularTotalPln = product.compareAt * qty;
  const lineTotalExactPln = (product.price * qty * (100 - bulkPct)) / 100;
  const totalSavedVsRegularPln = Math.max(0, regularTotalPln - lineTotalExactPln);

  const safeIdx = Math.min(thumbIdx, Math.max(0, thumbUrls.length - 1));
  const activeImg = thumbUrls[safeIdx] ?? thumbUrls[0];
  const bundles = [
    {
      qty: 1,
      label: t("pdp_bulk_qty_one"),
      pct: 0,
      note: t("pdp_bundle_single"),
      best: false,
    },
    {
      qty: 2,
      label: t("pdp_bulk_qty_two"),
      pct: 8,
      note: t("pdp_bundle_pair"),
      best: false,
    },
    {
      qty: 3,
      label: t("pdp_bulk_qty_three"),
      pct: 15,
      note: t("pdp_bundle_best"),
      best: true,
    },
  ] as const;

  function updateQty(nextQty: number) {
    const safeQty = Math.max(1, nextQty);
    setQty(safeQty);
  }

  function selectColor(slug: ProductColorSlug) {
    setColorSlug(slug);
    setThumbIdx(0);
  }

  function formatTierMoney(amountPln: number): string {
    const converted =
      currency === "PLN" ? amountPln : convertPlnToCurrency(amountPln, currency);
    return new Intl.NumberFormat(intlLocale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(converted);
  }

  function handleAdd() {
    if (product.soldOut || isSizeUnavailable(product, size)) return;
    addLine({
      productSlug: product.slug,
      name: product.name,
      image: activeImg,
      price: product.price,
      compareAt: product.compareAt,
      size,
      color: activeVariant ? colorSlug : undefined,
      quantity: qty,
    });
  }

  const addDisabled = product.soldOut || isSizeUnavailable(product, size) || qty < 1;

  const activeBundleTier = qty >= 3 ? 3 : qty === 2 ? 2 : 1;
  const unitPricePln = lineTotalExactPln / qty;

  return (
    <>
      <section className="bg-[#f4f1ec] pb-24 lg:pb-28">
        <div className="mx-auto w-full max-w-[1340px] px-4 py-7 lg:px-8 lg:py-10">
          <div className="grid items-start gap-7 min-[920px]:grid-cols-[minmax(0,1.2fr)_minmax(420px,510px)]">
            <div className="space-y-4">
              <div className="relative h-[58vh] min-h-[420px] w-full overflow-hidden rounded-[18px] bg-[#e9e3db] lg:h-[74vh] lg:min-h-[620px]">
                <Image src={activeImg} alt={product.name} fill priority className="object-contain p-8 lg:p-14" unoptimized sizes="(max-width:1024px) 100vw, 60vw" />
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {thumbUrls.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    type="button"
                    onClick={() => setThumbIdx(i)}
                    className={`relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-[12px] border bg-[#e9e3db] transition ${safeIdx === i ? "border-neutral-950" : "border-black/10 hover:border-black/40"}`}
                    aria-label={`${t("a11y_thumb")} — ${galleryThumbLabels[i]}`}
                  >
                    <Image src={src} alt="" fill className="object-cover" unoptimized sizes="84px" />
                  </button>
                ))}
              </div>
            </div>

            <div className="sticky top-24 h-fit rounded-[18px] border border-black/10 bg-[#f9f7f4]/95 p-5 backdrop-blur md:top-28 lg:top-32 lg:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--unmade-accent-deep)]">{t("pdp_promo_strip_title")}</p>
              <h1 className="mt-3 text-[2.1rem] font-bold uppercase leading-[0.95] tracking-[0.01em] text-neutral-950 lg:text-[2.45rem]">{product.name}</h1>
              <div className="mt-5 flex flex-wrap items-end gap-3">
                <p className="text-[2.2rem] font-bold leading-none tabular-nums text-neutral-950 lg:text-[2.6rem]">{formatMoney(product.price)}</p>
                {savings > 0 ? <p className="pb-1 text-[1.02rem] font-semibold tabular-nums text-neutral-500 line-through">{formatMoney(product.compareAt)}</p> : null}
                {savings > 0 ? <span className="rounded-full bg-[var(--unmade-accent-deep)] px-3.5 py-1.5 text-[12px] font-semibold text-white">{t("pdp_discount_explicit", { amount: formatMoney(savings) })}</span> : null}
              </div>
              <p className="mt-2 text-[12px] text-neutral-600">{t("pdp_tax_ship_note")}</p>

              <div className="mt-7 grid grid-cols-3 rounded-full bg-[#ebe6df] p-1">
                {bundles.map((bundle) => {
                  const active = bundle.qty === 3 ? activeBundleTier === 3 : activeBundleTier === bundle.qty;
                  return (
                    <button
                      key={bundle.qty}
                      type="button"
                      onClick={() => updateQty(bundle.qty)}
                      className={`rounded-full px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition ${active ? "bg-neutral-950 text-white" : "text-neutral-700 hover:text-neutral-950"}`}
                    >
                      {bundle.qty === 3 ? "3+ szt." : `${bundle.qty} szt.`}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 rounded-[14px] border border-black/10 bg-white/80 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--unmade-accent-deep)]">{activeBundleTier === 1 ? "Cena dropu" : activeBundleTier === 2 ? "Idealne na start" : "Najlepsza wartość"}</p>
                {activeBundleTier > 1 ? <p className="mt-1 text-[15px] font-semibold tabular-nums text-neutral-900">{formatTierMoney(unitPricePln)} / szt.</p> : null}
                <p className="mt-1 text-[20px] font-bold tabular-nums text-neutral-950">{formatTierMoney(lineTotalExactPln)} <span className="text-[12px] font-semibold text-neutral-500">łącznie</span></p>
                <p className="mt-1 text-[13px] font-semibold tabular-nums text-[var(--unmade-accent-deep)]">{t("pdp_bulk_save", { amount: formatTierMoney(totalSavedVsRegularPln) })}</p>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-700">{t("pdp_color")} · {formatColorLabel(colorSlug)}</p>
                  <div className="mt-2.5 flex flex-wrap gap-2.5">
                    {(colorVariants ?? []).map((v) => {
                      const selected = colorSlug === v.slug;
                      return (
                        <button key={v.slug} type="button" onClick={() => selectColor(v.slug)} className={`relative h-10 w-10 rounded-full border ${selected ? "border-neutral-900 ring-2 ring-neutral-900 ring-offset-2 ring-offset-[#f9f7f4]" : "border-neutral-400 hover:border-neutral-700"}`} aria-label={formatColorLabel(v.slug)}>
                          <span className={`absolute inset-1.5 rounded-full border ${v.slug === "white" ? "border-neutral-300 bg-white" : "border-neutral-900 bg-neutral-900"}`} aria-hidden />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-700">{t("pdp_size")}</p>
                    <button type="button" onClick={() => setSizeModalOpen(true)} className="text-[11px] uppercase tracking-[0.14em] text-neutral-600 hover:text-neutral-900">{t("pdp_size_chart")}</button>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {SIZES.map((s) => {
                      const oos = isSizeUnavailable(product, s);
                      const selected = size === s && !oos;
                      return <button key={s} type="button" disabled={oos} onClick={() => !oos && setSize(s)} className={`h-9 rounded-full px-4 text-[11px] font-semibold uppercase tracking-[0.1em] ${selected ? "bg-neutral-950 text-white" : oos ? "cursor-not-allowed bg-neutral-200 text-neutral-400" : "bg-[#ebe6df] text-neutral-800 hover:bg-[#ddd5cb]"}`}>{s}</button>;
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-[12px] bg-[#ebe6df] px-3 py-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-700">{t("pdp_qty")}</p>
                  <div className="inline-flex items-center rounded-full border border-black/20 bg-white">
                    <button type="button" aria-label={t("a11y_dec_qty")} className="px-3 py-1.5 text-lg leading-none text-neutral-900" onClick={() => updateQty(qty - 1)}>−</button>
                    <span className="min-w-[2rem] text-center text-[14px] font-semibold tabular-nums text-neutral-900">{qty}</span>
                    <button type="button" aria-label={t("a11y_inc_qty")} className="px-3 py-1.5 text-lg leading-none text-neutral-900" onClick={() => updateQty(qty + 1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[14px] border border-black/10 bg-white/80 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-700">Twój wybór</p>
                <p className="mt-1 text-[13px] text-neutral-700">Kolor: {formatColorLabel(colorSlug)} · Rozmiar: {size} · Ilość: {qty}</p>
                <p className="mt-3 text-[18px] font-bold tabular-nums text-neutral-950">Do zapłaty: {formatTierMoney(lineTotalExactPln)}</p>
                <p className="mt-1 text-[13px] font-semibold tabular-nums text-[var(--unmade-accent-deep)]">Oszczędzasz: {formatTierMoney(totalSavedVsRegularPln)}</p>
              </div>

              <p className="mt-3 text-[12px] leading-relaxed text-neutral-600">{t("pdp_mix_variants_hint")}</p>
              <button type="button" onClick={handleAdd} disabled={addDisabled} className="mt-4 flex h-[56px] w-full items-center justify-center gap-3 rounded-full bg-neutral-950 px-6 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40">
                <BagIcon className="h-5 w-5 shrink-0" aria-hidden />
                {t("pdp_add_cart")}
              </button>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-600">
                <span>{t("pdp_bulk_autodiscount_hint")}</span><span>{t("pdp_trust_ship")}</span><span>{t("pdp_trust_pay")}</span><span>{t("pdp_trust_return")}</span>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-[1340px] border-t border-black/10 pt-9">
            <ProductAccordion hasColorChoice={!!colorVariants?.length} onOpenSizeChart={() => setSizeModalOpen(true)} />
          </div>

          {related.length > 0 ? (
            <div className="mx-auto mt-10 max-w-[1340px] border-t border-black/10 pt-10 lg:mt-14">
              <h2 className="mb-9 text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-800">{t("related_title")}</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-8">
                {related.map((p) => <ProductCard key={p.slug} product={p} />)}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {sizeModalOpen ? <SizeModal productName={product.name} onClose={() => setSizeModalOpen(false)} /> : null}
    </>
  );
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 7h15l-1.5 13h-12z" />
      <path d="M9 7V5a3 3 0 016 0v2" />
    </svg>
  );
}

function ProductAccordion({
  hasColorChoice,
  onOpenSizeChart,
}: {
  hasColorChoice: boolean;
  onOpenSizeChart: () => void;
}) {
  const { t } = useRegion();

  return (
    <div className="mt-12 divide-y divide-neutral-200 border-t border-neutral-200">
      <details className="group py-5">
        <summary className="flex cursor-pointer list-none items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-950 marker:hidden [&::-webkit-details-marker]:hidden">
          <IconProduct className="shrink-0 text-neutral-700" />
          <span className="flex-1">{t("pdp_acc_product_details")}</span>
          <Chevron className="text-neutral-400 transition group-open:rotate-180" />
        </summary>
        <p className="mt-4 pl-9 text-[14px] leading-relaxed text-neutral-600">
          {t("pdp_desc_body")}
          {hasColorChoice ? t("pdp_desc_colors") : null}
        </p>
      </details>

      <details className="group py-5">
        <summary className="flex cursor-pointer list-none items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-950 marker:hidden [&::-webkit-details-marker]:hidden">
          <IconWash className="shrink-0 text-neutral-700" />
          <span className="flex-1">{t("pdp_acc_care_maintenance")}</span>
          <Chevron className="text-neutral-400 transition group-open:rotate-180" />
        </summary>
        <p className="mt-4 pl-9 text-[14px] leading-relaxed text-neutral-600">
          {t("pdp_material_body")}
        </p>
      </details>

      <details className="group py-5">
        <summary className="flex cursor-pointer list-none items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-950 marker:hidden [&::-webkit-details-marker]:hidden">
          <IconRuler className="shrink-0 text-neutral-700" />
          <span className="flex-1">{t("pdp_acc_size_fit")}</span>
          <Chevron className="text-neutral-400 transition group-open:rotate-180" />
        </summary>
        <div className="mt-4 space-y-4 pl-9 text-[14px] leading-relaxed text-neutral-600">
          <p>{t("pdp_shipping_body")}</p>
          <button
            type="button"
            onClick={onOpenSizeChart}
            className="text-[12px] font-semibold uppercase tracking-wide text-neutral-900 underline-offset-4 hover:underline"
          >
            {t("pdp_size_chart")}
          </button>
        </div>
      </details>
    </div>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 ${className ?? ""}`}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M5 7l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconProduct({ className }: { className?: string }) {
  return (
    <svg
      className={`h-5 w-5 ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M7 7h10v14H7zM7 7V5a5 5 0 0110 0v2" strokeLinejoin="round" />
      <path d="M9 11h6" strokeLinecap="round" />
    </svg>
  );
}

function IconWash({ className }: { className?: string }) {
  return (
    <svg
      className={`h-5 w-5 ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <path d="M8 7h8M9 11h6" strokeLinecap="round" />
    </svg>
  );
}

function IconRuler({ className }: { className?: string }) {
  return (
    <svg
      className={`h-5 w-5 ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M4 20L20 4" strokeLinecap="round" />
      <path d="M8 16l2-2M11 13l2-2M14 10l2-2M17 7l2-2" strokeLinecap="round" />
    </svg>
  );
}

function SizeModal({
  productName,
  onClose,
}: {
  productName: string;
  onClose: () => void;
}) {
  const { t } = useRegion();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[260] flex items-center justify-center bg-black/40 px-4">
      <button
        type="button"
        className="absolute inset-0"
        aria-label={t("a11y_close")}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-modal-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-neutral-200 bg-white p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-neutral-500 hover:text-neutral-900"
          aria-label={t("a11y_close")}
        >
          ✕
        </button>
        <h2
          id="size-modal-title"
          className="text-sm font-bold uppercase tracking-wide text-neutral-900"
        >
          {t("size_modal_title", { name: productName })}
        </h2>
        <table className="mt-6 w-full text-left text-xs text-neutral-700">
          <thead>
            <tr className="border-b border-neutral-200 text-[10px] uppercase tracking-wide text-neutral-500">
              <th className="py-2 pr-4">{t("size_th_size")}</th>
              <th className="py-2 pr-4">{t("size_th_chest")}</th>
              <th className="py-2">{t("size_th_length")}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["S", "54 cm", "70 cm"],
              ["M", "56 cm", "72 cm"],
              ["L", "58 cm", "74 cm"],
              ["XL", "61 cm", "76 cm"],
              ["XXL", "64 cm", "78 cm"],
            ].map(([sz, a, b]) => (
              <tr key={sz} className="border-b border-neutral-100">
                <td className="py-2 font-semibold text-neutral-900">{sz}</td>
                <td className="py-2">{a}</td>
                <td className="py-2">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
