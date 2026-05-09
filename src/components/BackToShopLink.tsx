"use client";

import Link from "next/link";
import { useT } from "@/i18n/I18nContext";
import type { TranslationKey } from "@/i18n/translate";

export function BackToShopLink({
  className,
  labelKey = "pages.backToShop",
}: {
  className?: string;
  labelKey?: TranslationKey;
}) {
  const { t } = useT();
  return (
    <Link href="/sklep" className={className}>
      {t(labelKey)}
    </Link>
  );
}
