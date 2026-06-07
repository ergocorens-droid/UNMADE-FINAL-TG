import type { Metadata } from "next";
import { getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return {
    title: `${t("metadata.tosDocTitle")} | UNMADE`,
    description: t("metadata.tosDocDescription"),
  };
}

export default async function Page() {
  const t = await getServerT();

  return (
    <div className="mx-auto max-w-[860px] bg-[#f5f1ea] px-6 py-16 text-sm text-neutral-700 md:py-24">
      <h1 className="border-b border-black/[0.06] pb-8 text-4xl font-black uppercase leading-none tracking-normal text-neutral-950 md:text-6xl">
        {t("staticPages.tos.heading")}
      </h1>
      <p className="mt-6">{t("staticPages.tos.body")}</p>
    </div>
  );
}
