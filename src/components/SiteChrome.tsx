"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const mainExtraClass =
    pathname === "/" ? "" : "pt-14 md:pt-[3.75rem]";

  useEffect(() => {
    if (!pathname.startsWith("/produkt/")) return;
    const id = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <>
      <Header promoHeight={0} />
      <CartDrawer />
      <div className={`flex min-h-0 flex-1 flex-col ${mainExtraClass}`}>
        {children}
      </div>
      <Footer />
    </>
  );
}
