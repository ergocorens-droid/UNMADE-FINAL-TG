"use client";

import Link from "next/link";
import { useT } from "@/i18n/I18nContext";
import { COMPANY } from "@/lib/legal/company";

function PayIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
      {children}
    </span>
  );
}

export function Footer() {
  const { t } = useT();
  const year = 2026;

  return (
    <footer className="border-t border-black/[0.06] bg-[#f5f1ea] text-neutral-600">
      <div className="mx-auto max-w-[1500px] px-4 py-10 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              href="/"
              className="text-lg font-black uppercase tracking-[0.22em] text-neutral-950"
            >
              UNMADE
            </Link>
            <p className="mt-4 max-w-sm text-xs uppercase leading-relaxed tracking-[0.16em] text-neutral-500">
              Limited streetwear drops. Quote tees, essentials and pieces made
              to be worn daily.
            </p>
          </div>

          <p className="text-xs text-neutral-600 md:max-w-sm md:text-right">
            {t("footer.copyright", { year })}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-8 border-t border-black/[0.06] pt-8 md:flex-row md:items-start md:justify-between">
          <nav
            aria-label={t("footer.legalLinksAria")}
            className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.18em] md:max-w-3xl"
          >
            <Link href="/regulamin" className="hover:text-neutral-900">
              {t("footer.terms")}
            </Link>
            <Link href="/polityka-prywatnosci" className="hover:text-neutral-900">
              {t("footer.privacy")}
            </Link>
            <Link href="/polityka-cookies" className="hover:text-neutral-900">
              {t("footer.cookies")}
            </Link>
            <Link href="/zwroty-i-odstapienie" className="hover:text-neutral-900">
              {t("footer.withdrawals")}
            </Link>
            <Link href="/dostawa-i-platnosc" className="hover:text-neutral-900">
              {t("footer.shipping")}
            </Link>
            <Link href="/warunki-uslugi" className="hover:text-neutral-900">
              {t("footer.termsOfService")}
            </Link>
            <Link href="/kontakt" className="hover:text-neutral-900">
              {t("footer.contact")}
            </Link>
            <Link href="/faq" className="hover:text-neutral-900">
              {t("footer.faq")}
            </Link>
            <Link href="/o-nas" className="hover:text-neutral-900">
              {t("footer.about")}
            </Link>
          </nav>

          <div className="flex gap-4 md:justify-end md:min-w-[9rem]">
            <Link
              href="https://instagram.com/unmade.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wide hover:text-neutral-900"
              aria-label={t("footer.instagramAria")}
            >
              Instagram
            </Link>
            <Link
              href="https://www.tiktok.com/@unmade.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wide hover:text-neutral-900"
              aria-label={t("footer.tiktokAria")}
            >
              TikTok
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-black/[0.06] pt-6">
          <PayIcon>Visa</PayIcon>
          <PayIcon>Mastercard</PayIcon>
          <PayIcon>PayPal</PayIcon>
          <PayIcon>Apple Pay</PayIcon>
          <PayIcon>Google Pay</PayIcon>
          <PayIcon>BLIK</PayIcon>
          <a
            href={`mailto:${COMPANY.email}`}
            className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 hover:text-neutral-900"
          >
            {COMPANY.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
