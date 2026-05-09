"use client";

import Link from "next/link";
import { COMPANY, companyAddressMultiline } from "@/lib/legal/company";
import { useT } from "@/i18n/I18nContext";

function PayIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-8 items-center justify-center rounded border border-neutral-300 bg-neutral-100 px-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-600">
      {children}
    </span>
  );
}

export function Footer() {
  const { t } = useT();
  const year = 2026;
  const adr = companyAddressMultiline();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 text-neutral-600">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
          <PayIcon>Visa</PayIcon>
          <PayIcon>Mastercard</PayIcon>
          <PayIcon>PayPal</PayIcon>
          <PayIcon>Apple Pay</PayIcon>
          <PayIcon>Google Pay</PayIcon>
          <PayIcon>BLIK</PayIcon>
        </div>

        <div className="mt-10 rounded border border-neutral-200 bg-white px-4 py-5 text-xs leading-relaxed text-neutral-700 md:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--unmade-accent)]">
            Dane firmowe
          </p>
          <p className="mt-3 font-semibold text-neutral-900">{COMPANY.fullLegalName}</p>
          <p className="mt-2 uppercase">{COMPANY.tradingName}</p>
          <p className="mt-3 whitespace-pre-line">{adr}</p>
          <p className="mt-2">
            NIP: {COMPANY.nip} · KRS: {COMPANY.krs} · REGON: {COMPANY.regon}
          </p>
          <p className="mt-2">Kapitał zakładowy: {COMPANY.shareCapitalPln}</p>
          <p className="mt-2">
            E-mail:{" "}
            <a href={`mailto:${COMPANY.email}`} className="font-medium underline text-neutral-900">
              {COMPANY.email}
            </a>
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <p className="text-center text-xs text-neutral-700 md:max-w-sm md:text-left">
            {t("footer.copyright", { year })}
          </p>
          <nav
            aria-label={t("footer.legalLinksAria")}
            className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-wide md:max-w-xl md:justify-end"
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
            <Link href={`mailto:${COMPANY.complaintsEmail}`} className="hover:text-neutral-900">
              {t("footer.complaints")}
            </Link>
            <Link href="/dostawa-i-platnosc" className="hover:text-neutral-900">
              {t("footer.shipping")}
            </Link>
            <Link href="/faq#rozmiary" className="hover:text-neutral-900">
              {t("footer.sizeGuide")}
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
          <div className="flex justify-center gap-4 md:justify-end md:min-w-[9rem]">
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
      </div>
    </footer>
  );
}
