"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { EmailPopup } from "@/components/EmailPopup";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SearchOverlay } from "@/components/SearchOverlay";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [promoHeight, setPromoHeight] = useState(0);
  const promoRef = useRef<HTMLDivElement>(null);

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
      <div ref={promoRef} className="relative z-[60] w-full shrink-0">
        <AnnouncementBar />
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
