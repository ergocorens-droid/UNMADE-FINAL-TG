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
    <div className="bg-[#f5f1ea] pb-24 pt-16 md:pt-24">
      <div className="mx-auto max-w-[860px] px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-neutral-500">
          {t("staticPages.about.tagline")}
        </p>
        <h1 className="mt-4 border-b border-black/[0.06] pb-8 text-4xl font-black uppercase leading-none tracking-normal text-neutral-950 md:text-6xl">
          {t("staticPages.about.heading")}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-800">
          {t("staticPages.about.lead")}
        </p>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-500">
          {t("staticPages.about.note")}
        </p>
      </div>
    </div>
  );
}
