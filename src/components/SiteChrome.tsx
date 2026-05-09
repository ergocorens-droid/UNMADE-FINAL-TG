"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { EmailPopup } from "@/components/EmailPopup";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SearchOverlay } from "@/components/SearchOverlay";
import { useT } from "@/i18n/I18nContext";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [promoHeight, setPromoHeight] = useState(0);
  const promoRef = useRef<HTMLDivElement>(null);
  const { t } = useT();

  const mainExtraClass =
    pathname === "/" ? "" : "pt-14 md:pt-[3.75rem]";

  useLayoutEffect(() => {
    const el = promoRef.current;
    if (!el) return;
    const update = () => setPromoHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <EmailPopup />
      <div ref={promoRef} className="relative z-0 shrink-0">
        <div className="bg-[linear-gradient(90deg,var(--unmade-accent-deep),var(--unmade-accent))]">
          <p className="px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-white/95 sm:text-[11px]">
            {t("announcement.firstDrop")}
          </p>
        </div>
      </div>
      <Header
        promoHeight={promoHeight}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <CartDrawer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <div className={`flex min-h-0 flex-1 flex-col ${mainExtraClass}`}>
        {children}
      </div>
      <Footer />
    </>
  );
}
