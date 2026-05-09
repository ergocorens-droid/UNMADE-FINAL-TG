import type { Metadata } from "next";
import { getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return {
    title: `${t("metadata.termsDocTitle")} | UNMADE`,
    description: t("metadata.termsDocDescription"),
  };
}

export default async function Page() {
  const t = await getServerT();

  return (
    <div className="mx-auto max-w-[640px] bg-white px-6 py-16 text-sm text-neutral-700">
      <h1 className="text-2xl font-bold uppercase tracking-wide text-neutral-900">
        {t("staticPages.terms.heading")}
      </h1>
      <p className="mt-6">{t("staticPages.terms.body")}</p>
    </div>
  );
}
