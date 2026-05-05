"use client";

import { useCallback, useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { EmailPopup } from "@/components/EmailPopup";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SearchOverlay } from "@/components/SearchOverlay";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = useCallback(() => setIntroDone(true), []);

  return (
    <>
      <LoadingScreen onComplete={handleIntroComplete} />
      <EmailPopup introDone={introDone} />
      <Header
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <Footer />
    </>
  );
}
