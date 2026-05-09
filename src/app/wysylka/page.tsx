import type { Metadata } from "next";
import { getServerLocale, getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const locale = await getServerLocale();
  return {
    title: `${t("metadata.wysylkaTitle")} | UNMADE`,
    description: t("metadata.wysylkaDescription"),
    openGraph: {
      title: `${t("metadata.wysylkaTitle")} | UNMADE`,
      url: "https://unmade.pl/wysylka",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
  };
}

export default async function WysylkaPage() {
  const t = await getServerT();

  return (
    <div className="bg-white pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-[720px] px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--unmade-accent)]">
          {t("wysylkaPage.tagline")}
        </p>
        <h1 className="mt-4 text-3xl font-bold uppercase tracking-[0.15em] text-neutral-900">
          {t("wysylkaPage.title")}
        </h1>
        <ul className="mt-10 space-y-6 text-sm leading-relaxed text-neutral-700">
          <li>{t("wysylkaPage.bulletFreeShipping")}</li>
          <li>{t("wysylkaPage.bulletDispatched24h")}</li>
          <li>{t("wysylkaPage.bulletDeliveryTime")}</li>
          <li>{t("wysylkaPage.bulletCourier")}</li>
          <li>{t("wysylkaPage.bulletPaczkomaty")}</li>
          <li>{t("wysylkaPage.bulletCostBelowFree")}</li>
          <li>
            {t("wysylkaPage.bulletInternationalPrefix")}
            <a href="mailto:kontakt@unmade.pl" className="text-neutral-900 underline">
              kontakt@unmade.pl
            </a>
            {t("wysylkaPage.bulletInternationalSuffix")}
          </li>
        </ul>
      </div>
    </div>
  );
}
