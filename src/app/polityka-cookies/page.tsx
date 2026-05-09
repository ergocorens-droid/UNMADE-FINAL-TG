import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { PolitykaCookiesBody } from "@/components/legal/PolitykaCookiesBody";
import { getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return {
    title: `${t("metadata.cookiesDocTitle")} | UNMADE`,
    description: t("metadata.cookiesDocDescription"),
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  return (
    <LegalArticle title="POLITYKA PLIKÓW COOKIES">
      <PolitykaCookiesBody />
    </LegalArticle>
  );
}
