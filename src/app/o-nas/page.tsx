import type { Metadata } from "next";
import { getServerLocale, getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const locale = await getServerLocale();
  const title = `${t("metadata.aboutPageTitle")} | UNMADE`;
  return {
    title,
    description: t("metadata.aboutPageDescription"),
    openGraph: {
      title,
      url: "https://unmade.pl/o-nas",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
  };
}

export default async function AboutPage() {
  const t = await getServerT();

  return (
    <div className="bg-white pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-[720px] px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--unmade-accent)]">
          {t("staticPages.about.tagline")}
        </p>
        <h1 className="mt-4 text-3xl font-bold uppercase tracking-[0.15em] text-neutral-900">
          {t("staticPages.about.heading")}
        </h1>
        <p className="mt-8 text-sm leading-relaxed text-neutral-700">{t("staticPages.about.lead")}</p>
        <p className="mt-6 text-sm leading-relaxed text-neutral-500">{t("staticPages.about.note")}</p>
      </div>
    </div>
  );
}
