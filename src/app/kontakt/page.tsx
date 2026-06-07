import type { Metadata } from "next";
import { getServerLocale, getServerT } from "@/i18n/server";
import { COMPANY } from "@/lib/legal/company";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  const locale = await getServerLocale();
  return {
    title: `${t("metadata.kontaktTitle")} | UNMADE`,
    description: t("metadata.kontaktDescription"),
    openGraph: {
      title: `${t("metadata.kontaktTitle")} | UNMADE`,
      url: "https://unmade.pl/kontakt",
      locale: locale === "pl" ? "pl_PL" : "en_US",
    },
  };
}

export default async function KontaktPage() {
  const t = await getServerT();

  return (
    <div className="bg-white pb-24 pt-16 md:pt-24">
      <div className="mx-auto max-w-[920px] px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-neutral-500">
          {t("contactPage.tagline")}
        </p>
        <h1 className="mt-4 border-b border-black/[0.06] pb-8 text-5xl font-black uppercase leading-none tracking-normal text-neutral-950 md:text-7xl">
          {t("contactPage.title")}
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-2xl text-xl font-semibold leading-snug text-neutral-950 md:text-2xl">
            {t("contactPage.body")}
          </p>
          <a
            href={`mailto:${COMPANY.email}`}
            className="text-xl font-black uppercase tracking-normal text-neutral-950 underline decoration-black/20 underline-offset-8 transition hover:decoration-black md:text-2xl"
          >
            {COMPANY.email}
          </a>
        </div>
      </div>
    </div>
  );
}
