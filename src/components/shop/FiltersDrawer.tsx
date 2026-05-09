"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/I18nContext";

export function FiltersDrawer({ children }: { children: React.ReactNode }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => {
        setMounted(true);
        requestAnimationFrame(() => setSlideIn(true));
      });
      return () => cancelAnimationFrame(id);
    }
    const closeSlide = requestAnimationFrame(() => setSlideIn(false));
    const unmountLater = window.setTimeout(() => setMounted(false), 300);
    return () => {
      cancelAnimationFrame(closeSlide);
      window.clearTimeout(unmountLater);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-2 inline-flex items-center gap-2 border border-neutral-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-neutral-900 transition hover:bg-neutral-100 lg:hidden"
      >
        ☰ {t("shop.filters")}
      </button>
      {mounted ? (
        <div className="fixed inset-0 z-[260] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label={t("common.close")}
            onClick={() => setOpen(false)}
          />
          <aside
            className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-neutral-200 bg-white shadow-2xl transition-transform duration-300 ease-out ${
              slideIn ? "translate-x-0" : "translate-x-full"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={t("shop.filtersAria")}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-800">
                {t("shop.filtersHeading")}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-1 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
              >
                {t("common.close")}
              </button>
            </div>
            <div
              className="flex-1 overflow-y-auto px-4 py-6"
              onClick={(e) => {
                const a = (e.target as HTMLElement).closest("a");
                if (a) setOpen(false);
              }}
            >
              {children}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
