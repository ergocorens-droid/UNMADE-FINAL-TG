"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CurrencySwitcher } from "@/components/CurrencySwitcher";
import { useCart } from "@/context/CartContext";
import { useT } from "@/i18n/I18nContext";
import type { TranslationKey } from "@/i18n/translate";

const NAV_SPEC: { href: string; key: TranslationKey }[] = [
  { href: "/sklep-t-shirts", key: "nav.tshirts" },
  { href: "/sklep-bluzy", key: "nav.hoodies" },
  { href: "/sklep-czapki", key: "nav.caps" },
  { href: "/kontakt", key: "nav.contact" },
];

export function Header({
  promoHeight,
}: {
  promoHeight: number;
}) {
  const pathname = usePathname();
  const { totalQuantity, toggleCart } = useCart();
  const { t } = useT();
  const navLinks = useMemo(
    () =>
      NAV_SPEC.map((item) => ({
        id: item.key,
        href: item.href,
        label: t(item.key),
      })),
    [t],
  );
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const transparent = !mobileOpen;
  const headerTop = Math.max(0, promoHeight - scrollY);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setScrollY(window.scrollY));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const headerBar = transparent
    ? "border-white/10 bg-black/20 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md"
    : "border-neutral-200 bg-white shadow-sm";

  const logoCls = "block";

  const logoImgCls = transparent
    ? "h-9 w-auto md:h-10"
    : "h-9 w-auto md:h-10";

  const navCls = transparent
    ? "text-[11px] font-semibold uppercase tracking-[0.12em] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:text-white/80"
    : "text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-900 transition-colors duration-300 hover:text-[var(--unmade-accent)]";

  const iconBtn = transparent
    ? "rounded p-2 text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
    : "rounded p-2 text-neutral-900 transition-colors duration-300 hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--unmade-accent)]";

  const burgerCls = transparent
    ? "rounded p-2 text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:bg-white/10 lg:hidden"
    : "rounded p-2 text-neutral-900 transition-colors duration-300 lg:hidden";

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 border-b transition-[top,background-color,border-color,box-shadow,color,backdrop-filter] duration-300 ease-out ${headerBar}`}
        style={{ top: headerTop }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href="/" className={logoCls} aria-label="CLTH.PL">
            <Image
              src="/clth-logo-clean.png"
              alt="CLTH.PL"
              width={220}
              height={92}
              priority
              className={logoImgCls}
            />
          </Link>

          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label={t("header.mainNavAria")}
          >
            {navLinks.map((l) => (
              <Link key={l.id} href={l.href} className={navCls}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden shrink-0 md:block">
              <CurrencySwitcher variant={transparent ? "light" : "dark"} />
            </div>

            <button
              type="button"
              onClick={toggleCart}
              className={`relative ${iconBtn}`}
              aria-label={t("header.cartCountAria", {
                count: totalQuantity > 99 ? "99+" : totalQuantity,
              })}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
                />
              </svg>
              {totalQuantity > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[var(--unmade-accent)] px-1 text-[10px] font-bold text-white">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              className={burgerCls}
              onClick={() => setMobileOpen(true)}
              aria-label={t("header.menu")}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}

function MobileDrawer({
  open,
  onClose,
  navLinks,
}: {
  open: boolean;
  onClose: () => void;
  navLinks: { id: string; href: string; label: string }[];
}) {
  const { t } = useT();
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label={t("header.closeMenu")}
        onClick={onClose}
      />
      <nav
        className="absolute right-0 top-0 flex h-full w-[min(88vw,320px)] flex-col border-l border-neutral-200 bg-white p-6 shadow-2xl"
        aria-label={t("header.mainNavMobileAria")}
      >
        <button
          type="button"
          className="mb-6 self-end text-neutral-500"
          onClick={onClose}
          aria-label={t("common.close")}
        >
          X
        </button>
        <div className="-mt-2 mb-4 flex justify-end border-b border-neutral-200 pb-4">
          <CurrencySwitcher variant="dark" onPicked={onClose} />
        </div>
        {navLinks.map((l) => (
          <Link
            key={l.id}
            href={l.href}
            className="border-b border-neutral-200 py-3 text-sm font-semibold uppercase tracking-wider text-neutral-900"
            onClick={onClose}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
