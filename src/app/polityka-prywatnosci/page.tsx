import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal/LegalArticle";
import { PolitykaPrywatnosciBody } from "@/components/legal/PolitykaPrywatnosciBody";
import { getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerT();
  return {
    title: `${t("metadata.privacyDocTitle")} | CLTH.PL`,
    description: t("metadata.privacyDocDescription"),
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  return (
    <LegalArticle title="POLITYKA PRYWATNOŚCI CLTH.PL">
      <PolitykaPrywatnosciBody />
    </LegalArticle>
  );
}
