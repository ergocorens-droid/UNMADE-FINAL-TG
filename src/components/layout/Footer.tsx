"use client";

import Link from "next/link";
import { useT } from "@/i18n/I18nContext";
import { COMPANY } from "@/lib/legal/company";

const PAYMENTS = ["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay", "BLIK"];

export function Footer() {
  const { t } = useT();
  const year = 2026;

  return (
    <footer className="border-t border-black/[0.06] bg-white text-neutral-600">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-4 py-12 md:grid-cols-[1fr_auto] md:px-8">
        <div>
          <Link
            href="/"
            className="text-xl font-black uppercase tracking-[0.22em] text-neutral-950"
          >
            UNMADE
          </Link>
          <p className="mt-5 max-w-md text-xs uppercase leading-relaxed tracking-[0.16em] text-neutral-500">
            {t("footer.tagline")}
          </p>
          <p className="mt-8 text-xs text-neutral-500">
            {t("footer.copyright", { year })}
          </p>
        </div>

        <div className="flex flex-col gap-6 md:items-end md:text-right">
          <nav
            aria-label={t("footer.legalLinksAria")}
            className="flex max-w-xl flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.18em] md:justify-end"
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
          </nav>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 md:justify-end">
            <span>{t("footer.payments")}:</span>
            {PAYMENTS.map((payment) => (
              <span key={payment}>{payment}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-wide md:justify-end">
            <Link
              href="https://instagram.com/unmade.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900"
              aria-label={t("footer.instagramAria")}
            >
              Instagram
            </Link>
            <Link
              href="https://www.tiktok.com/@unmade.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900"
              aria-label={t("footer.tiktokAria")}
            >
              TikTok
            </Link>
            <a href={`mailto:${COMPANY.email}`} className="hover:text-neutral-900">
              {COMPANY.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
