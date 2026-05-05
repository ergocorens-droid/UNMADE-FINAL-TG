"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRegion } from "@/context/RegionContext";
import { translate, type MsgKey } from "@/i18n/strings";

const NAV_SPEC: { href: string; key: MsgKey }[] = [
  { href: "/", key: "nav_home" },
  { href: "/sklep?sort=newest", key: "nav_new" },
  { href: "/sklep?category=koszulki", key: "nav_tees" },
  { href: "/sklep?category=bluzy", key: "nav_hoodies" },
  { href: "/sklep", key: "nav_shop" },
  { href: "/wysylka", key: "nav_shipping" },
  { href: "/kontakt", key: "nav_contact" },
];

const COLLECTION_PREVIEW = [
  {
    href: "/kolekcje/porsche",
    title: "PORSCHE",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80",
  },
  {
    href: "/kolekcje/jdm",
    title: "JDM",
    img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80",
  },
  {
    href: "/kolekcje/drift",
    title: "DRIFT",
    img: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&q=80",
  },
];

export function Header({
  onOpenSearch,
  onOpenCart,
}: {
  onOpenSearch: () => void;
  onOpenCart: () => void;
}) {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { locale, t } = useRegion();
  const navLinks = useMemo(
    () =>
      NAV_SPEC.map((item) => ({
        href: item.href,
        label: translate(locale, item.key),
      })),
    [locale],
  );
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const overHero = pathname === "/" && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;
      if (collectionsRef.current && !collectionsRef.current.contains(t)) {
        setCollectionsOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(t)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const headerBar = overHero
    ? "border-transparent bg-transparent"
    : "border-neutral-200 bg-white shadow-sm";

  const logoCls = overHero
    ? "text-lg font-bold tracking-[0.2em] text-white md:text-xl"
    : "text-lg font-bold tracking-[0.2em] text-neutral-900 md:text-xl";

  const navCls = overHero
    ? "text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 transition hover:text-[var(--unmade-accent-soft)]"
    : "text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-700 transition hover:text-[var(--unmade-accent)]";

  const iconBtn = overHero
    ? "rounded p-2 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--unmade-accent)]"
    : "rounded p-2 text-neutral-800 transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--unmade-accent)]";

  const burgerCls = overHero
    ? "rounded p-2 text-white lg:hidden"
    : "rounded p-2 text-neutral-900 lg:hidden";

  return (
    <>
      <div className="sticky top-0 z-[100]">
        <div className="bg-[linear-gradient(90deg,var(--unmade-accent-deep),var(--unmade-accent))]">
          <p className="px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-white/95 sm:text-[11px]">
            {t("banner_promo")}
          </p>
        </div>
        <header className={`border-b transition-colors duration-300 ${headerBar}`}>
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-6">
            <Link href="/" className={logoCls}>
              UNMADE
            </Link>

            <nav
              className="hidden items-center gap-6 lg:flex"
              aria-label="Główna nawigacja"
            >
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className={navCls}>
                  {l.label}
                </Link>
              ))}
              <div className="relative" ref={collectionsRef}>
                <button
                  type="button"
                  onClick={() => setCollectionsOpen((v) => !v)}
                  onMouseEnter={() => setCollectionsOpen(true)}
                  className={`flex items-center gap-1 ${navCls}`}
                  aria-expanded={collectionsOpen}
                  aria-haspopup="true"
                >
                  {t("nav_collections")}
                  <span className="text-[10px]">▾</span>
                </button>
                {collectionsOpen && (
                  <div
                    className="absolute left-1/2 top-full z-[110] mt-4 w-[min(90vw,720px)] -translate-x-1/2 border border-neutral-200 bg-white p-4 shadow-xl"
                    onMouseLeave={() => setCollectionsOpen(false)}
                  >
                    <div className="grid grid-cols-3 gap-3">
                      {COLLECTION_PREVIEW.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="group block overflow-hidden border border-neutral-200 bg-neutral-50 transition hover:border-[var(--unmade-accent)]"
                          onClick={() => setCollectionsOpen(false)}
                        >
                          <div className="relative aspect-[4/3]">
                            {/* TODO: podmienić na własną grafikę — Unsplash placeholder */}
                            <Image
                              src={c.img}
                              alt={c.title}
                              fill
                              className="object-cover transition duration-500 group-hover:scale-105"
                              sizes="240px"
                            />
                          </div>
                          <p className="bg-neutral-100 py-2 text-center text-[11px] font-bold uppercase tracking-wider text-neutral-900">
                            {c.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={onOpenSearch}
                className={iconBtn}
                aria-label="Szukaj"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
                </svg>
              </button>

              <div className="relative hidden sm:block" ref={accountRef}>
                <button
                  type="button"
                  onClick={() => setAccountOpen((v) => !v)}
                  className={iconBtn}
                  aria-label="Konto"
                  aria-expanded={accountOpen}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-full z-[110] mt-2 min-w-[180px] border border-neutral-200 bg-white py-2 shadow-xl">
                    <Link
                      href="/logowanie"
                      className="block px-4 py-2 text-xs uppercase tracking-wide text-neutral-800 hover:bg-neutral-100"
                      onClick={() => setAccountOpen(false)}
                    >
                      Logowanie
                    </Link>
                    <Link
                      href="/rejestracja"
                      className="block px-4 py-2 text-xs uppercase tracking-wide text-neutral-800 hover:bg-neutral-100"
                      onClick={() => setAccountOpen(false)}
                    >
                      Rejestracja
                    </Link>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onOpenCart}
                className={`relative ${iconBtn}`}
                aria-label={`Koszyk, ${itemCount} pozycji`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[var(--unmade-accent)] px-1 text-[10px] font-bold text-white">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                className={burgerCls}
                onClick={() => setMobileOpen(true)}
                aria-label="Menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>
      </div>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        collectionsHeading={t("nav_collections")}
      />
    </>
  );
}

function MobileDrawer({
  open,
  onClose,
  navLinks,
  collectionsHeading,
}: {
  open: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
  collectionsHeading: string;
}) {
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
        aria-label="Zamknij menu"
        onClick={onClose}
      />
      <nav
        className="absolute right-0 top-0 flex h-full w-[min(88vw,320px)] flex-col border-l border-neutral-200 bg-white p-6 shadow-2xl"
        aria-label="Menu mobilne"
      >
        <button
          type="button"
          className="mb-6 self-end text-neutral-500"
          onClick={onClose}
          aria-label="Zamknij"
        >
          ✕
        </button>
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="border-b border-neutral-200 py-3 text-sm font-semibold uppercase tracking-wider text-neutral-900"
            onClick={onClose}
          >
            {l.label}
          </Link>
        ))}
        <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
          {collectionsHeading}
        </p>
        {COLLECTION_PREVIEW.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="border-b border-neutral-200 py-3 text-sm uppercase tracking-wide text-neutral-800"
            onClick={onClose}
          >
            {c.title}
          </Link>
        ))}
        <Link
          href="/logowanie"
          className="mt-4 text-xs uppercase text-neutral-600"
          onClick={onClose}
        >
          Logowanie
        </Link>
        <Link
          href="/rejestracja"
          className="text-xs uppercase text-neutral-600"
          onClick={onClose}
        >
          Rejestracja
        </Link>
      </nav>
    </div>
  );
}
