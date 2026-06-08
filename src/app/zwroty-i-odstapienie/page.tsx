import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { ZwrotyBody } from "@/components/legal/ZwrotyBody";
import { getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return {
    title: `${t("metadata.withdrawalsDocTitle")} | CLTH.PL`,
    description: t("metadata.withdrawalsDocDescription"),
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  return (
    <LegalArticle title="ZWROTY I ODSTĄPIENIE OD UMOWY">
      <ZwrotyBody />
    </LegalArticle>
  );
}
